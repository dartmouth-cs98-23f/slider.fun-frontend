import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/results.scss";
import Loader from './Loader';
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';
import makeConfetti from './Confetti';
import { useDispatch, useSelector } from 'react-redux';
import { addDailyPuzzleSScore } from '../actions/userAction';

function ResultsModal(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.user.info)
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (props.score >= 95) {
        makeConfetti();
        if (userInfo && props.daily) {
          dispatch(addDailyPuzzleSScore(userInfo.id, 5));
        } else {
          console.log("make an account")
          setNewUser(true);
        }
      }
    }, 1100);
  }, [props.score]);


  const nextStageHandler = () => {
    props.onClose();
   if (props.stageNumber === 6) {
      navigate("/resultspage")
    }
    props.goToNextStage();
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
              {props.score >= 95 ?
                <div>
                  <h2>Nice job! </h2>
                  {props.daily ?
                    <h3> +5 SliderPoints </h3>
                    : null}
                </div>
                : null}

              {(newUser && props.score >= 95 && !userInfo) ?
                <div>
                  <h3>
                    Make an account to save your score!
                  </h3>
                  <button onClick={() => navigate("/signup")}>
                    Sign Up!
                  </button>
                </div>
                :
                <div>
                  <p id="smallText">Total points: {userInfo.sliderScore} </p>
                </div>
              }
              <h3> {props.score} </h3>

            </div>}
        </div >
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
          {props.score >= 95 && props.tutorial ? <button onClick={nextStageHandler}> Next!</button> : null}
        </div>
      </div >
    </>
  )
}

export default ResultsModal;
