import React from 'react';
import "../styles/infoModal.scss";
import dailyPuzzleTutorial from "../assets/dailyPuzzleTutorial.gif";
import { IconX } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";

function InfoModal(props) {
  const navigate = useNavigate();
  if (props.daily === true) {
    return (
      <>
        {
          props.isModalVisible &&
          <div className="resultsModal">
            <div className="headerModal">
              <div className="section1">
                <h1> How to Play</h1>
                <IconX className='exitButton' onClick={props.closeModal}>Close</IconX>
              </div>
              <div className='puzzleTextBlock'>
                <p> Match the photos using the 7 sliders!! </p>
              </div>
              <div className='puzzleTextBlock'>
                <img src={dailyPuzzleTutorial} alt="test test" />
              </div>
              <div className="buttonsModal">
                <p> Try out our tutorial mode!!!! -{'>'} </p>
                <button onClick={() => navigate("/tutorial")} >Tutorial Mode</button>
              </div>
            </div>
          </div >
        }
      </>
    )
  }

  return (
    <>
      {props.isModalVisible &&
        <div className="resultsModal">
          <div className="headerModal">
            <h1> {props.heading}</h1>
            <div className='infoTextBlock'>
              <h3> Why:</h3>
              <p> {props.text}</p>
            </div>
            <div className='infoTextBlock'>
              <h3> When:</h3>
              <p> {props.extraText}</p>
            </div>
            <div className="buttonsModal">
              <button onClick={props.closeModal}>Close</button>
            </div>
          </div>
        </div >
      }
    </>
  )
}

export default InfoModal;
