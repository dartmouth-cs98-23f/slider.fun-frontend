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
        <div className="logoContainer">
          <img onClick={() => handleNavigate("/")} src={domainLogo} alt="Domain Logo" width="150"></img>
        </div>
        <div className="dateContainer">
          {location.pathname.startsWith('/daily') && <TodaysDate />}
        </div>
        <nav className='navContainer'>
          <button className="navButton" onClick={() => handleNavigate("/tutorial/stage1")}>Tutorial Mode</button>
          <button className="navButton" onClick={() => handleNavigate("/daily")}>Daily Puzzle</button>
        </nav>
      </div>
    </div>
  )
}

export default Header

