import React from 'react';
import preImage from "../assets/pre.jpeg";
import goalImage from "../assets/goal.jpeg";
import "../styles/results.scss";

function ResultsModal({ score, onClose }) {
    return (
        <>
        <div className="resultsModal">
            <div className="headerModal">
                <h2>So close!</h2>
                <h3>{score}</h3>
            </div>
            <div className="imagesModal-container">
                <div>
                    <img src={preImage} />
                </div>
                <div>
                    <img src={goalImage} />
                </div>
            </div>
            <div className="buttonsModal">
                {/* <button className="shareResultsButton">share results</button>
                <button className="viewStatsButton">view stats</button> */}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    </>
    )
}

export default ResultsModal;
