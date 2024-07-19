
import BodySection from '../../components/SampleBody/samplebody'
import AppDownload from '../../components/App/App'
import Login from '../../components/Login/Login'
import SignUp from '../../components/signup/Signup'
import Navbar from '../../components/Navbar/Navbar'
import { useState } from 'react'

const Home = () => {

  const [login,showLogin] = useState(false)
  const [signup,showSignup] = useState(false)

  return (
    <div>
      {login?<Login showLogin={showLogin} showSignup={showSignup}/>:""}
      {signup?<SignUp showLogin={showLogin} showSignup={showSignup}/>:""}
      <Navbar showLogin={showLogin} showSignup={showSignup}/>

      
      <BodySection/>
      <AppDownload/>
      
    </div>
  )
}

export default Home
