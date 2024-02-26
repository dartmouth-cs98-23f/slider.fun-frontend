import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/resultspage.scss';

const ScoreCard = ({ stage, score }) => {
    const stageClass = stage.replace(/\s+/g, '-').toLowerCase();
    return (
        <div className={`score-card ${stageClass}`}>
            <div className="overlay"></div>
            <div className="content">
                <div className="stage-name">{stage}</div>
                <div className="stage-score">{score}</div>
            </div>
        </div>
    );
};

const ResultsModal = ({ averageScore, onRetry }) => {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
      };
    return (
        <div className="results-modal">
        <div className="modal-content">
            <h2>Your Average Score</h2>
            <p>{averageScore.toFixed(2)}</p>
            <button onClick={() => handleNavigate("/tutorial")}>Retry</button>
            <button onClick={() => console.log('Share feature to be implemented')}>Share</button>
        </div>
    </div>
    )
};

const ResultsPage = ({ scores }) => {
    const [showModal, setShowModal] = useState(false);
    const [averageScore, setAverageScore] = useState(0);


    useEffect(() => {
        // Calculate the average score
        const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);
        const calculatedAverageScore = totalScore / Object.keys(scores).length;
        setAverageScore(calculatedAverageScore);

        // Simulate a delay to show the modal after scores are displayed
        setTimeout(() => setShowModal(true), 3000); // Adjust time as needed
    }, [scores]);

    useEffect(() => {
        if (showModal) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        // Cleanup function to ensure scrolling is re-enabled if the component unmounts
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [showModal]);

    return (
        <div className="results-page">
            {Object.entries(scores).map(([stage, score], index) => (
                <ScoreCard key={index} stage={stage} score={score} />
            ))}
            {showModal && <ResultsModal averageScore={averageScore} onRetry={() => setShowModal(false)} />}
        </div>
    );
};

export default ResultsPage;
