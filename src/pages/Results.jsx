import React from "react";
import Header from "../components/Header";
import preImage from "../images/pre.jpeg";
import goalImage from "../images/goal.jpeg";
import "../styles/results.scss";

const Results = () => {
  return (
    <>
      <Header> </Header>
      <div className="resultsModal">
        <div className="headerModal">
          <h2>So close!</h2>
          <h3>Score</h3>
        </div>
        <div className="imagesModal-container">
          <div>
            <img src={preImage} alt="preImage" />
          </div>
          <div>
            <img src={goalImage} alt="goalImage" />
          </div>
        </div>
        <div className="buttonsModal">
          <button className="shareResultsButton">share results</button>
          <button className="viewStatsButton">view stats</button>
        </div>
      </div>
    </>
  );
};

export default Results;
