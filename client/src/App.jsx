import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin, setAuthUser } from './redux/userSlice';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import QuizCreate from './pages/quizCreate/quizCreate';
import Login from './components/Login/Login';
import SignUp from './components/signup/Signup';
import MyQuiz from './pages/MyQuiz/MyQuiz';
import JoinQuiz from './pages/joinQuiz/JoinQuiz';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import About from './pages/About/About';
import { ToastContainer } from 'react-toastify';
import SocketLeaderboard from './pages/SocketLeaderboard/SocketLeaderboard';
import IntermediatePage from './pages/intermediate/Intermediate.jsx';

const App = () => {
  const [login, showLogin] = useState(false);
  const [signup, showSignup] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.authUser);
  const location = useLocation(); // Hook to get the current location

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setIsLogin(true));
      dispatch(setAuthUser(userId));
    }
  }, [dispatch, userId]);

  // Adjust the condition to exclude both IntermediatePage and JoinQuiz
  const shouldShowNavbarAndFooter = !location.pathname.includes('/join-quiz') && !location.pathname.includes('/intermediate');

  return (
    <div>
      {login && <Login showLogin={showLogin} showSignup={showSignup} />}
      {signup && <SignUp showLogin={showLogin} showSignup={showSignup} />}
      {shouldShowNavbarAndFooter && <Navbar showLogin={showLogin} showSignup={showSignup} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz-create" element={<QuizCreate />} />
        <Route path="/join-quiz" element={<JoinQuiz />} />
        <Route path="/my-quiz" element={<MyQuiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/intermediate" element={<IntermediatePage />} />
        <Route path="/:quizid/leaderboard" element={<SocketLeaderboard />} />
      </Routes>
      {shouldShowNavbarAndFooter && <Footer />}
      <ToastContainer />
    </div>
  );
};

export default App;
