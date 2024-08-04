import React, { useState } from 'react'
import "./JoinQuiz.css"
import SocketConnection from '../../custom hooks/SocketConnection'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const JoinQuiz = () => {

    SocketConnection()
    const questions = useSelector(state=>state.quiz.joinedQuizQuestions);
    const error = useSelector(state=>state.quiz.quizError);
    console.log('Questions',questions)

    const total_questions  =  questions.length;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigate = useNavigate()

    const handlePrevious = () =>{
      if(currentQuestionIndex>0){
        setCurrentQuestionIndex(currentQuestionIndex-1);
      }
    }

    const handleNext = () =>{
      if(currentQuestionIndex<total_questions-1){
        setCurrentQuestionIndex(currentQuestionIndex+1)
      }
    }
    
    const question = questions[currentQuestionIndex]
    const ans = question.answer
    console.log(ans)

    const [score, setScore] = useState(0)


    const selectOption =(option) =>{
      const answ = String.fromCharCode(65 + option)
      if(answ === ans){
        setScore(score+1)
      }
      console.log(score)
    }

    const submitHandler =()=>{
      navigate('/leaderboard')
    }

  return (
    <div>
      <div className="top__part">
        <div className="quiz__name">
          {}
        </div>
        <div className="submit__section">
          <button onClick={submitHandler}>Submit</button>
        </div>
      </div>
      
      <div className="quiz__body">
        
          <div >
            <div className="question">
              {question.questionName};
            </div>
            <div className="options">
              {question.option.map((opt,index)=>(
                <div key={index} className='option' onClick={()=>selectOption(index)}>
                  {String.fromCharCode(65 + index)}. {opt} 
                </div>

              ))}

            </div>
              <div className="buttons">
                <button onClick={handleNext} disabled={currentQuestionIndex === total_questions - 1}>Next</button>
              </div>
            </div>
        
      </div>
    </div>
  )
}

export default JoinQuiz;
