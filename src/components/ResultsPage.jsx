import React from 'react';
import '../styles/resultspage.scss';

const ScoreCard = ({stage, score}) => {
    const stageClass = stage.replace(/\s+/g, '-').toLowerCase();
    return (
        <div className={`score-card ${stageClass}`}>
            <div className="overlay"></div>
            <div className="content">
                <div className="stage-name">{stage}</div>
                <div className="stage-score">{score}</div>
            </div>
        </div>
    )
}

const ScoreSummary = ({ scores, onPlayAgain }) => {
    return (
        <div className="score-summary">
            <div className="average-score">Average Score: []</div>
            <button onClick={onPlayAgain}>Play Again</button>
            <button>Share</button>
        </div>
    )
}

const ResultsPage = ({scores}) => {
    // Scores should be an object with keys as stage names and valuesas the score
    // For example: { Brightness: 96, Contrast: 98, Saturation: 99, Grayscale: 94, Sepia: }
    return (
        <div className="results-page">
            <ScoreCard key="brightness" stage="brightness" score={scores[0]}></ScoreCard>
            <ScoreCard key="contrast" stage="contrast" score={scores[1]}></ScoreCard>
            <ScoreCard key="saturation" stage="saturation" score={scores[2]}></ScoreCard>
            <ScoreCard key="grayscale" stage="grayscale" score={scores[3]}></ScoreCard>
            <ScoreCard key="sepia" stage="sepia" score={scores[4]}></ScoreCard>
            <ScoreCard key="hue rotate" stage="hue rotate" score={scores[5]}></ScoreCard>
            <ScoreCard key="blur" stage="blur" score={scores[6]}></ScoreCard>
            {/* <div className="scores-container">
                {Object.entries(scores).map(([stage, score]) => (
                    <ScoreCard key={stage} stage={stage} score={score} />
                ))}
            </div> */}
        </div>
        
    )
}

export default ResultsPage;