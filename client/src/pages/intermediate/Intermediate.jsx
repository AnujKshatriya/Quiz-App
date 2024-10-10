import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Intermediate.css'; // CSS for the intermediate page

const IntermediatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the final score and time from the location state
  const { finalScore, time } = location.state || { finalScore: 0, time: 0 };

  // Format the time into minutes and seconds
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="intermediate__background">
      <div className="intermediate__content">
        <h1 className="result__header">Quiz Completed!</h1>
        <p className="result__text">Your final score is: <span>{finalScore}</span></p>
        <p className="result__text">Time taken: <span>{formatTime(time)}</span></p>
        <button className="leaderboard__button" onClick={() => navigate(`/${location.state.joinedQuizId}/leaderboard`, { state: { finalScore, time } })}>
          Go to Leaderboard
        </button>
      </div>
    </div>
  );
};

export default IntermediatePage;
