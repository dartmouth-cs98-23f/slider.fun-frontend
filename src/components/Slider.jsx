import React from 'react';
import '../App.scss';

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
