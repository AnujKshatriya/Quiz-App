import React from 'react';
import './Footer.css';
import images from '../../assets/assets.js';

const Footer = () => {
  return (
    <div className='total_footer'>
      <div className='footer'>
        <div className='left____'>
          <h1>Quizzer</h1>
          <p>Quizz is your go-to platform for interactive quizzes across various topics. Whether you want to test your knowledge, learn something new, or just have fun, we have something for everyone!</p>
          <p>Join our community to explore engaging quizzes, track your progress, and compete with friends.</p>
          <ul className="social">
            <li><img className='image1' src={images.facebook_icon} alt="Facebook" /></li>
            <li><img src={images.linkedin_icon} alt="LinkedIn" /></li>
            <li><img src={images.twitter_icon} alt="Twitter" /></li>
          </ul>
        </div>

        <div className="center____">
          <h1>Company</h1>
          <ul className="item_center">
            <li>Home</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="right____">
          <h1>Get in Touch</h1>
          <ul>
            <li>+1-212-456-7890</li>
            <li>quizz@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className='end'>
        <div className="ending">
          Copyright &copy; {new Date().getFullYear()} Quizzer.com
        </div>
      </div>
    </div>
  );
}

export default Footer;
