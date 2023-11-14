import React, { useRef } from 'react';
import "../styles/home.scss";
// import Header from '../components/Header'
import sliderLogo from "../assets/main_logo_red.png"
// import domainLogo from "../assets/domain_logo.png"
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
        <video autoplay="autoplay" loop="loop" muted="muted" id="video" playsinline>
          <source src="https://firebasestorage.googleapis.com/v0/b/sliderdotfun-3af7a.appspot.com/o/videos%2Fseq.mov?alt=media&token=fe8d69fb-7bf0-405f-bacb-ae38a5059d37" type="video/mp4"></source>
        </video>
        <img src={sliderLogo} alt=""></img>

        <div className='buttonContainer'>
          <button onClick={scrollToTutorial}>Tutorial</button>
          <button onClick={() => { navigate("/tutorial/stage1") }}>
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
          Slider is a slider-only photo editing game. There are different levels of difficulty, but at every level, you alter the sliders to edit the unedited photo, aiming to match the (edited) target photo.
        </p>
        <h2 className="tutorialHeader2">
          How do I play?
        </h2>
        <p className="tutorialParagraph">
          Click the Play button. On the left is the unedited photo, while the right is the target photo. Use the different sliders to try to match the unedited photo to the target photo. You can change the view style with the buttons below the photos. When you're done, press submit!
        </p>
        <h2 className="tutorialHeader2">
          Why use Slider?
        </h2>
        <p className="tutorialParagraph">
          Slider is for photographers and photo editors of all skill levels. Each set of photos is a puzzle, and as you complete more puzzles, your photo-editing skills will improve.
        </p>
        <h2 className="tutorialHeader2">
          Why not use Slider?
        </h2>
        <p className="tutorialParagraph">
          Slider is not Lightroom or Photoshop. Those photo editing apps have many more features, and they allow you to make spot edits. Slider will not teach you those skills. Instead, the goal is to teach and practice the very basics: the sliders.
        </p>
        <h2 className="tutorialHeader2">
          Who created Slider?
        </h2>
        <p className="tutorialParagraph">
          Slider was created as part of the culminating experience in Computer Science at Dartmouth College in Fall 2023. The principle authors are Zhoucai Ni, Kashan Mahmood, Ethan Gearey, Russell Chai, and CrypticMatter.
        </p>
      </div>
    </div>
  );
};

export default Home;