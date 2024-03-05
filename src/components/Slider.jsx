import React from 'react';
import '../App.scss';

export const defaultSlider = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 110,
    range: {
      min: 20,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 110,
    range: {
      min: 20,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 110,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 1
    },
    unit: 'px'
  }
]

export default function Slider({ name, min, max, value, status, handleChange, step }) {
  const isStepValid = step && !isNaN(step);

  return status ? (

    <div className='sliderContainer'>
      <p> {name} </p>
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        step={isStepValid ? step : undefined} // Use step only if it's valid
      />
    </div>
  ) : (
    <div className='sliderContainer sliderContainerLocked'>
      <p> {name} </p>
      <input
        type="range"
        className="sliderLocked"
        min={min}
        max={max}
        value={value}
        onChange={() => { }}
      />
    </div>
  );
}
