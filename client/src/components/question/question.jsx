import React, { useState } from "react";
import "./question.css";

const Question = () => {
  const [options, setOptions] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);

  const addNewChoice = () => {
    setOptions([...options,{id:options.length +1, value:""}])
  };

  const handleOnChange = (id, newValue) => {
      setOptions(options.map(option => option.id === id? {...option, value:newValue}:option))
  };

  const deleteChoice = (id) =>{
    setOptions(options.filter(option => option.id !== id));
  }

  return (
    <div>
      <div className="question__section">
        <div className="question">
          {/* UseState Case */}
          <p>
            <span>Question 1</span>
          </p>
          <input type="text" placeholder="Your Question Here" />
        </div>

        <div className="choices__section">
          <p>Choices</p>
          <div className="choice__section">
            <div className="choices">

              {options.map((option) => (
                <div key={option.id}>
                  <div className="choice">
                    <p>{String.fromCharCode(65 + option.id - 1)}:</p>
                    <div className="input__area">
                      <input type="text"  placeholder="Add your Option" value={option.value}  onChange={(e)=>handleOnChange(option.id,e.target.value)}/>
                      {option.id > 2 && (
                        <button
                          className="choice__delete"
                          onClick={() => deleteChoice(option.id)}
                        >
                          X
                        </button>
                      )}       
                    </div>         
                  </div>
                </div>
              ))}

              <div className="new__choice">
                <button className="new__choice" onClick={addNewChoice}  >
                  Add a New Choice
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="correct">
          <p>Correct Answer</p>
          <input type="text" placeholder="Add the correct Answer"  />
        </div>
      </div>
    </div>
  );
};

export default Question;
