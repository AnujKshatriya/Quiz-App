import React from 'react'
import './Login.css'

const Login = ({showLogin,showSignup}) => {
  return (
    <div className='overlay'>
      <div className="login_form">
        <div className="conatiner">
            <div className="head_part">
                <h1>Login</h1>
                <p className='close' onClick={()=>showLogin(false)}>X</p>
            </div>
            <div className="form_items">
                <input type="text" placeholder='Your Email' />
                <input type="text" placeholder='Your Password' />
            </div>
            <div className="buttonforlogin">
                <button className="login_button">Login</button>
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
