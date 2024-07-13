import React from 'react'
import './Signup.css'

const SignUp = ({showSignup, showLogin}) => {
  return (
    <div className='overlay'>
      <div className="login_form">
        <div className="conatiner">
            <div className="head_part">
                <h1>SignUp</h1>
                <p className='close' onClick={()=>showSignup(false)}>X</p>
            </div>
            <div className="form_items">
                <input type="text" placeholder='Your Name' />
                <input type="text" placeholder='Your Email' />
                <input type="text" placeholder='Your Password' />
            </div>
            <div className="buttonforlogin">
                <button className="login_button">Sign Up</button>
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
