import React, { useRef } from 'react';
import "../styles/home.scss";
// import Header from '../components/Header'
import sliderLogo from "../assets/main_logo_red.png"
// import homeSliderPic from "../assets/group8.svg"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const tutorialRef = useRef(null);
  const navigate = useNavigate();

  const scrollToTutorial = () => {
    tutorialRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='homeContainer'>
      <div className="mainMenu">
        <img src={sliderLogo} alt=""></img>

        <div className='buttonContainer'>
          <button onClick={scrollToTutorial}>Tutorial</button>
          <button onClick={() => { navigate("/stage1") }}>
            Play
          </button>
        </div>
      </div>

      <div className="tutorialText" ref={tutorialRef}>
        <h1 className="tutorialHeader">
          An online game to practice your photo-editing skills
        </h1>
        <h2 className="tutorialHeader2">
          What is Slider?
        </h2>
        <p className="tutorialParagraph">
          Slider.fun is a slider-only photo editing game. There are different levels of difficulty, but at every level, you alter the sliders to edit the unedited photo, aiming to match the (edited) target photo. 
        </p>
        <h2 className="tutorialHeader2">
          What is Slider?
        </h2>
        <p className="tutorialParagraph">
          Slider.fun is a slider-only photo editing game. There are different levels of difficulty, but at every level, you alter the sliders to edit the unedited photo, aiming to match the (edited) target photo. 
        </p>
        <h2 className="tutorialHeader2">
          What is Slider?
        </h2>
        <p className="tutorialParagraph">
          Slider.fun is a slider-only photo editing game. There are different levels of difficulty, but at every level, you alter the sliders to edit the unedited photo, aiming to match the (edited) target photo. 
        </p>
        <h2 className="tutorialHeader2">
          What is Slider?
        </h2>
        <p className="tutorialParagraph">
          Slider.fun is a slider-only photo editing game. There are different levels of difficulty, but at every level, you alter the sliders to edit the unedited photo, aiming to match the (edited) target photo. 
        </p>
      </div>
    </div>
  );
};

export default Home;