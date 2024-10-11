import React, { useEffect, useRef } from 'react';
import './App.css';
import images from '../../assets/assets.js';
import { gsap } from 'gsap';

const AppDownload = () => {
  const appRef = useRef(null);
  
  useEffect(() => {
    gsap.from(appRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    });
  }, []);

  return (
    <div className='app-download' id='app-download' ref={appRef}>
      <p>For Better Experience Download<br/>Quizz App</p>
      <div className="app-download-platforms">
        <img src={images.play_store} alt="Google Play Store" />
        <img src={images.app_store} alt="Apple App Store" />
      </div>
    </div>
  );
}

export default AppDownload;
