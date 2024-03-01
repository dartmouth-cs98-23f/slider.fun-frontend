import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas'
import '../styles/resultspage.scss';
import { useSelector } from 'react-redux'

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

const SimplifiedScoreCard = ({ stage, score }) => {
    const stageClass = stage.replace(/\s+/g, '-').toLowerCase();
    return (
        <div className="simplified-score-card-container">
            <div className={`simplified-score-card ${stageClass}`}>
                <div className="simplified-content">
                    <div className="simplified-stage-name">{stage}</div>
                    <div className="simplified-stage-score">{score}</div>
                </div>
            </div>
        </div>
    );
};

const ResultsModal = ({ averageScore, onRetry, onShare }) => {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);};

    // const handleShare = () => {
    //     // Select the results-page element that wraps all scorecards
    //     const content = document.querySelector('.results-page');
    //     if (content) {
    //         html2canvas(content, { 
    //             scale: 1, 
    //             useCORS: true,
    //             logging: true,
    //             windowWidth: content.scrollWidth,
    //             windowHeight: content.scrollHeight, 
    //         }).then((canvas) => {
    //             const image = canvas.toDataURL('image/png');
    //             const link = document.createElement('a');
    //             link.href = image;
    //             link.download = 'game-scores.png'; // Customizable file name
    //             document.body.appendChild(link);
    //             link.click();
    //             document.body.removeChild(link);
    //         }).catch(err => console.error("Error capturing image: ", err));
    //     }
    // };
    return (
        <div className="results-modal">
        <div className="modal-content">
            <h2>Average Score</h2>
            <p>{averageScore.toFixed(0)}</p>
            <button onClick={() => handleNavigate("/tutorial")}>Retry</button>
            <button onClick={onShare}>Share</button>
        </div>
    </div>
    )
};

const ResultsPage = () => {
    const scores = useSelector(state => state.tutorial.scores);
    const [showModal, setShowModal] = useState(false);
    const [averageScore, setAverageScore] = useState(0);
    const [isSharing, setIsSharing] = useState(false); // State to control sharing mode

    useEffect(() => {
        // Calculate the average score
        const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);
        const calculatedAverageScore = totalScore / Object.keys(scores).length;
        setAverageScore(calculatedAverageScore);

        // Show the modal after a delay
        setTimeout(() => setShowModal(true), 3000);
    }, [scores]);

    useEffect(() => {
        // Control scrolling based on the modal visibility
        document.body.style.overflow = showModal ? 'hidden' : 'auto';
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    // Function to handle the sharing logic
    const handleShare = () => {
        setIsSharing(true); // Indicate sharing mode is active

        // Use a timeout to ensure the UI has time to update if necessary
        setTimeout(() => {
            const content = document.querySelector('.hidden-container'); // Adjust selector as needed
            html2canvas(content, { 
                useCORS: true,
                scale: 1,
                width: 1080,
                height: 1920,
            
            }).then(canvas => {
                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = image;
                link.download = 'game-scores.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setIsSharing(false); // Reset sharing mode
            });
        }, 100); // Adjust delay as needed
    };

    return (
        <>
            <div className="results-page">
                {Object.entries(scores).map(([stage, score], index) => (
                    <ScoreCard key={index} stage={stage} score={score} />
                ))}
            </div>
            <div className="hidden-container" aria-hidden="true">
                <div className="simplified-score-card-container">
                    {Object.entries(scores).map(([stage, score], index) => (
                        <div className={`simplified-score-card ${stage.replace(/\s+/g, '-').toLowerCase()}`} key={index}>
                            <div className="simplified-content">
                                <div className="simplified-stage-name">{stage}</div>
                                <div className="simplified-stage-score">{score}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && <ResultsModal averageScore={averageScore} onRetry={() => setShowModal(false)} onShare={handleShare} />}
        </>
    );
};


export default ResultsPage;
