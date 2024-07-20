import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './quizCreate.css';
import { MdQuiz } from "react-icons/md";
import Question from '../../components/question/question';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const QuizCreate = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [quizName,setQuizName] = useState("")
  const [quizQuestions,setQuizQuestions] = useState([]);
  const [questions, setQuestions] = useState([{
    id: 0,
    data: {
      questionName: "",
      options: [{ id: 1, value: "" }, { id: 2, value: "" }, { id: 3, value: "" }, { id: 4, value: "" }],
      answer: ""
    }
  }]);

  const [owner,setOwner] = useState('')


  useEffect(() => {
    const token = Cookies.get('token') || localStorage.getItem('token');
    if (token) {
      localStorage.setItem('token', token);
    }
  }, []);

  //Add new Question
  const addNewQuestion = () => {
    setQuestions([...questions, {
      id: questions.length ,
      data: {
        questionName: "",
        options: [{ id: 1, value: "" }, { id: 2, value: "" }, { id: 3, value: "" }, { id: 4, value: "" }],
        answer: ""
      }
    }]);
  };

  //Question Delete
  const deleteQuestion = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  };


//OnChange Handlers
  const onUpdate = (id, updatedData) => {
    setQuestions(questions.map(question =>
      question.id === id ? { ...question, data: updatedData } : question
    ));
  };

//Creating a Quiz
  const saveQuestion = async (id) => {
    try {
      // Retrieve token from cookies
      const token = Cookies.get('token') || localStorage.getItem('token');  
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }
  
      const questionToSave = questions.find(question => question.id === id);
      if (!questionToSave) {
        throw new Error('Question Not Found');
      }
  
      const { data } = questionToSave;

      const response = await axios.post('http://localhost:3000/api/quiz/createQuestion', {
        questionName: data.questionName,
        option: data.options.map(opt => opt.value),
        answer: data.answer
      }, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        }
      });
  
      if (response.data.success) {

        setQuizQuestions(prevState => [...prevState, response.data.questionId]);
        console.log([...quizQuestions, response.data.questionId]); // Log updated state
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
  
    } catch (error) {
      toast.error("There was an error saving the question!");
      console.error("There was an error saving the question!", error);
    }
  };

// Saving or Creating a Quiz
  const saveQuiz = async() =>{
    const token = Cookies.get('token') || localStorage.getItem('token');  
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }



  }
  return (
    <div>
      <div className="full">
        <div className="header">
          <h1 className="logo">Quizz <span>Maker</span></h1>
          <button className="save" onClick={saveQuiz}>Save</button>
        </div>

        <div className="quiz">
          <div className="quiz__left">
            <p>1</p>
            <h3>Quiz Name: </h3>
            <input type="text" placeholder='Enter the name of your Quiz...' value={quizName} onChange={(e)=>setQuizName(e.target.value)}/>
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
              <Question
                id={question.id}
                data={question.data}
                deleteQuestion={deleteQuestion}
                onUpdate={onUpdate}
                setCurrentQuestionId={setCurrentQuestionId}
              />
            </div>
          ))}

          <div className="add__question">
            <button className="add__question__button" onClick={() => saveQuestion(currentQuestionId)}>Save Question</button>
            <button className="add__question__button" onClick={addNewQuestion}>Add a New Question</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCreate;
