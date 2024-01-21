import React, { useEffect } from 'react';
import "../styles/tutorialHeader.scss";
// import { useLocation } from 'react-router-dom';

const TutorialHeader = (props) => {
  // const location = useLocation();

  // Function to extract the stage number from the path
  // const getCurrentStageNumber = () => {
  //   const match = location.pathname.match(/\/tutorial\/stage(\d+)/);
  //   return match ? parseInt(match[1], 10) : null;
  // };

  const currentStageNumber = props.stageNumber;

  // Function to determine button style based on the stage number

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
        {[0, 1, 2, 3, 4, 5, 6].map((stageNumber) => (
          <div
            key={stageNumber}
            className={buttonStyle(stageNumber)}
          >
            <div>
              {stageNumber === 0 ? 'BRIGHTNESS ' :
                stageNumber === 1 ? 'CONTRAST ' :
                  stageNumber === 2 ? 'SATURATION ' :
                    stageNumber === 3 ? 'GREYSCALE ' :
                      stageNumber === 4 ? 'SEPIA ' :
                        stageNumber === 5 ? 'HUE ROTATE ' :
                          'BLUR '}
            </div>
            <div
              style={{ fontWeight: 'bold' }}
            >

              {props.scores[stageNumber] !== 0 ? props.scores[stageNumber] : null}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default TutorialHeader;
