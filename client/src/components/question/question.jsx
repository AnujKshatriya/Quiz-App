import React, { useState } from "react";
import "./question.css";

const Question = () => {
    const [option,setOption] = useState({});

  return (
    <div>
      <div className="question__section">
        <div className="question">
          {/* UseState Case */}
          <p><span>Question 1</span></p>
          <input type="text" placeholder="Your Question Here" />
        </div>

        <div className="choices__section">
          <p>Choices</p>
          <div className="choice__section">
            <div className="choices">
                <div className="choice">
                <p>A: </p>
                <input type="text" placeholder="Add option" />
                </div>

                <div className="choice">
                <p>B: </p>
                <input type="text" placeholder="Add option" />
                </div>

                <div className="new__choice">
                    <button className="new__choice">Add a New Choice</button>
                </div>
            </div>

          </div>
        </div>

        <div className="correct">
          <p>Correct Answer</p>
          <input type="text" placeholder="Add the correct Answer" />
        </div>
      </div>
    </div>
  );
};

export default Question;
