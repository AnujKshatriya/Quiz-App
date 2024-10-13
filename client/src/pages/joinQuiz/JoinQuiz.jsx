import React, { useState } from 'react';
import './JoinQuiz.css';
import SocketConnection from '../../custom hooks/SocketConnection';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStopwatch } from 'react-timer-hook';
import axios from 'axios'

const JoinQuiz = () => {
  SocketConnection();
  const { joinedQuizId } = useSelector((store) => store.quiz);
  const { authUser } = useSelector((store) => store.user);
  const questions = useSelector((state) => state.quiz.joinedQuizQuestions) || [];
  const error = useSelector((state) => state.quiz.quizError);

  const total_questions = questions.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({ autoStart: true });

  const question = questions[currentQuestionIndex] || {};
  const correctAnswer = question.answer;

  // console.log('Current question:', question);
  // console.log('Correct answer:', correctAnswer);

  const checkAnswerAndUpdateScore = () => {
    if (selectedOption.toLowerCase() === correctAnswer.toLowerCase()) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (selectedOption) {
      checkAnswerAndUpdateScore();
      if (currentQuestionIndex < total_questions - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null);
      } else {
        submitHandler();
      }
    } else {
      toast.error('Please choose an option before proceeding.');
    }
  };

  const submitHandler = async () => {
    checkAnswerAndUpdateScore();
    pause(); // Pause the timer
    const finalScore = score + (selectedOption && selectedOption.toLowerCase() === correctAnswer.toLowerCase() ? 1 : 0);
    console.log(`Your final score is ${finalScore}. and setscore value is ${score}`)
    console.log(`Time taken: ${minutes}:${seconds}`);
    const time = parseInt(minutes)*60 + parseInt(seconds);
    
    try {
      const res = await axios.post("http://localhost:3000/api/leaderboard/set-userANDquiz", { userId:authUser, quizId : joinedQuizId}, { withCredentials: true });
    } 
    catch (error) {
      console.error(error)
    }

    navigate('/intermediate', { state: { finalScore, time, joinedQuizId } });
  };

  // Format the elapsed time as hours:minutes:seconds
  const formatTime = (hours, minutes, seconds) => {
    return (
      <>
        <span className="minutes">{minutes < 10 ? '0' : ''}{minutes}</span>:<span className="seconds">{seconds < 10 ? '0' : ''}{seconds}</span>
      </>
    );
  };

  return (
    <div className='main__background'>
      <div className="top__part">
        <div className="quiz__name">General Test</div>
        <div className="timer">
        {formatTime(hours, minutes, seconds)}
      </div>      
      </div>

      <div className="quiz__body">
        {question ? (
          <div>
            <div className="question__">
              {currentQuestionIndex + 1}. {question.questionName}
            </div>
            <div className="options__">
              {question?.option?.map((opt, index) => (
                <div
                  key={index}
                  className={`option__ ${selectedOption === String.fromCharCode(65 + index) ? 'active__' : ''}`}
                  onClick={() => {
                    const optionChar = String.fromCharCode(65 + index);
                    setSelectedOption(selectedOption === optionChar ? null : optionChar);
                  }}
                >
                  {String.fromCharCode(65 + index)}. {opt}
                </div>
              ))}
            </div>
            <div className="buttons___">
              {currentQuestionIndex < total_questions - 1 ? (
                <button onClick={handleNext}>Next</button>
              ) : (
                <button onClick={submitHandler}>Submit</button>
              )}
            </div>
          </div>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default JoinQuiz;
