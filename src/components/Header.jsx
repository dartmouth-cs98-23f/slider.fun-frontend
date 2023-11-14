import React from 'react'
import "../styles/header.scss"
import domainLogo from "../assets/domain_logo.svg"
import inLineLogo from "../assets/InLineLogoRed.png"
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (

    <div className='headerContainer'>
      <div className='contentContainer'>
        <img onClick={() => handleNavigate("/")} src={domainLogo} alt="" width="150"></img>
        <nav className='headerNav'>
          <button onClick={() => handleNavigate("/tutorial/stage1")}>Tutorial Mode</button>
          {/* <button onClick={() => handleNavigate("/stage2")}>Contrast</button>
        <button onClick={() => handleNavigate("/stage3")}>Saturation</button>
        <button onClick={() => handleNavigate("/stage4")}>Greyscale</button>
        <button onClick={() => handleNavigate("/stage5")}>Sepia</button>
        <button onClick={() => handleNavigate("/stage6")}>Hue Rotate</button> */}
          <button onClick={() => handleNavigate("/daily")}> Daily Puzzle </button>
        </nav>
      </div>
    </div >
  )
}

export default Header