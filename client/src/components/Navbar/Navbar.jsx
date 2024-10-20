import React, { useState } from 'react'
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsLogin } from '../../redux/userSlice.js';
import { setAuthUser } from '../../redux/userSlice.js';
import axios from 'axios';
import { toast } from "react-toastify";

const Navbar = ({showLogin,showSignup}) => {

    const [menu, selectMenu] = useState("None")
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.login.isLogin);
    const owner = useSelector((state) => state.user.authUser);

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

    const handleNavigate = (route,menuTitle,check)=>{
      if((!isLogin && !owner) && !check){
          toast.error(`Please Login First`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return;
      }
      selectMenu(menu !== menuTitle ? menuTitle : "none");
      navigate(route);
    }
    
  return (
    <div>
        <div className='navbar'>
          <div className="left">
            <h1 className='title'>Quizzer</h1>
          </div>
          <div className="center">
            <ul className="center_list" >
                <li onClick={()=>handleNavigate("/","home",true)} className={menu==="home"?"active":"home"}>Home</li>
                <li onClick={()=>handleNavigate('/my-quiz',"myquiz",false)} className={menu==="myquiz"?"active":"myquiz"}>MyQuiz</li>
                <li onClick={()=>handleNavigate('/leaderboard',"leaderboard", false)} className={menu==="leaderboard"?"active":"leaderboard"}>Leaderboard</li>
                <li onClick={()=>handleNavigate("/about","about",true)} className={menu==="about"?"active":"about"}>About</li>
            </ul>
          </div>


          <div className="right">
            
          {!isLoggedIn?
          (
            <div className='right_switch_buttons'>
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
