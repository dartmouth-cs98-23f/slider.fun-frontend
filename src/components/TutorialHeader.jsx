import React from 'react';
import "../styles/tutorialHeader.scss";
import { useLocation } from 'react-router-dom';

const TutorialHeader = () => {
  const location = useLocation();

  // Function to extract the stage number from the path
  const getCurrentStageNumber = () => {
    const match = location.pathname.match(/\/tutorial\/stage(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  };

  const currentStageNumber = getCurrentStageNumber();

  // Function to determine button style based on the stage number
  const buttonStyle = (stageNumber) => {
    if (stageNumber === currentStageNumber) {
      // Current stage - pink color with white text
      return { backgroundColor: '#f86969', color: 'white' };
    } else if (stageNumber < currentStageNumber) {
      // Stages before the current stage - yellow background
      return { backgroundColor: 'white', color: '#333' };
    } else {
      // Stages after the current stage - grey background
      return { backgroundColor: 'grey', color: '#333' };
    }
  };

  return (
    <nav className='tutorialHeaderNav'>
      {[1, 2, 3, 4, 5, 6, 7].map((stageNumber) => (
        <button
          key={stageNumber}
          className='tutorialNavButton'
          style={buttonStyle(stageNumber)}
        >
          {stageNumber === 1 ? 'Brightness' :
           stageNumber === 2 ? 'Contrast' :
           stageNumber === 3 ? 'Saturation' :
           stageNumber === 4 ? 'Greyscale' :
           stageNumber === 5 ? 'Sepia' :
           stageNumber === 6 ? 'Hue Rotate' :
           'Blur'}
        </button>
      ))}
    </nav>
  );
};

export default TutorialHeader;
