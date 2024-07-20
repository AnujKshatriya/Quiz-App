import React from 'react';
import './samplebody.css';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom


const BodySection = () => {
    return (
        <div className="body-section">
            <div className="hero-section">
                <div className='hero-left'>
                    <h1>Welcome to the Quizzer</h1>
                    <p>Test your knowledge with our exciting quiz. Click the button below to get started and see how much you know!</p>
                    <div className='button-section'>
                        <Link to='/quiz-create'><button className="start-button">Create Quiz</button></Link>
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
