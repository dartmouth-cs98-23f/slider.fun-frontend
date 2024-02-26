import React, { useState } from 'react'
import Game from "../pages/Game"
import InfoModal from './InfoModal'
// import TutorialHeader from './TutorialHeader'

const Stage = (props) => {
  const title = props.title
  const stageOptions = props.currentOptions
  const link = props.link
  const infoText = props.infoText
  const extraText = props.extraText
  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => {
    setIsModalVisible(false)
  };

  const openModal = () => {
    setIsModalVisible(true)
  };

  return (
    <div>
      {isModalVisible && <div className="modal-overlay"></div>}
      <InfoModal heading={title} text={infoText} extraText={extraText} isModalVisible={isModalVisible} closeModal={closeModal} openModal={openModal} />
      <Game
        stageOptions={stageOptions}
        pic_link={link}
        openModal={openModal}
        // nextLevel="/tutorial/stage2"
        updateScores={props.updateScores}
        updateStageSliders={props.updateStageSliders}
        stageNumber={props.stageNumber}
        goToPreviousStage={props.goToPreviousStage}
        goToNextStage={props.goToNextStage}
        tutorial={props.tutorial}
      />
    </div>
  )
}

export default Stage