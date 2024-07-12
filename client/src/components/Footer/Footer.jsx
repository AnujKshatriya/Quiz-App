import React from 'react'
import './Footer.css';
import images from '../../assets/assets.js';

const Footer = () => {
  return (
    <div className='total_footer'>
      <div className='footer'>
        <div className='left'>
          <h1>Quizz</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum distinctio enim corrupti neque doloribus fuga nesciunt perferendis? Adipisci voluptate nostrum iusto modi qui consectetur facere. Error mollitia facilis obcaecati voluptatem!</p>
          <ul className="social">
            <li><img className='image1' src={images.facebook_icon} /></li>
            <li><img src={images.linkedin_icon} /></li>
            <li><img src={images.twitter_icon}  /></li>
          </ul>
        </div>

        <div className="center_">
          <h1>Company</h1>
          <ul className="item_center">
            <li>Home</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="right_">
          <h1>Get in Touch</h1>
          <ul>
            <li>+1-212-456-7890</li>
            <li>quizz@gmail.co</li>

          </ul>
        </div>
      </div>
      <hr />
      <div className='end'>
        <div className="ending">
          Copyright &copy; Quizz.com
        </div>
      </div>
    </div>
  )
}

export default Footer
