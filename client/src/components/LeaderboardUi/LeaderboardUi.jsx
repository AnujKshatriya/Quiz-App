import React from 'react'
import './LeaderboardUi.css';

const LeaderboardUi = ({leaderboard}) => {
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
            <div className="leaderboard-score">{player.score} Points</div>
            <div className="leaderboard-time">{player.time} sec</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderboardUi
