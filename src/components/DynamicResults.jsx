import React from 'react';

const ScoreCard = ({stage, score}) => {
    return (
        <div className="scorecard-containter">
            <div className="scorecard-stage">{stage}</div>
            <div className="scorecard-score">{score}</div>
        </div>
    )
}

const DynamicResultsPage = ({ScoreCards}) => {
    return (
        <ScoreCard>Scorecard</ScoreCard>
    )
}

export default DynamicResultsPage;