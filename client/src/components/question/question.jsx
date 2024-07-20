import React, { useState, useEffect } from "react";
import "./question.css";

const Question = ({id, deleteQuestion, data, onUpdate, setCurrentQuestionId}) => {
  
  const[questionName, setQuestionName] = useState(data.questionName);
  const[options,setOptions] = useState(data.options);
  const[answer,setAnswer] = useState(data.answer);

    //Why using UseEffect?
    useEffect(() => {
      setCurrentQuestionId(id);
    }, [id, setCurrentQuestionId]);

  //Handling Functions
  const handleQuestionChange = (e) =>{
    const newQuestion = e.target.value
    setQuestionName(newQuestion)
    onUpdate(id,{questionName:newQuestion,options,answer})
  }

  const handleOptionChange = (id,newValue) =>{
    const updatedOptions = options.map(option=>
      option.id===id?{...option,value:newValue}:option
    )
    setOptions(updatedOptions)
    onUpdate(id,{questionName,options:updatedOptions,answer})
  }

  const handleAnswerChange = (e) =>{
    const newAnswer = e.target.value
    setAnswer(newAnswer)
    onUpdate(id,{questionName,options,answer:newAnswer})
  }

  return (
    <div>
      <div className="question__section">
      
        {/* Delete Question */}
        {id>1?
          <div className="delete">
            <button
              className="question__delete"
              onClick={() => deleteQuestion(id)}
            >
              X
            </button>
          </div>
          :""
        }
      
        {/* Question */}
          <div className="question">
            <p>
              <span>Question {id+1}</span>
            </p>
            <input type="text" placeholder="Your Question Here" value={questionName} onChange={handleQuestionChange}/>
          </div>


          {/* Choices */}
          <div className="choices__section">
            <p>Choices</p>
            <div className="choice__section">
              <div className="choices">
                {options.map((option) => (
                  <div key={option.id}>
                    <div className="choice">
                      <p>{String.fromCharCode(65 + option.id - 1)}:</p>
                      <div className="input__area">
                        <input type="text"  placeholder="Add your Option" value={option.value} onChange={(e)=> handleOptionChange(option.id, e.target.value)}/>
                      </div>         
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Answer */}
          <div className="correct">
            <p>Correct Answer</p>
            <input type="text" placeholder="Add the correct Answer"  value={answer} onChange={handleAnswerChange}/>
          </div>
        </div>
    </div>
  );
};

export default Question;
