import React, { useState, useEffect } from 'react';
import "../styles/tutorialHeader.scss";
import HoverMessage from './HoverMessage';
// import { useLocation } from 'react-router-dom';

const TutorialHeader = (props) => {
  // const location = useLocation();

  // Function to extract the stage number from the path
  // const getCurrentStageNumber = () => {
  //   const match = location.pathname.match(/\/tutorial\/stage(\d+)/);
  //   return match ? parseInt(match[1], 10) : null;
  // };

  const currentStageNumber = props.stageNumber;
  const [messageVisability, setMessageVisability] = useState(false);
  // Function to determine button style based on the stage number
  const buttonStyle = (stageNumber) => {
    console.log(props.mostForwardStage)
    if (stageNumber === currentStageNumber) {
      // Current stage 
      return "tutorialNavButton currentStage";
    } else if (stageNumber <= props.mostForwardStage) {
      // Stages before the current stage 
      return "tutorialNavButton prevStage";
    } else {
      // Stages after the current stage 
      return "tutorialNavButton upcomingStage";
    }
  };

  const onTutorialNavButtonClick = (stageNumber) => {
    if (stageNumber <= props.mostForwardStage) {
      // Stages before the current stage 
      props.goToSpecificStage(stageNumber);
    } else {
      setMessageVisability(true);
    }
  }

  // hover message function 
  useEffect(() => {

    // wait for 2 seconds before hiding the message
    const timer = setTimeout(() => {
      setMessageVisability(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [messageVisability]);


  return (
    <div className='tutorialNavContainer'>
      <HoverMessage message={"Get a 95% or higher to move on!!"} messageVisability={messageVisability} />
      <nav className='tutorialHeaderNav'>
        {[0, 1, 2, 3, 4, 5, 6].map((stageNumber) => (
          <div
            key={stageNumber}
            className={buttonStyle(stageNumber)}
            onClick={() => onTutorialNavButtonClick(stageNumber)}
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
