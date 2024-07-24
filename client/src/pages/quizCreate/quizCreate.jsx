import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './quizCreate.css';
import { MdQuiz } from "react-icons/md";
import Question from '../../components/question/question';
import toast from 'react-hot-toast';
import {useSelector} from 'react-redux';


const QuizCreate = () => {

  const owner = useSelector(store=>store.user.authUser);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [quizName,setQuizName] = useState("")
  const [quizQuestions,setQuizQuestions] = useState([]);
  const [participants, setParticipants] = useState([])
  const [questions, setQuestions] = useState([{
    id: 0,
    data: {
      questionName: "",
      options: [{ id: 1, value: "" }, { id: 2, value: "" }, { id: 3, value: "" }, { id: 4, value: "" }],
      answer: ""
    }
  }]);
  const [savedQuestionId, setSavedQuestionId] = useState(-1)


  //Add new Question
  const addNewQuestion = () => {
    const prevIndex = questions.length - 1;  // checking if previous quesition is filled completely or not
    if(prevIndex >= 0){
      const {questionName, options, answer} = questions[prevIndex].data
      if(questionName==="" || answer===""){
        toast.error("Please fill previous question data first")
        return ;
      }
      options.forEach(option => {
        if(option.value==="") {
          toast.error("Please fill previous question data first")
          return ;
        }
      });
    }

    if(prevIndex !== savedQuestionId){
      toast.error("Please Save Previous Question")
      return ;
    }

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
  const deleteQuestion = async(id) => {
    let size = 0;   // 1) case when user want to delete single question
    let idx = 0;
    quizQuestions.forEach((element,indx) => {
      if(element!=="") {
        size++;
        idx == indx;
      }
    });
    if(size<=1 && idx===id){
      toast.error("Single Question Is Must")
      return;
    }


    const toDeleteQuestion = questions.find(obj => obj.id === id)?.data; // 2) case when user want to delete empty question section
    const {questionName, options, answer} = toDeleteQuestion   
      if(questionName==="" || answer===""){
        setQuestions(questions.filter(question => question.id !== id));
        toast.success("Question Deleted Successfully")
        return ;
      }
      options.forEach(option => {
        if(option.value==="") {
          setQuestions(questions.filter(question => question.id !== id));
          toast.success("Question Deleted Successfully")
          return ;
        }
      });
  

    const quesId = quizQuestions[id]  // 3) case when user want to delete question which he had already saved in database
    try {
      const response = await axios.post('/api/quiz/deleteQuestion', {
        questionId : quesId
      }, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json',
        }
      })
      quizQuestions[id] = ""
      toast.success("Question Deleted Successfully")
      setQuestions(questions.filter(question => question.id !== id));
    } 
    catch (error) {
      toast.error(error.message)
    }
    
  };


//OnChange Handlers
  const onUpdate = (id, updatedData) => {
    setQuestions(questions.map(question =>
      question.id === id ? { ...question, data: updatedData } : question
    ));
  };

//Saving a Question
  const saveQuestion = async (id) => {
    if(savedQuestionId===id){
      toast.error("Question is already saved")
      return
    }

    try {
      const questionToSave = questions.find(question => question.id === id);
      if (!questionToSave) {
        throw new Error('Question Not Found');
      }
      const { data } = questionToSave;
      const response = await axios.post('/api/quiz/createQuestion', {
        questionName: data.questionName,
        option: data.options.map(opt => opt.value),
        answer: data.answer
      }, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.data.success) {
        setQuizQuestions(prevState => [...prevState, response.data.questionId]);
        setSavedQuestionId(id)
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
  
    } 
    catch (error) {
      toast.error("There was an error saving the question!");
      console.error("There was an error saving the question!", error);
    }
  };


// Saving a Quiz
const saveQuiz = async() => { 
  const prevIndex = questions.length - 1;  // checking if previous quesition is filled completely or not before saving quiz
    if(savedQuestionId === -1){
      toast.error("Please Save Atleast One Question")
      return ;
    }
    if(prevIndex >= 0){
      const {questionName, options, answer} = questions[prevIndex].data
      if(questionName==="" || answer===""){
        toast.error("Please Fill All Question Before Saving Quiz")
        return ;
      }
      options.forEach(option => {
        if(option.value==="") {
          toast.error("Please Fill All Question Before Saving Quiz")
          return ;
        }
      });

      if(prevIndex > savedQuestionId){
        toast.error("Please Save All Question Before Saving Quiz")
        return ;
      }
    }
  try {
    const questionIdArray =  quizQuestions.filter((questionId)=>questionId!=="")
    const response = await axios.post('/api/quiz/createQuiz', {
      owner: owner,
      name: quizName,
      questions: questionIdArray
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.data.success) {
      toast.success(response.data.message);
    } 
    else {
      toast.error(response.data.message);
    }
  } 
  catch (error) {
    toast.error("There was an error saving the quiz!");
    console.error("There was an error saving the quiz!", error);
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
