import React, { useState } from 'react'
import './quizCreate.css'
import { MdQuiz } from "react-icons/md";
import Question from '../../components/question/question';


const QuizCreate = () => {

  const [questions, setQuestions] = useState([{id:1}]);

  const addNewQuestion = () =>{
    setQuestions([...questions,{id:questions.length + 1}])
  }

  const deleteQuestion = (id) =>{
    setQuestions(questions.filter(question=>question.id !== id))
  }

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

            {questions.map(question => (
              <div className="eachQuestion" key={question.id}>
                <Question id={question.id} deleteQuestion={deleteQuestion}/>
              </div>
            ))}

            <div className="add__question">
                <button className="add__question__button" onClick={addNewQuestion}>Add a New Question</button>
            </div>
        </div>




      </div>
    </div>
  )
}

export default QuizCreate
