import React from 'react';
import "../styles/infoModal.scss";

function InfoModal(props) {

  if (props.daily === true) {
    return (
      <>
        {
          props.isModalVisible &&
          <div className="resultsModal">
            <div className="headerModal">
              <h1> How to Play</h1>
              <div className='infoTextBlock'>
               
                <p> Match the photos using the sliders! </p>
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
