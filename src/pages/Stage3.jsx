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
    status: true,
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
    status: true,
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


const link = "https://slider-fun.onrender.com/api/photo/654feac4663946fee35a1600"

const infoText = "Adjusting brightness involves altering the overall lightness or darkness of an image. This can be particularly useful in low-light conditions to enhance image clarity, or in overly bright conditions to reduce glare and balance the exposure."


const Stage3 = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const closeModal = () => {
    setIsModalVisible(false)
  };

  return (
    <div>
      <InfoModal text={infoText} isModalVisible={isModalVisible} closeModal={closeModal} />
      <TutorialHeader />
      <Game
        stage_options={CURRENT_OPTIONS} pic_link={link}
      />
    </div>
  )
}

export default Stage3