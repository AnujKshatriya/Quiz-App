import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import BodySection from './components/SampleBody/samplebody'
import AppDownload from './components/App/App'

const App = () => {
  return (
    <div>
      <Navbar/>


      <BodySection/>
      <AppDownload/>
      <Footer/>
    </div>
  )
}

export default App
