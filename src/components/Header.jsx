import React from 'react'
import "../styles/header.scss"
import domainLogo from "../assets/domain_logo.svg"
import inLineLogo from "../assets/InLineLogoRed.png"
import { useNavigate } from 'react-router-dom';
import TodaysDate from './TodaysDate';
import { useLocation } from 'react-router-dom';
import TutorialHeader from './TutorialHeader';


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (

    <div className='headerContainer'>
      <div className='contentContainer'>
        <div className="logoDateContainer">
          <img onClick={() => handleNavigate("/")} src={domainLogo} alt="" width="150"></img>
          {location.pathname.startsWith('/daily') && <TodaysDate />}

        </div>
        <nav className='headerNav'>
          {/* {location.pathname.startsWith('/tutorial') && <TutorialHeader />} */}
          <button className="tutorialButton" onClick={() => handleNavigate("/tutorial/stage1")}>Tutorial Mode</button>
          {/* <button onClick={() => handleNavigate("/stage2")}>Contrast</button>
        <button onClick={() => handleNavigate("/stage3")}>Saturation</button>
        <button onClick={() => handleNavigate("/stage4")}>Greyscale</button>
        <button onClick={() => handleNavigate("/stage5")}>Sepia</button>
        <button onClick={() => handleNavigate("/stage6")}>Hue Rotate</button> */}
          <button className="dailyButton" onClick={() => handleNavigate("/daily")}> Daily Puzzle </button>
        </nav>
      </div>
    </div >
  )
}

export default Header