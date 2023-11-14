import React, { useState } from 'react'
import Game from './Game'
import InfoModal from '../components/InfoModal'
import TutorialHeader from '../components/TutorialHeader'

const CURRENT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%',
    status: true,
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
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
    status: true,
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
    status: true,
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
    status: true,
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 1.5
    },
    unit: 'px',
    status: true,
  }
]


const link = "https://slider-fun.onrender.com/api/photo/655280b96cdb84a05144ef65"

const infoText = "Adding blur to a photo can soften edges, create a sense of motion, or bring focus to a particular element by reducing background detail."
const extraText = "Widely used in sports and action photography to convey motion and speed, and in portrait photography to isolate the subject from a distracting background."

const Stage7 = () => {
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
      <InfoModal heading="Blur" text={infoText} extraText={extraText} isModalVisible={isModalVisible} closeModal={closeModal} openModal={openModal} />
      <TutorialHeader />
      <Game
        stage_options={CURRENT_OPTIONS} pic_link={link} openModal={openModal}
      />
    </div>
  )
}

export default Stage7