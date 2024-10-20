import React, { useEffect, useState } from "react";
import "./MyQuiz.css";
import axios from "axios";
import { useSelector } from "react-redux";
import img from '../../assets/q10.png'
import { MdOutlineContentCopy } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { MdOutlineQuiz } from "react-icons/md";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const MyQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLogin = useSelector((state) => state.login.isLogin);
  const owner = useSelector((state) => state.user.authUser);

  // Move fetchQuiz to be a top-level function
  const fetchQuiz = async () => {

    try {
      const response = await axios.post(
        "https://quiz-app-du7w.onrender.com/api/quiz/displayQuizList",
        {
          userId: owner,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setQuizzes(response.data.quizzes);
      } else {
        setError(response.data.message);
        console.error("Error from API:", response.data.message);
      }
    } catch (error) {
      setError("Failed to fetch quizzes");
      console.error("API Request Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin && owner) {
      fetchQuiz();
    } else {
      setLoading(false);
      console.warn("User not logged in, skipping fetch");
    }
  }, [isLogin, owner]); // Add isLogin and owner as dependencies

  const copyId = async(id) => {
    try {
      await navigator.clipboard.writeText(id)
      toast.success(`Quiz ID copied to clipboard`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    } catch (error) {
      toast.error("Failed to copy quiz ID", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }

  const shareId = (id) => {
    // Construct the WhatsApp message link
    const message = `Check out this quiz: ${id}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    // Open the WhatsApp link in a new tab
    window.open(whatsappUrl, "_blank");
  };

  const navigate = useNavigate()

  const createNewQuiz = () =>{
    navigate('/quiz-create')
  }

  const deleteQuiz = async (id) => {
    try {
      const response = await axios.post(
        "https://quiz-app-du7w.onrender.com/api/quiz/deleteQuiz",
        { 
          quizId: id,
          userId: owner
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      
      if (response.data.success) {
        toast.success('Quiz deleted successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        // Refresh the quiz list after deletion
        fetchQuiz();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error.response ? error.response.data : error.message);
      toast.error('Error deleting quiz', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  
  return (
    <div className="quizdisplay">
      <div className="heading">
        <h1>My Quizzes</h1>
      </div>

      <div className="quiz_list">
        {!isLogin ? (
          <p>Please log in first</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="quiz_item">
                
                <div className="top_part">

                  <div className="icon__">
                    <div className="icon2"><MdOutlineQuiz /></div>
                  </div>
                  <div className="deletebutton" onClick={() => deleteQuiz(quiz._id)}>
                    <MdDelete />
                  </div>
                </div>
                
                <div className="middle">
                  <h3>{quiz.name}</h3>
                  <p>{quiz.questions.length} question(s)</p>
                  <div className="buttons">
                    <button className="copyId" onClick={() => copyId(quiz._id)}>
                      Copy Code <MdOutlineContentCopy />
                    </button>
                    <button className="shareId" onClick={() => shareId(quiz._id)}>
                      Share Code <FaShareSquare />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="new__quiz" onClick={createNewQuiz}>
              <div className="icon">
                <GoPlus />
              </div>
              <div className="text">
                <p>Add a new Quiz</p>
              </div>
            </div>
          </>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default MyQuiz;
