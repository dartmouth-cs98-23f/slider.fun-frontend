import React from 'react'
import "../styles/header.scss"
import sliderHeader from "../assets/header_red.png"
import mainLogo from "../assets/main_logo_red.png"
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (

    <div className='headerContainer'>
      <div className='headerLogo'>
        <img src={mainLogo} alt="" width="100"></img>
      </div>
      <nav className='headerNav'>
        <button onClick={() => handleNavigate("/stage1")}>Brightness</button>
        <button onClick={() => handleNavigate("/stage2")}>Contrast</button>
        <button onClick={() => handleNavigate("/stage3")}>Saturation</button>
        <button onClick={() => handleNavigate("/stage4")}>Greyscale</button>
        <button onClick={() => handleNavigate("/stage5")}>Sepia</button>
        <button onClick={() => handleNavigate("/stage6")}>Hue Rotate</button>
        <button onClick={() => handleNavigate("/stage7")}>Blur</button>
      </nav>
    </div>
  )
}

export default Header