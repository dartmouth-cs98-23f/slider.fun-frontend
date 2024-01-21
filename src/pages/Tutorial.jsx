import React, { useState } from 'react'
import tutorialData from "../assets/TutorialData.js"
import Stage from '../components/Stage'
import TutorialHeader from '../components/TutorialHeader'

const Tutorial = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0, 0, 0, 0]);

  const totalStages = tutorialData.Stages.length;

  const updateScores = (indexToUpdate, newScore) => {
    console.log(newScore)
    setScores(scores.map((score, index) => index === indexToUpdate ? newScore : score));
    console.log(scores)
  };

  const goToNextStage = () => {
    console.log("goToNextStage called")
    setCurrentStageIndex((prevIndex) => Math.min(prevIndex + 1, totalStages - 1));
  };

  const goToPreviousStage = () => {
    setCurrentStageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const currentStage = tutorialData.Stages[currentStageIndex];

  const initialSliders = [0, 1, 2, 3, 4, 5, 6].map((_, stageIndex) =>
    tutorialData.DEFAULT_OPTIONS.map((option, index) => ({
      name: option.name,
      property: option.property,
      value: option.value,
      range: option.range,
      unit: option.unit,
      status: index <= stageIndex
    }))
  );

  const [stageSliders, setStageSlider] = useState(initialSliders);

  const updateStageSliders = (indexToUpdate, newValues) => {
    setStageSlider(stageSliders.map((sliders, index) => index === indexToUpdate ? newValues : sliders));
    // console.log(stageSliders)
  };

  return (
    <div>
      <div> {currentStageIndex}</div>
      <div>
        <Stage
          stageNumber={currentStageIndex}
          currentOptions={stageSliders[currentStageIndex]}
          link={currentStage.link}
          infoText={currentStage.infoText}
          extraText={currentStage.extraText}
          updateScores={updateScores}
          updateStageSliders={updateStageSliders}
          goToPreviousStage={goToPreviousStage}
          goToNextStage={goToNextStage}
        />
      </div>
      <TutorialHeader scores={scores} stageNumber={currentStageIndex} />

    </div>
  )
}

export default Tutorial
