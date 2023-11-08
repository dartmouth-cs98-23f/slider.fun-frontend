import React from 'react'
import "../styles/header.scss"
import sliderHeader from "../assets/header_red.png"
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (

    <div className='headerContainer'>
      <img src={sliderHeader} alt="" width="800"></img>

      <nav className='headerNav'>
        <button onClick={() => handleNavigate("/stage1")}>Level 1</button>
        <button onClick={() => handleNavigate("/stage2")}>Level 2</button>
        <button onClick={() => handleNavigate("/stage3")}>Level 3</button>
        <button onClick={() => handleNavigate("/stage4")}>Level 4</button>
        <button onClick={() => handleNavigate("/stage5")}>Level 5</button>
      </nav>
    </div>
  )
}

export default Header