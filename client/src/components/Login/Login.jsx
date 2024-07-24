import React, {useState} from 'react'
import './Login.css'
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios"
import toast from "react-hot-toast"
import {useDispatch} from "react-redux"
import { setAuthUser } from '../../redux/userSlice.js';

const Login = ({showLogin,showSignup}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const loginUser = async() => {
    try {
      const res = await axios.post("/api/user/login",{email,password})

      if(res.data.success){

        const token = res.data.token; // Ensure the server sends this token
        
        dispatch(setAuthUser(res.data.userId))
        toast.success(res.data.message)
        showLogin(false)
      }
      else{
        toast.error(res.data.message)
      } 
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
                <h1>Login</h1>
                <MdOutlineCancel className='close-icon' onClick={()=>showLogin(false)} />
            </div>
            <div className="form_items">
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Your Email' />
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder='Your Password' />
            </div>
            <div className="buttonforlogin">
                <button onClick={loginUser} className="login-button">Login</button>
            </div>
            <div className="permission">
                <input type="checkbox" />
                <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
            <div className="base">
                <p>Create a New Account?<span onClick={()=>{showSignup(true);showLogin(false);}}>Click Here</span></p>
            </div>

            
        </div>
      </div>
    </div>
  )
}

export default Login
