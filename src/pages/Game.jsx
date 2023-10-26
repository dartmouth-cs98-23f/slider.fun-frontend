import { useState } from 'react'
import React from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'
import SidebarItem from '../components/SliderbarItem'
import edited from '../assets/Chai-Edited.jpg'
import current from '../assets/Chai000724-R2-077-37.jpg'
import "../App.scss";

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
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
      max: 20
    },
    unit: 'px'
  }
]

const Game = () => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const selectedOption = options[selectedOptionIndex]

  function handleSliderChange({ target }) {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: target.value }
      })
    })
  }

  const [averageRgbValues, setAverageRgbValues] = useState([]);


  const getRBG = (pictureFile) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = pictureFile;
      const gridAverageRgbValues = [];

      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set the canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);

        const gridSize = 10;
        const cellWidth = img.width / gridSize;
        const cellHeight = img.height / gridSize;

        // Loop through each cell in the grid
        for (let y = 0; y < gridSize; y++) {
          for (let x = 0; x < gridSize; x++) {
            // Calculate the average RGB values for the current cell
            const startX = x * cellWidth;
            const startY = y * cellHeight;
            const pixelData = ctx.getImageData(startX, startY, cellWidth, cellHeight).data;

            let totalRed = 0;
            let totalGreen = 0;
            let totalBlue = 0;

            for (let i = 0; i < pixelData.length; i += 4) {
              totalRed += pixelData[i];
              totalGreen += pixelData[i + 1];
              totalBlue += pixelData[i + 2];
            }

            const cellSize = cellWidth * cellHeight;
            const averageRed = Math.round(totalRed / cellSize);
            const averageGreen = Math.round(totalGreen / cellSize);
            const averageBlue = Math.round(totalBlue / cellSize);

            // Store the average RGB values in the array
            gridAverageRgbValues.push({ x, y, averageRed, averageGreen, averageBlue });

          }
        }

        // Set the state with grid average RGB values
        // setAverageRgbValues(gridAverageRgbValues);
        // console.log(gridAverageRgbValues)
        // return (gridAverageRgbValues)
        // console.log(gridAverageRgbValues)

        resolve(gridAverageRgbValues);

      };


      img.onerror = function (err) {
        reject(new Error("Image loading error"));
      };
      // console.log("hi", gridAverageRgbValues.length)
      // setAverageRgbValues(gridAverageRgbValues)
      return (gridAverageRgbValues)
    });
  }

  const compareTwoPhotos = async (pic1, pic2) => {
    const pic1RGB = await getRBG(pic1)
    const pic2RGB = await getRBG(pic2)
    console.log("length", pic1RGB, pic2RGB)
    console.log("length", pic1RGB.length, pic2RGB.length)

    // console.log(typeof (pic1RGB), typeof (pic2RGB))
    // console.log(Object.keys(pic1RGB), pic2RGB.length)
    // console.log(pic1RGB)

    if ((pic1RGB.length) === (pic2RGB.length)) {
      for (let i = 0; i < pic1RGB.length; i++) {
        console.log(pic1RGB[i])
        console.log(pic2RGB[i])
        console.log(i)
      }
    }
  }


  function getImageStyle() {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return { filter: filters.join(' ') }
  }

  return (
    <div>

      <Header>  </Header>

      <div className="container">
        {/* <div className="main-image" style={getImageStyle()} /> */}
        <div className='photoContainer'>
          <div className='photo'>
            <p> Pre </p>
            <img src={current} alt="pre edit pics" style={getImageStyle()} />
          </div>
          <div className='photo'>
            <p> Goal </p>
            <img src={edited} alt="edited pics" />
          </div>
        </div>

        <div className="sidebar">
          {options.map((option, index) => {
            return (
              <SidebarItem
                key={index}
                name={option.name}
                active={index === selectedOptionIndex}
                handleClick={() => setSelectedOptionIndex(index)}
              />
            )
          })}
        </div>
        <Slider
          min={selectedOption.range.min}
          max={selectedOption.range.max}
          value={selectedOption.value}
          handleChange={handleSliderChange}
        />
        <button onClick={() => compareTwoPhotos(current, edited)} > Check RBG </button>
      </div>
      {/* <div>{averageRgbValues}</div> */}
    </div>
  )
}

export default Game