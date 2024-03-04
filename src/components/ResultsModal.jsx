import React, { useEffect, useState } from 'react';
import "../styles/results.scss";
import Loader from './Loader';
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';
import makeConfetti from './Confetti';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, handleDailyCompleted } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';

function ResultsModal(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(state => state.user.info)
  // const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (props.score >= 95) {
        makeConfetti();
        if (localStorage.getItem("token") && props.daily && !userInfo.dailyTaskStatus) {
          dispatch(handleDailyCompleted(userInfo.id, props.dailyPuzzleId, props.score, props.userSelectedProperties));
        }
      }
    }, 1100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.score]);


  const nextStageHandler = () => {
    props.onClose();
    props.goToNextStage();
  }

  const handlePostTutorialSignUp = (points) => {
    dispatch(setUserInfo({ "sliderScore": points }));
    navigate("/signup");
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
              {/* If score is 95 */}
              {props.score >= 95 ?
                <div>
                  <h2>Nice job! </h2>
                  {/* If user */}
                  {!userInfo.dailyTaskStatus ?
                    <h3> +5 SliderPoints </h3>
                    :
                    <p> but you've already done the daily puzzle today!</p>
                  }
                </div>
                : null}

              {((!localStorage.getItem("token") && props.score >= 95 && !props.tutorial)) ?
                <div>
                  <h3>
                    Make an account to save your score!
                  </h3>
                  <button onClick={() => handlePostTutorialSignUp(5)}>
                    Sign Up!
                  </button>
                </div>
                :
                <div>
                  <p id="smallText"> Total points: {userInfo.sliderScore} </p>
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
