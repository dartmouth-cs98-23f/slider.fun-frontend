import React from 'react'
import "../styles/header.scss"
import sliderHeader from "../assets/header_red.png"
import inLineLogo from "../assets/InLineLogoRed.png"
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (

    <div className='headerContainer'>
      <div onClick={() => handleNavigate("/")} style={{ cursor: "pointer" }}>
        <img src={inLineLogo} alt="Logo" width="300"></img>
      </div>
      <nav className='headerNav'>
        <button className='stageButtonHeader' onClick={() => handleNavigate("/stage1")}>Brightness</button>
        <button className='stageButtonHeader' onClick={() => handleNavigate("/stage2")}>Contrast</button>
        <button className='stageButtonHeader' onClick={() => handleNavigate("/stage3")}>Saturation</button>
        <button className='stageButtonHeader' onClick={() => handleNavigate("/stage4")}>Greyscale</button>
        <button className='stageButtonHeader' onClick={() => handleNavigate("/stage5")}>Sepia</button>
        <button className='stageButtonHeader' onClick={() => handleNavigate("/stage6")}>Hue Rotate</button>
        <button className='stageButtonHeader' onClick={() => handleNavigate("/stage7")}>Blur</button>
      </nav>
    </div>
  )
}

export default Header