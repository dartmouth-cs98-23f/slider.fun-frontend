import React, { useEffect, useState } from 'react';
import "../styles/results.scss";
import Loader from './Loader';
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';
import makeConfetti from './Confetti';


function ResultsModal(props) {
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState('');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (props.score >= 95) {
        makeConfetti();
      }
    }, 1100);
  }, [props.score]);


  const nextStageHandler = () => {
    props.onClose();
    props.goToNextStage();
  }

  const hintHandler = () => {
    const newHint = props.calculateHint(props.editedOptions, props.currentOptions);
    setHint(newHint);
  }

  return (
    <>
      <div className="resultsModal">
        <div className="headerModal">
          {loading ? <Loader /> :
            <div>
              {props.score < 70 ? <h2>Maybe try a new slider? </h2> : null}
              {props.score >= 70 && props.score < 90 ? <h2>Keep trying!</h2> : null}
              {props.score >= 90 && props.score < 95 ? <h2>So close!</h2> : null}
              {props.score >= 95 ? <h2>Nice job!</h2> : null}
              <h3> {props.score} </h3>

            </div>}
        </div>
        <div className="imagesModal-container">
          <div>
            <ReactCompareSlider

              handle={
                <ReactCompareSliderHandle
                  buttonStyle={{
                    backdropFilter: undefined,
                    WebkitBackdropFilter: undefined,
                    border: 0,
                    boxShadow: 'none',
                    marginLeft: "-15px"
                  }}
                  linesStyle={{
                    opacity: 0.0,
                  }}
                />
              }

              itemOne={<ReactCompareSliderImage src={props.img} alt="pre edit pics" style={props.currentStyle} />}
              itemTwo={<ReactCompareSliderImage src={props.img} alt="edited pics" style={props.targetStyle} />}
            />
          </div>

        </div>
        <div className="buttonsModal">
          <button onClick={props.onClose}>Close</button>
          {props.hint && <p className="modal-hint">{props.hint}</p>} {/* Display hint here */}
          {props.score >= 95 && props.tutorial ? <button onClick={nextStageHandler}> Next!</button> : null}
          {props.score < 95 && props.tutorial ? <button onClick={hintHandler}>Hint</button> : null} 
          {hint && <p className="modal-hint">{hint}</p>}
        </div>
      </div>
    </>
  )
}

export default ResultsModal;
