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

const link = "https://slider-fun.onrender.com/api/photo/654ff0d49389098760e3ebbe"

const infoText = " Adjusting contrast in photo editing enhances the difference between the light and dark areas of an image, making it ideal for adding depth and dimension, especially in flat or dull images."
const extraText = "Often used in portrait photography to add depth and emphasis to facial features and landscape photography to emphasize textures and contours, and in "

const Stage2 = () => {
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
      <InfoModal heading="Contrast" text={infoText} extraText={extraText} isModalVisible={isModalVisible} closeModal={closeModal} openModal={openModal} />
      <TutorialHeader />
      <Game
        stage_options={CURRENT_OPTIONS} pic_link={link} openModal={openModal}
      />
    </div>
  )
}

export default Stage2