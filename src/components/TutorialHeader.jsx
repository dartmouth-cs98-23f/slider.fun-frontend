import React from 'react'
import "../styles/header.scss"
import { useNavigate, useLocation } from 'react-router-dom';

const TutorialHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  return (


    // <div >
    //   <nav className='tutorialHeaderNav'>
    //     <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage1") ? { backgroundColor: '#f86969' } : null} onClick={() => handleNavigate("/tutorial/stage1")}>Brightness</button>
    //     <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage2") ? { backgroundColor: '#f86969' } : null} onClick={() => handleNavigate("/tutorial/stage2")}>Contrast</button>
    //     <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage3") ? { backgroundColor: '#f86969' } : null} onClick={() => handleNavigate("/tutorial/stage3")}>Saturation</button>
    //     <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage4") ? { backgroundColor: '#f86969' } : null} onClick={() => handleNavigate("/tutorial/stage4")}>Greyscale</button>
    //     <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage5") ? { backgroundColor: '#f86969' } : null} onClick={() => handleNavigate("/tutorial/stage5")}>Sepia</button>
    //     <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage6") ? { backgroundColor: '#f86969' } : null} onClick={() => handleNavigate("/tutorial/stage6")}>Hue Rotate</button>
    //     <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage7") ? { backgroundColor: '#f86969' } : null} onClick={() => handleNavigate("/tutorial/stage7")}>Blur</button>
    //   </nav>
    // </div>

    <div >
      <nav className='tutorialHeaderNav'>
        <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage1") ? { backgroundColor: '#f86969' } : null} >Brightness</button>
        <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage2") ? { backgroundColor: '#f86969' } : null} >Contrast</button>
        <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage3") ? { backgroundColor: '#f86969' } : null} >Saturation</button>
        <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage4") ? { backgroundColor: '#f86969' } : null} >Greyscale</button>
        <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage5") ? { backgroundColor: '#f86969' } : null} >Sepia</button>
        <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage6") ? { backgroundColor: '#f86969' } : null} >Hue Rotate</button>
        <button className='tutorialNavButton' style={isCurrentPath("/tutorial/stage7") ? { backgroundColor: '#f86969' } : null} >Blur</button>
      </nav>
    </div>
  )
}

export default TutorialHeader