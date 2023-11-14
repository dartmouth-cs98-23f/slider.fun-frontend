import React, { useState } from 'react'
import Game from './Game'
import InfoModal from '../components/InfoModal'
import TutorialHeader from '../components/TutorialHeader'

const CURRENT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 110,
    range: {
      min: 20,
      max: 200
    },
    unit: '%',
    status: true,
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 110,
    range: {
      min: 20,
      max: 200
    },
    unit: '%',
    status: false,
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%',
    status: false,
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%',
    status: false,
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%',
    status: false,
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg',
    status: false,
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px',
    status: false,
  }
]



const link = "https://slider-fun.onrender.com/api/photo/65495d668d1d5c2fa933c23a"

const infoText = "Adjusting brightness involves altering the overall lightness or darkness of an image. This can be particularly useful in low-light conditions to enhance image clarity, or in overly bright conditions to reduce glare and balance the exposure."
const extraText = "Commonly used in nature photography to bring out details in underexposed areas like dense forests or sunset scenes or in event photography, such as weddings or concerts, to compensate for varying lighting conditions. "
const StageOne = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const closeModal = () => {
    setIsModalVisible(false)
  };

  const openModal = () => {
    setIsModalVisible(true)
  };

  return (
    <div>
      {isModalVisible && <div className="modal-overlay"></div>}
      <InfoModal heading="Brightness" text={infoText} extraText={extraText} isModalVisible={isModalVisible} closeModal={closeModal} openModal={openModal} />
      <TutorialHeader />
      <Game
        stage_options={CURRENT_OPTIONS} pic_link={link} openModal={openModal}
      />
    </div>
  )
}

export default StageOne