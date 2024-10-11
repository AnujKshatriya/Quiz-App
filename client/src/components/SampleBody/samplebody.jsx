import React, { useState, useEffect, useRef } from "react";
import "./samplebody.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import { setJoinedQuizId } from "../../redux/quizSlice";
import { gsap } from "gsap";

const BodySection = () => {
  const isLogin = useSelector((state) => state.login.isLogin);
  const owner = useSelector((state) => state.user.authUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const heroRef = useRef(null);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.7, delay: 0.5 }
    );
    gsap.fromTo(
      inputRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, delay: 1 }
    );
  }, []);

  const redirect = () => {
    if (isLogin && owner) {
      navigate("/quiz-create");
    } else {
      toast.error(`Please Login to create a quiz`, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const [quizId, setQuizId] = useState("");

  const joinQuizHandler = () => {
    dispatch(setJoinedQuizId(quizId));
    navigate("/join-quiz");
  };

  return (
    <div className="body-section">
      <div className="hero-section" ref={heroRef}>
        <div className="hero-left">
          <h1>Welcome to the Quizzer</h1>
          <p>
            Test your knowledge with our exciting quiz. Click the button below
            to get started!
          </p>
          <div className="button-section" ref={buttonRef}>
            <button onClick={redirect} className="start-button">
              Create Quiz
            </button>
            <div className="join-quiz-field">
              <input
                ref={inputRef}
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                placeholder="# Enter Code To Join Quiz"
                className="join-input"
                type="text"
              />
              <FaArrowRightLong
                onClick={joinQuizHandler}
                className="join-button"
              />
            </div>
          </div>
        </div>
        <img className="hero-right" src="/quiz-page.avif" alt="Quiz banner" />
      </div>
      <div className="sample-question">
        <div className="question-card">
          <h2>What is the capital of France?</h2>
          <ul>
            <li style={{ "--i": 1 }}>London</li>
            <li style={{ "--i": 2 }}>Paris</li>
            <li style={{ "--i": 3 }}>Rome</li>
            <li style={{ "--i": 4 }}>Berlin</li>
          </ul>
        </div>

        <div className="question-card">
          <h2>Who developed the theory of relativity?</h2>
          <ul>
            <li style={{ "--i": 1 }}>Isaac Newton</li>
            <li style={{ "--i": 2 }}>Albert Einstein</li>
            <li style={{ "--i": 3 }}>Galileo Galilei</li>
            <li style={{ "--i": 4 }}>Nikola Tesla</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BodySection;
