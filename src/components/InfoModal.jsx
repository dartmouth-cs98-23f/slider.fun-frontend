import React from 'react';
import "../styles/infoModal.scss";
import domainLogo from "../assets/domain_logo.svg"
import dailyPuzzleTutorial from "../assets/dailyPuzzleTutorial.gif";
import { useNavigate } from "react-router-dom";
import SignUpForm from './SignUpForm';

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
              </div>
              <div className='puzzleTextBlock'>
                <p> Match the photos using the 7 sliders</p>

              </div>
              <div className='puzzleTextBlock'>
                <img src={dailyPuzzleTutorial} alt="test test" />
              </div>
              <div className="buttonsModal">
                <button className="tutorialButton" onClick={() => navigate("/tutorial")} >Tutorial</button>

                <button onClick={props.closeModal}>Close</button>
              </div>
            </div>
          </div >
        }
      </>
    )
  } else if (props.signUp) {
    return (
      <>
        {
          props.isModalVisible &&
          <>
            <div className="modal-overlay" onClick={() => props.closeSignUpModal()}></div>

            <div className='signUpModal'>
              <SignUpForm logoVisible={false} />
            </div>
          </>
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
