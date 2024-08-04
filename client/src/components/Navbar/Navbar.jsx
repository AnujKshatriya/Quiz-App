import React, { useState } from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsLogin } from '../../redux/userSlice.js';
import { setAuthUser } from '../../redux/userSlice.js';
import axios from 'axios';

const Navbar = ({showLogin,showSignup}) => {

    const [menu, selectMenu] = useState("None")

    const isLoggedIn = useSelector((state)=> state.login.isLogin);

    const dispatch = useDispatch()
   
    const handleLogout = async () => {
      try {
        // Call the server's logout endpoint
        const response = await axios.get('/api/user/logout');
        
        if (response.data.success) {
          // Update the local state to reflect that the user is logged out
          localStorage.removeItem('token');
          dispatch(setIsLogin(false));
          dispatch(setAuthUser(null));

        } else {
          console.error("Logout failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error during logout:", error.message);
      }
    };
    
  return (
    <div>
        <div className='navbar'>
          <div className="left">
            <h1 className='title'>Quizz</h1>
          </div>
          <div className="center">
            <ul className="center_list" >
                <Link to='/'><li onClick={()=>selectMenu(menu !== "home" ? "home" : "none")} className={menu==="home"?"active":"home"}>Home</li></Link>
                <Link to='/my-quiz'><li onClick={()=>selectMenu(menu !== "myquiz" ? "myquiz" : "none")} className={menu==="myquiz"?"active":"myquiz"}>MyQuiz</li></Link>
                <Link to='/leaderboard'><li onClick={()=>selectMenu(menu !== "leaderboard" ? "leaderboard" : "none")} className={menu==="leaderboard"?"active":"leaderboard"}>Leaderboard</li></Link>
                <Link to='/about'><li onClick={()=>selectMenu(menu !== "about" ? "about" : "none")} className={menu==="about"?"active":"about"}>About</li></Link>
            </ul>
          </div>


          <div className="right">
            
          {!isLoggedIn?
          (
            <div>
              <button className="login"  onClick={()=>{showLogin(true)}}>Login</button>
              <button className="SignUp" onClick={()=>{showSignup(true)}}>Sign Up</button>
             </div>
            ):(
            <button className="SignUp" onClick={()=>{handleLogout(false)}}>Logout</button>
          )
          }

          </div>


        </div>
        
    </div>
  )
}

export default Navbar
