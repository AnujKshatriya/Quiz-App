import React from 'react'
import './quizCreate.css'
import { MdQuiz } from "react-icons/md";
import Question from '../../components/question/question';


const QuizCreate = () => {
  return (
    <div>
      <div className="full">

        <div className="header">
            {/* Later Add Logo and TO Edit */}  
            <h1 className="logo">Quizz <span>Maker</span></h1>
            <button className="save">Save</button>
        </div>


        <div className="quiz">
            <div className="quiz__left">
                <p>1</p>
                <h3>Quiz Name: </h3>
                <input type="text" placeholder='Enter the name of your Quiz...'/>
            </div>
            <div className="quiz__right">
                <button><MdQuiz /></button>
            </div>
        </div>

        <div className="questions">

            <div className="question__top">
                <p>2</p>
                <h2>Quiz Questions: </h2>
            </div>

            <div className="eachQuestion">
                <Question/>
            </div>

            <div className="add__question">
                <button className="add__question__button">Add a New Question</button>
            </div>
        </div>




      </div>
    </div>
  )
}

export default QuizCreate
