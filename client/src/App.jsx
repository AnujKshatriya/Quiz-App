import React, { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import Home from './pages/Home/Home';
import QuizCreate from './pages/quizCreate/quizCreate';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import SignUp from './components/signup/Signup';
import MyQuiz from './pages/MyQuiz/MyQuiz';
import { setIsLogin, setAuthUser } from './redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import JoinQuiz from './pages/joinQuiz/JoinQuiz';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import About from './pages/About/About';

const App = () => {
  const [login, showLogin] = useState(false);
  const [signup, showSignup] = useState(false);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.authUser);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setIsLogin(true));
      dispatch(setAuthUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ['websocket', 'polling'],
    });
    // console.log(socket)
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      {login ? <Login showLogin={showLogin} showSignup={showSignup} /> : ""}
      {signup ? <SignUp showLogin={showLogin} showSignup={showSignup} /> : ""}
      <Navbar showLogin={showLogin} showSignup={showSignup} />
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/quiz-create" element={<QuizCreate />} />
          <Route path='/join-quiz' element={<JoinQuiz/>} />
          <Route path='/join-quiz' element={<JoinQuiz/>} />
          <Route path="/my-quiz" element={<MyQuiz />} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/about" element={<About/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
