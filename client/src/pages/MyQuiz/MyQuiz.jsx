// src/pages/MyQuiz/MyQuiz.jsx
import React, { useEffect, useState } from "react";
import "./MyQuiz.css";
import axios from "axios";
import { useSelector } from "react-redux";

const MyQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const owner = useSelector((state) => state.user.authUser);

  console.log("Current User (Owner):", owner);

  useEffect(() => {
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

    // Only fetch quizzes if the owner is available
    if (owner) {
      fetchQuiz();
    } else {
      console.warn("No owner found, skipping fetch");
    }
  }, [owner]); // Add owner as a dependency

  return (
    <div>
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
              <h2>{quiz.name}</h2>
              <p>Questions: {quiz.questions.length}</p>
            </div>
          ))
        ) : (
          <p>No Quizzes Found</p>
        )}
      </div>
    </div>
  );
};

export default MyQuiz;
