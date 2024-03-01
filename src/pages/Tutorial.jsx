import React, { useState } from 'react'
import tutorialData from "../assets/TutorialData.js"
import Stage from '../components/Stage'
import TutorialHeader from '../components/TutorialHeader'
import { useSelector } from 'react-redux'

const Tutorial = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const scores = useSelector(state => state.tutorial.scores);

  const totalStages = tutorialData.Stages.length;
  const [mostForwardStage, setMostForwardStage] = useState(0);

  const goToNextStage = () => {
    setCurrentStageIndex((prevIndex) => Math.min(prevIndex + 1, totalStages - 1));
    setMostForwardStage(Math.max(mostForwardStage, currentStageIndex + 1));
  };

  const goToPreviousStage = () => {
    setCurrentStageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToSpecificStage = (index) => {
    if (index <= mostForwardStage) {
      setCurrentStageIndex(index);
    }
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
  };

  return (

    <div className='stageContainer'>
      <Stage
        title={currentStage.title}
        stageNumber={currentStageIndex}
        currentOptions={stageSliders[currentStageIndex]}
        link={currentStage.link}
        infoText={currentStage.infoText}
        extraText={currentStage.extraText}
        updateStageSliders={updateStageSliders}
        goToPreviousStage={goToPreviousStage}
        goToNextStage={goToNextStage}
        tutorial={true}
      />
      <TutorialHeader scores={scores} stageNumber={currentStageIndex} mostForwardStage={mostForwardStage} goToSpecificStage={goToSpecificStage} />
    </div>
  )
}

export default Tutorial
