import React from 'react';
import '../styles/resultspage.scss';

const ScoreCard = ({stage, score}) => {
    return (
        <div className="score-card">
            <div className="stage-name">{stage}</div>
            <div className="stage-score">{score}</div>
        </div>
    )
}

const ResultsPage = ({scores}) => {
    // Scores should be an object with keys as stage names and valuesas the score
    // For example: { Brightness: 96, Contrast: 98, Saturation: 99, Grayscale: 94, Sepia: }
    return (
        <div className="results-page">
            <h1>Your Scores</h1>
            <ScoreCard key="brightness" stage="brightness" score="95"></ScoreCard>
            <ScoreCard key="contrast" stage="contrast" score="95"></ScoreCard>
            <ScoreCard key="saturation" stage="saturation" score="95"></ScoreCard>
            <ScoreCard key="grayscale" stage="grayscale" score="95"></ScoreCard>
            <ScoreCard key="sepia" stage="sepia" score="95"></ScoreCard>
            <ScoreCard key="brightness" stage="brightness" score="95"></ScoreCard>
            <ScoreCard key="hue rotate" stage="hue rotate" score="95"></ScoreCard>
            <ScoreCard key="blur" stage="blur" score="95"></ScoreCard>
            {/* <div className="scores-container">
                {Object.entries(scores).map(([stage, score]) => (
                    <ScoreCard key={stage} stage={stage} score={score} />
                ))}
            </div> */}
        </div>
        
    )
}

export default ResultsPage;