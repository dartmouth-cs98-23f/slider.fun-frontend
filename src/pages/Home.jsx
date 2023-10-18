import React from 'react'
import "../styles/home.scss"
// import Header from '../components/Header'
import homeSliderPic from "../assets/group8.svg"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='homeContainer'>
      {/* <Header /> */}
      <div className="mainMenu">
        <img src={homeSliderPic} alt=""></img>


        <h1> Slider.Fun </h1>
        <p> where sliding is fun </p>
        <div className='buttonContainer'>
          <button>
            How to play
          </button>
          <button onClick={() => { navigate("/game") }} >
            Play
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home