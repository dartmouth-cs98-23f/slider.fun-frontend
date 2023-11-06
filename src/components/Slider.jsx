import React from 'react';
import '../App.scss';

export default function Slider({ name, min, max, value, status, handleChange }) {
  return status ? (
    <div>
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </div>
  ) : (
    <div>
      <input
        type="range"
        className="sliderLocked"
        min={min}
        max={max}
        value={value}
      />
    </div>
  );
}
