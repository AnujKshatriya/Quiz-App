// src/pages/MyQuiz/MyQuiz.jsx
import React, { useEffect, useState } from "react";
import "./MyQuiz.css";
import axios from "axios";
import { useSelector } from "react-redux";
import img from '../../assets/q10.png'
import { MdOutlineContentCopy } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const owner = useSelector((state) => state.user.authUser);

  console.log("Current User (Owner):", owner);

  // Move fetchQuiz to be a top-level function
  const fetchQuiz = async () => {
    console.log("Fetching quizzes for owner:", owner);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/quiz/displayQuizList",
        {
          userId: owner,
        },
        {
          withCredentials: true,
        }
      );

      console.log("API Response:", response);

      if (response.data.success) {
        setQuizzes(response.data.quizzes);
        console.log("Fetched Quizzes:", response.data.quizzes);
      } else {
        setError(response.data.message);
        console.error("Error from API:", response.data.message);
      }
    } catch (error) {
      setError("Failed to fetch quizzes");
      console.error("API Request Error:", error);
    } finally {
      setLoading(false);
      console.log("Loading complete");
    }
  };

  useEffect(() => {
    // Only fetch quizzes if the owner is available
    if (owner) {
      fetchQuiz();
    } else {
      console.warn("No owner found, skipping fetch");
    }
  }, [owner]); // Add owner as a dependency

  const copyId = async(id) => {
    try {
      await navigator.clipboard.writeText(id)
      console.log("Quiz ID copied to clipboard")
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
      console.log("Failed to copy Quiz ID")
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

  const deleteQuiz = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/quiz/deleteQuiz",
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
        console.log("Quiz deleted successfully:", response.data);
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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz_item">
              <img src={img} alt="" />

              <div className="deletebutton" onClick={() => deleteQuiz(quiz._id)}>
                <MdDelete />
              </div>

              <div className="middle">
                <h2>{quiz.name}</h2>
                <p>Qn's - {quiz.questions.length}</p>
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
          ))
        ) : (
          <p>No Quizzes Found</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default MyQuiz;
