import React, { useEffect, useState } from "react";
import { socket } from "../../custom hooks/SocketConnection";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LeaderboardUi from "../../components/LeaderboardUi/LeaderboardUi";

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
    <div>
      <LeaderboardUi leaderboard={leaderboard}/>
    </div>
  );
};

export default SocketLeaderboard;
