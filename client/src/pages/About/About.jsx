import React from 'react';
import './About.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Our Quiz Website</h1>
      <p className="about-description">
        Welcome to our Quiz Website! We provide an interactive platform for users to test their knowledge across various subjects.
      </p>
      <h2 className="about-section-title">Features</h2>
      <ul className="about-features-list">
        <li>Wide range of quiz categories</li>
        <li>User-friendly interface</li>
        <li>Real-time score tracking</li>
        <li>Leaderboard to compare scores with others</li>
        <li>Instant feedback on quiz performance</li>
      </ul>
      <h2 className="about-section-title">Get Involved</h2>
      <p className="about-description">
        We encourage users to provide feedback and suggestions to help us improve the platform. Join us on this learning journey!
      </p>
    </div>
  );
}

export default About;
