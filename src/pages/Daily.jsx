import React from 'react'
import Game from './Game'

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


const dHallLink = "https://slider-fun.onrender.com/api/photo/6553e5a2ab042abb281b2661"
const nycLink = "https://slider-fun.onrender.com/api/photo/6553e6b0ab042abb281b2702"
const bakerTower = "https://slider-fun.onrender.com/api/photo/6553e9f6ab042abb281b276b"

const links = {
  "1": dHallLink,
  "2": nycLink,
  "3": bakerTower,
}

const Daily = () => {
  // Function to generate a random number
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Generate a random key
  const randomKey = getRandomNumber(1, Object.keys(links).length);

  // Select a random link
  const randomLink = links[randomKey];

  return (
    <div>
      {/* {isModalVisible && <div className="modal-overlay"></div>} */}
      {/* <InfoModal heading="Blur" text={infoText} extraText={extraText} isModalVisible={isModalVisible} closeModal={closeModal} openModal={openModal} /> */}
      {/* <TutorialHeader /> */}
      {/* <h1> Coming Soon....</h1> */}
      <Game
        stageOptions={CURRENT_OPTIONS} pic_link={randomLink}
      />
    </div>
  )
}

export default Daily