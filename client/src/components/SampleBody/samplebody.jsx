import React from 'react';
import './samplebody.css';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BodySection = () => {
    const isLogin = useSelector((state) => state.login.isLogin);
    const owner = useSelector((state) => state.user.authUser);
    const navigate = useNavigate()

    const redirect = () =>{
        if(isLogin && owner){
            navigate('/quiz-create')
        }
        else{
            toast.error(`Please Login to create a quiz`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    }


    return (
        <div className="body-section">
            <div className="hero-section">
                <div className='hero-left'>
                    <h1>Welcome to the Quizzer</h1>
                    <p>Test your knowledge with our exciting quiz. Click the button below to get started and see how much you know!</p>
                    <div className='button-section'>
                        <button onClick={redirect} className="start-button">Create Quiz</button>
                        <input placeholder='# Enter Code To Join Quiz' className='join-button' type="text" />
                    </div>
                </div>
                <img className='hero-right' src="/quiz-page.avif" alt="" />
            </div>
            <div className='sample-question'>
                <div className="question-card">
                    <h2>Sample Question 1</h2>
                    <p>What is the capital of France?</p>
                    <ul>
                        <li>London</li>
                        <li>Paris</li>
                        <li>Rome</li>
                        <li>Berlin</li>
                    </ul>
                </div>
                <div className="question-card">
                <h2>Sample Question 2</h2>
                <p>What is the capital of France?</p>
                <ul>
                    <li>London</li>
                    <li>Paris</li>
                    <li>Rome</li>
                    <li>Berlin</li>
                </ul>
            </div>
            </div>
        </div>
    );
}

export default BodySection;
