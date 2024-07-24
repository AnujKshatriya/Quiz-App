import React, { useState } from 'react';
import './samplebody.css';
import { Link, useNavigate } from 'react-router-dom';  // Import Link from react-router-dom
import { FaArrowRightLong } from "react-icons/fa6";
import { setJoinedQuizId } from '../../redux/quizSlice';
import {useDispatch} from 'react-redux'


const BodySection = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [quizId, setQuizId] = useState("")
    
    const joinQuizHandler = ()=>{
        dispatch(setJoinedQuizId(quizId))
        navigate('/join-quiz')
    }

    return (
        <div className="body-section">
            <div className="hero-section">
                <div className='hero-left'>
                    <h1>Welcome to the Quizzer</h1>
                    <p>Test your knowledge with our exciting quiz. Click the button below to get started and see how much you know!</p>
                    <div className='button-section'>
                        <Link to='/quiz-create'><button className="start-button">Create Quiz</button></Link>
                        <div className='join-quiz-field'>
                            <input value={quizId} onChange={(e)=>setQuizId(e.target.value)} placeholder='# Enter Code To Join Quiz' className='join-input' type="text" />
                            <FaArrowRightLong onClick={joinQuizHandler} className='join-button'/>
                        </div>
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
