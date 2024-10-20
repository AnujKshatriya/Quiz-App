import React, { useState } from 'react'
import './Signup.css'
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios"
import toast from "react-hot-toast"
import {useDispatch} from "react-redux"
import { setAuthUser, setIsLogin } from '../../redux/userSlice.js';

const SignUp = ({showSignup, showLogin}) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAgreed, setIsAgreed] = useState(false)

  const dispatch = useDispatch()

  const registerUser = async () => {
    if (!isAgreed) {
      toast.error("You must agree to the terms of use & privacy policy");
      return;
    }
    try {
      const res = await axios.post("https://quiz-app-du7w.onrender.com/api/user/register", { username, email, password }, { withCredentials: true });
      if (res.data.success) {
        // Automatically login after successful signup
        dispatch(setIsLogin(true));
        dispatch(setAuthUser(res.data.userId));

        toast.success(res.data.message);
        showSignup(false);
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error(error.message);
      }
    }
  };


  return (
    <div className='overlay'>
      <div className="login_form">
        <div className="container">
            <div className="head-part">
                <h1>SignUp</h1>
                <MdOutlineCancel className='close-icon' onClick={()=>showSignup(false)} />
            </div>
            <div className="form_items">
                <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='Your Name' />
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Your Email' />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Your Password' />
            </div>
            <div className="buttonforlogin">
                <button onClick={registerUser} className="login-button">Sign Up</button>
            </div>
            <div className="permission">
                <input type="checkbox" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} />
                <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
            <div className="base">
                <p>Already have an Account?<span onClick={()=>{showLogin(true);showSignup(false);}}>Click Here</span></p>
            </div>            
        </div>
      </div>
    </div>
  )
}

export default SignUp
