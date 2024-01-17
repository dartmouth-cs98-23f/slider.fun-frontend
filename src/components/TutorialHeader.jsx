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
  // const buttonStyle = (stageNumber) => {
  //   if (stageNumber === currentStageNumber) {
  //     // Current stage 
  //     return { backgroundColor: '#333', color: 'white', borderTop: "4px solid #f86969", height: "40px" };
  //   } else if (stageNumber < currentStageNumber) {
  //     // Stages before the current stage 
  //     return { backgroundColor: '#333', color: 'white', borderTop: "4px solid #69F869" };
  //   } else {
  //     // Stages after the current stage 
  //     return { backgroundColor: '#333', color: 'white', borderTop: "4px solid grey" };
  //   }
  // };

  const buttonStyle = (stageNumber) => {
    if (stageNumber === currentStageNumber) {
      // Current stage 
      return "tutorialNavButton currentStage";
    } else if (stageNumber < currentStageNumber) {
      // Stages before the current stage 
      return "tutorialNavButton prevStage";
    } else {
      // Stages after the current stage 
      return "tutorialNavButton upcomingStage";
    }
  };

  return (
    <div className='tutorialNavContainer'>
      <nav className='tutorialHeaderNav'>
        {[1, 2, 3, 4, 5, 6, 7].map((stageNumber) => (
          <button
            key={stageNumber}
            className={buttonStyle(stageNumber)}
          >
            {stageNumber === 1 ? 'BRIGHTNESS' :
              stageNumber === 2 ? 'CONTRAST' :
                stageNumber === 3 ? 'SATURATION' :
                  stageNumber === 4 ? 'GREYSCALE' :
                    stageNumber === 5 ? 'SEPIA' :
                      stageNumber === 6 ? 'HUE ROTATE' :
                        'BLUR'}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TutorialHeader;
