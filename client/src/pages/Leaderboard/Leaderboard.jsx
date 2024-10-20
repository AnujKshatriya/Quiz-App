import axios from 'axios';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import './Leaderboard.css';
import LeaderboardUi from '../../components/LeaderboardUi/LeaderboardUi';

const Leaderboard = () => {
  const { authUser: userId } = useSelector((store) => store.user);
  const [quizInfo, setQuizInfo] = useState([]);
  const [showQuizLeaderboard, setShowQuizLeaderboard] = useState(false);
  const [LeaderboardData, setLeaderboardData] = useState([]);
  const leaderboardCache = useRef({}); // Cache object to store leaderboard data by quiz ID

  useEffect(() => {
    async function getResult() {
      try {
        if (userId) {
          const res = await axios.post("https://quiz-app-du7w.onrender.com/api/user/getAllQuizId", { userId }, { withCredentials: true });
          setQuizInfo(res.data.QuizInfo);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getResult();
  }, [userId]);

  const handleQuizLeaderboardShow = useCallback(async (quizId) => {
    // Check if leaderboard data is already cached
    if (leaderboardCache.current[quizId]) {
      setLeaderboardData(leaderboardCache.current[quizId]);
      setShowQuizLeaderboard(true);
      return;
    }

    try {
      const res = await axios.post("https://quiz-app-du7w.onrender.com/api/leaderboard/get-quizLeaderboard", { quizId }, { withCredentials: true });
      if (res && res.data) {
        const data = res.data.leaderboard;
        leaderboardCache.current[quizId] = data; // Cache the data
        setLeaderboardData(data);
        setShowQuizLeaderboard(true);
      } else {
        console.log("Failed to get Leaderboard RESPONSE");
      }
    } catch (error) {
      console.error("Error fetching leaderboard data", error);
    }
  }, []);

  return (
    <>
      {showQuizLeaderboard ? 
        <LeaderboardUi leaderboard={LeaderboardData} /> :
        <div className="quiz-container">
          <h1>All Quizzes</h1>
          {quizInfo.map((quiz, index) => (
            <div className="quiz-card" key={quiz._id}>
              <div className="quiz-number">{index + 1}</div>
              <div className="quiz-details">
                <h2 className="quiz-name">{quiz.name}</h2>
                <p className="quiz-owner">Created by: <span>{quiz.owner.username.toUpperCase()}</span></p>
                <p className="quiz-participants">Participants: <span>{quiz.participants.length}</span></p>
                <p className="quiz-questions">Questions: <span>{quiz.questions.length}</span></p>
              </div>
              <button onClick={() => handleQuizLeaderboardShow(quiz._id)} className="visit-button">Visit</button>
            </div>
          ))}
        </div>
      }
    </>
  );
};

export default Leaderboard;
