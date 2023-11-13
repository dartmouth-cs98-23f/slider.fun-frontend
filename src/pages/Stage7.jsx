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
      max: 5
    },
    unit: 'px',
    status: true,
  }
]

const link = "https://slider-fun.onrender.com/api/photo/655280b96cdb84a05144ef65"

const Stage7 = () => {
  return (
    <div>
      <Game
        stage_options={CURRENT_OPTIONS} pic_link={link}
      />
    </div>
  )
}

export default Stage7