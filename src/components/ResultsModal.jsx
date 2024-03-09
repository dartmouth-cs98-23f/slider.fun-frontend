import React, { useEffect, useState } from 'react';
import "../styles/results.scss";
import Loader from './Loader';
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';
import makeConfetti from './Confetti';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, handleDailyCompleted } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';
import TimeUntilMidnight from './TimeUntilMidnight';

function ResultsModal(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(state => state.user.info)
  // const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (props.score >= 95) {
        makeConfetti();
        if (localStorage.getItem("token") && props.daily && !userInfo.dailyTaskStatus) {
          dispatch(handleDailyCompleted(userInfo.id, props.dailyPuzzleId, props.score, props.userSelectedProperties));
        }
      }

      setLoading(false);
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

      {/* tutorial  */}
      {props.tutorial ?
        <div className="resultsModal">
          <div className="headerModal">
            {loading ? <Loader /> :
              <div>
                <h2> {props.score}% </h2>
                {props.score < 70 ? <h2>Maybe try a new slider? </h2> : null}
                {props.score >= 70 && props.score < 90 ? <h2>Keep trying!</h2> : null}
                {props.score >= 90 && props.score < 95 ? <h2>So close!</h2> : null}
                {/* If score is 95 */}
                {props.score >= 95 ?
                  <div>
                    <h3>Nice job! </h3>
                  </div> : null}

                {/* if user signed in */}
                {localStorage.getItem("token") ? (
                  (props.score >= 95 && props.stageNumber === 6) ? (
                    // if in last stage of tutorial:
                    <div>
                      <h3>
                        It's always good to refresh up on the basics.
                      </h3>
                    </div>
                  ) :
                    // if not in last stage, do nothing
                    null
                ) :
                  // if not signed in 
                  (
                    // if in last stage, prompt user to sign up
                    (props.score >= 95 && props.stageNumber === 6) && (
                      <div>
                        <h3>
                          Make an account to save your score!
                        </h3>
                        <button onClick={() => handlePostTutorialSignUp(5)}>
                          Sign Up!
                        </button>
                      </div>
                    )
                  )}
              </div>
            }
          </div >
          <div className="imagesModal-container">
            <div className="reactCompareSliderContainer">
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
            {props.score >= 95 && props.tutorial && props.stageNumber !== 6 ? <button onClick={nextStageHandler}> Next!</button> : null}


          </div>
        </div >
        :
        // daily/ not tutorial
        <div className="resultsModal">
          <div className="headerModal">
            {loading ? <Loader /> :
              <div>
                <h2> {props.score}% </h2>
                {props.score < 70 ? <h2>Maybe try a new slider? </h2> : null}
                {props.score >= 70 && props.score < 90 ? <h2>Keep trying!</h2> : null}
                {props.score >= 90 && props.score < 95 ? <h2>So close!</h2> : null}
                {/* If score is 95 */}
                {props.score >= 95 ?
                  <div>
                    <h3>  Nice job! </h3>
                    {/* If user is signed in */}

                    {localStorage.getItem("token") ?
                      <div>
                        {userInfo.dailyTaskStatus ?
                          // if user completed daily already
                          <div>
                            {/* <p> you've already done the daily puzzle today!</p> */}
                            <TimeUntilMidnight />
                            <p id="smallText"> Total points: {userInfo.sliderScore} </p>
                          </div>
                          :
                          // if user has not completed daily
                          <h3> +5 SliderPoints </h3>
                        }
                      </div>
                      :
                      // if user not signed in
                      <div>
                        <h3>
                          Make an account to save your score!
                        </h3>
                        <button onClick={() => handlePostTutorialSignUp(5)}>
                          Sign Up!
                        </button>
                      </div>
                    }
                  </div> :
                  // if score less then 95
                  null
                }
              </div>
            }
          </div >
          <div className="imagesModal-container">
            <div className="reactCompareSliderContainer">
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
          </div>
        </div >

      }
    </>
  )
}

export default ResultsModal;
