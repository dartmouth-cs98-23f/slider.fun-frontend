import React from 'react'
import "../styles/header.scss"
import domainLogo from "../assets/domain_logo.svg"
import { useNavigate } from 'react-router-dom';
import TodaysDate from './TodaysDate';
import { useLocation } from 'react-router-dom';


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
          <button className="tutorialButton" onClick={() => handleNavigate("/tutorial/stage1")}>Tutorial Mode</button>
          <button className="dailyButton" onClick={() => handleNavigate("/daily")}> Daily Puzzle </button>
          <button className="loginButton" onClick={() => handleNavigate("/login")}> login </button>
        </nav>
      </div>
    </div >
  )
}

export default Header