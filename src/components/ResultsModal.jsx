import React, { useState } from 'react';
import preImage from "../assets/pre.jpeg";
import goalImage from "../assets/goal.jpeg";
import "../styles/results.scss";
import Loader from './Loader';

function ResultsModal(props) {
  const [loading, setLoading] = useState(false);


  useState(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [loading]);


  return (
    <>
      <div className="resultsModal">
        <div className="headerModal">
          {props.score > 90 && props.score < 95? <h2>So close!</h2> : null}
          {loading ? <Loader /> : <h3> {props.score} </h3>}
          {/* <h3>{score}</h3> */}
        </div>
        <div className="imagesModal-container">
          <div>
            <img alt="im1" src={preImage} />
          </div>
          <div>
            <img alt="img2" src={goalImage} />
          </div>
        </div>
        <div className="buttonsModal">
          {/* <button className="shareResultsButton">share results</button>
                <button className="viewStatsButton">view stats</button> */}
          <button onClick={props.onClose}>Close</button>
        </div>
      </div>
    </>
  )
}

export default ResultsModal;
