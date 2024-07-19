import React, { useState } from 'react'
import './Signup.css'
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios"
import toast from "react-hot-toast"
import {useDispatch} from "react-redux"
import { setAuthUser } from '../../redux/userSlice.js';

const SignUp = ({showSignup, showLogin}) => {
  const [username, setUserame] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const registerUser = async() => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/register",{username,email,password})
      if(res.data.success){
        dispatch(setAuthUser(res.data.userId))
        toast.success(res.data.message)
        showSignup(false)
      }
      else{
        toast.error(res.data.message)
      }     
      setUserame("")
      setEmail("")
      setPassword("")
    } 
    catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='overlay'>
      <div className="login_form">
        <div className="conatiner">
            <div className="head-part">
                <h1>SignUp</h1>
                <MdOutlineCancel className='close-icon' onClick={()=>showSignup(false)} />
            </div>
            <div className="form_items">
                <input value={username} onChange={(e)=>{setUserame(e.target.value)}} type="text" placeholder='Your Name' />
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Your Email' />
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Your Password' />
            </div>
            <div className="buttonforlogin">
                <button onClick={registerUser} className="login-button">Sign Up</button>
            </div>
            <div className="permission">
                <input type="checkbox" />
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
