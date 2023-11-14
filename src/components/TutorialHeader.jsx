import React from 'react'
import "../styles/header.scss"
import { useNavigate } from 'react-router-dom';


const TutorialHeader = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (

    <div >
      <nav className='tutorialHeaderNav'>
        <button className='tutorialNavButton' onClick={() => handleNavigate("/tutorial/stage1")}>Brightness</button>
        <button className='tutorialNavButton' onClick={() => handleNavigate("/tutorial/stage2")}>Contrast</button>
        <button className='tutorialNavButton' onClick={() => handleNavigate("/tutorial/stage3")}>Saturation</button>
        <button className='tutorialNavButton' onClick={() => handleNavigate("/tutorial/stage4")}>Greyscale</button>
        <button className='tutorialNavButton' onClick={() => handleNavigate("/tutorial/stage5")}>Sepia</button>
        <button className='tutorialNavButton' onClick={() => handleNavigate("/tutorial/stage6")}>Hue Rotate</button>
        <button className='tutorialNavButton' onClick={() => handleNavigate("/tutorial/stage7")}>Blur</button>
      </nav>
    </div>
  )
}

export default TutorialHeader