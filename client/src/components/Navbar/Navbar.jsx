import React, { useState } from 'react'
import './Navbar.css';

const Navbar = () => {

    const [menu, selectMenu] = useState("None")
  return (
    <div>
        <div className='navbar'>
          <div className="left">
            <h1 className='title'>Quizz</h1>
          </div>
          <div className="center">
            <ul className="center_list" >
                <li onClick={()=>selectMenu(menu !== "home" ? "home" : "none")} className={menu==="home"?"active":"home"}>Home</li>
                <li onClick={()=>selectMenu(menu !== "myquiz" ? "myquiz" : "none")} className={menu==="myquiz"?"active":"myquiz"}>My_Quiz</li>
                <li onClick={()=>selectMenu(menu !== "leaderboard" ? "leaderboard" : "none")} className={menu==="leaderboard"?"active":"leaderboard"}>Leaderboard</li>
                <li onClick={()=>selectMenu(menu !== "myscore" ? "myscore" : "none")} className={menu==="myscore"?"active":"myscore"}>My_Scores</li>
                <li onClick={()=>selectMenu(menu !== "about" ? "about" : "none")} className={menu==="about"?"active":"about"}>About</li>
                {/* <li></li> */}
            </ul>
          </div>

          <div className="right">
            <button className="login">Login</button>
            <button className="SignUp">Sign Up</button>
          </div>


        </div>
        
    </div>
  )
}

export default Navbar
