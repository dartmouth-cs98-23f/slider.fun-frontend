import React, { useState } from 'react';
// import preImage from "../assets/pre.jpeg";
// import goalImage from "../assets/goal.jpeg";
import "../styles/results.scss";
import Loader from './Loader';
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';
import CustomHandle from './CustomHandle';

function ResultsModal(props) {
  const [loading, setLoading] = useState(false);
  console.log(props)

  useState(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, [loading]);


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
          {/* <div>
            <img alt="im1" src={props.img} style={props.currentStyle} />
          </div>
          <div>
            <img alt="img2" src={goalImage} />
          </div> */}
        </div>
        <div className="buttonsModal">
          <button onClick={props.onClose}>Close</button>
        </div>
      </div>
    </>
  )
}

export default ResultsModal;
