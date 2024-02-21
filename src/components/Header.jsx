import React from 'react'
import "../styles/header.scss"
import domainLogo from "../assets/domain_logo.svg"
import { useNavigate } from 'react-router-dom';
import TodaysDate from './TodaysDate';
import { useLocation } from 'react-router-dom';
import ProfileIcon from './ProfileIcon';


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
          <button className="communityButton blackButton" onClick={() => handleNavigate("/community")}>Community</button>
          <button className="tutorialButton whiteButton" onClick={() => handleNavigate("/tutorial")}>Tutorial</button>
          <button className="dailyButton blackButton" onClick={() => handleNavigate("/daily")}> Daily Puzzle </button>
          {localStorage.getItem('token') === null ? <button className="loginButton whiteButton" onClick={() => handleNavigate("/login")}> login </button> : <ProfileIcon />}
        </nav>
      </div>
    </div >
  )
}

export default Header