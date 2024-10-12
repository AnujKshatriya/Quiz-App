import React, { useEffect, useState } from "react";
import { socket } from "../../custom hooks/SocketConnection";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SocketLeaderboard.css"

const SocketLeaderboard = () => {
  const { state } = useLocation();
  const { finalScore: score = null, time = null } = state || {};
  const { authUser } = useSelector((store) => store.user);
  const { joinedQuizId } = useSelector((store) => store.quiz);

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (joinedQuizId && authUser && score !== null && time !== null) {
      console.log(socket);
      socket.emit("updateScore", { joinedQuizId, authUser, score, time });
      console.log("update score emited from frontend ...");
    }
  }, [joinedQuizId, authUser, score, time]);

  useEffect(() => {
    socket.on("updateRankings", (updatedLeaderboard) => {
      console.log("update ranking is working...");
      console.log("leaderboard is -> ", updatedLeaderboard);
      setLeaderboard(updatedLeaderboard);
      setLoading(false); // Set loading to false once leaderboard data is received
    });

    // Cleanup socket listener on component unmount
    return () => {
      socket.off("updateRankings");
    };
  }, []);

  if(loading){
    return(
      <div>Loading....</div>
    )
  }

  if (leaderboard.length === 0) {
    return (
      <div>
        No data available yet. Please wait for the leaderboard to update.
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <div className="leaderboard">
        <div className="leaderboard-header">
          <div className="leaderboard-rank">Rank</div>
          <div className="leaderboard-username">Username</div>
          <div className="leaderboard-score">Score</div>
          <div className="leaderboard-time">Time</div>
        </div>
        {leaderboard.map((player, index) => (
          <div key={player.username} className={`leaderboard-row ${index % 2 === 0 ? "even" : "odd"}`}>
            <div className="leaderboard-rank">{index + 1}</div>
            <div className="leaderboard-username">{(player.username).toUpperCase()}</div>
            <div className="leaderboard-score">{player.score}</div>
            <div className="leaderboard-time">{player.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocketLeaderboard;
