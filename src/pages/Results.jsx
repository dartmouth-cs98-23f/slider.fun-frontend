import React from 'react';
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";
import stockPhoto from "../images/stockphoto.png"
import preImage from "../assets/pre.jpeg";
import goalImage from "../assets/goal.jpeg";
import "../styles/results.scss";

const Results = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header> </Header>
            <div className="resultsModal">
                <div className="headerModal">
                    <h2>So close!</h2>
                    <h3>Score []</h3>
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
                    <button className="shareResultsButton">share results</button>
                    <button className="viewStatsButton">view stats</button>
                </div>
                <div className="backButton">
                    <button onClick={() => {navigate("/game")}}>back</button>
                </div>
            </div>
        </>
    )
}

export default Results;