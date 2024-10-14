import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import './Leaderboard.css'; // Import the CSS file
import LeaderboardUi from '../../components/LeaderboardUi/LeaderboardUi';

const Leaderboard = () => {
  const { authUser: userId } = useSelector((store) => store.user);
  const [quizInfo, setQuizInfo] = useState([]); // array of objects
  const [showQuizLeaderboard, setShowQuizLeaderboard] = useState(false);
  const [LeaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    async function getResult() {
      try {
        if (userId) {
          const res = await axios.post("/api/user/getAllQuizId", { userId }, { withCredentials: true });
          setQuizInfo(res.data.QuizInfo);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getResult();
  }, [userId]);

  const handleQuizLeaderboardShow = async (quizId)=>{
    const res = await axios.post("/api/leaderboard/get-quizLeaderboard", {quizId}, {withCredentials:true});
    if(!res){
      console.log("Failed to get Leaderboard RESPONSE");
    }
    setLeaderboardData(res.data.leaderboard);
    setShowQuizLeaderboard(true)
  }
 

  return (
    <>
    {
      showQuizLeaderboard ? 
      <LeaderboardUi leaderboard={LeaderboardData}/> :
      <div className="quiz-container">
      <h1>User's All Quizzes</h1>
      {quizInfo.map((quiz, index) => (
        <div className="quiz-card" key={quiz._id}>
          <div className="quiz-number">{index + 1}</div>
          <div className="quiz-details">
            <h2 className="quiz-name">{quiz.name}</h2>
            <p className="quiz-owner">Created by: <span>{(quiz.owner.username).toUpperCase()}</span></p>
            <p className="quiz-participants">Participants: <span>{quiz.participants.length}</span></p>
            <p className="quiz-questions">Questions: <span>{quiz.questions.length}</span></p>
          </div>
          <button onClick={()=>{handleQuizLeaderboardShow(quiz._id)}}  className="visit-button">Visit</button>
        </div>
      ))}
      </div> 
    }
    </>
  );
};

export default Leaderboard;
