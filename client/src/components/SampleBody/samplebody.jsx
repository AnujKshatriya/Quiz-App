import React from 'react';
import './samplebody.css';

const BodySection = () => {
    return (
        <div className="body-section">
            <h1>Welcome to the Quiz</h1>
            <p>Test your knowledge with our exciting quiz. Click the button below to get started and see how much you know!</p>
            <button className="start-button">Start Quiz</button>

            <div className="question-card">
                <h2>Sample Question</h2>
                <p>What is the capital of France?</p>
                <ul>
                    <li>London</li>
                    <li>Paris</li>
                    <li>Rome</li>
                    <li>Berlin</li>
                </ul>
            </div>
        </div>
    );
}

export default BodySection;
