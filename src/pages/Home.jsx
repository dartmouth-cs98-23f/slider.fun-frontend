import React from 'react'
import "../styles/home.scss"
// import Header from '../components/Header'
import sliderLogo from "../assets/main_logo_red.png"
// import homeSliderPic from "../assets/group8.svg"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='homeContainer'>
      {/* <Header /> */}
      <div className="mainMenu">
        <img src={sliderLogo} alt=""></img>

        <div className='buttonContainer'>
          <button>Tutorial</button>
          <button onClick={() => { navigate("/stage1") }} >
            Play
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home