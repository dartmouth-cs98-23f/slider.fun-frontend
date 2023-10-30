import { useState } from 'react'
import React from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'
import SidebarItem from '../components/SliderbarItem'
import edited from '../assets/Chai-Edited.jpg'
import current from '../assets/Chai000724-R2-077-37.jpg'
import "../App.scss";
import { useEffect } from 'react'

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
  const [score, setScore] = useState(0)
  const [percentScore, setPercentScore] = useState(0)
  const [defaultScore, setDefaultScore] = useState(false)
  const selectedOption = options[selectedOptionIndex]

  function handleSliderChange(propertyIndex, { target }) {
    console.log(target)
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== propertyIndex) return option
        return { ...option, value: target.value }
      })
    })
  }



  // const [averageRgbValues, setAverageRgbValues] = useState([]);


  const getRBG = (pictureFile, filters = false) => {
    console.log(filters)
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
        if (filters) {
          ctx.filter = filters
        }

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

        resolve(gridAverageRgbValues);

      };


      img.onerror = function (err) {
        reject(new Error("Image loading error"));
      };
      // console.log("hi", gridAverageRgbValues.length)
      return (gridAverageRgbValues)
    });
  }

  const compareTwoPhotos = async (pic1, pic2, filters = false) => {
    let pic1RGB = []

    if (filters) {
      pic1RGB = await getRBG(pic1, filters)
    } else {
      pic1RGB = await getRBG(pic1)
    }

    const pic2RGB = await getRBG(pic2)

    if ((pic1RGB.length) === (pic2RGB.length)) {

      let redSum = 0
      let greenSum = 0
      let blueSum = 0
      for (let i = 0; i < pic1RGB.length; i++) {

        // console.log(pic2RGB[i])
        redSum += Math.abs(pic1RGB[i].averageRed - pic2RGB[i].averageRed)
        greenSum += Math.abs(pic1RGB[i].averageGreen - pic2RGB[i].averageGreen)
        blueSum += Math.abs(pic1RGB[i].averageBlue - pic2RGB[i].averageBlue)
        // console.log(i)
      }
      console.log(redSum, greenSum, blueSum)
      console.log("total sum", redSum + greenSum + blueSum)
      return (redSum + greenSum + blueSum)
    }
  }


  const handleScoreProcessing = async (current, edited, filter) => {
    if (defaultScore === false) {
      setDefaultScore(await compareTwoPhotos(current, edited))
    }

    setScore(await compareTwoPhotos(current, edited, filter))

  }


  function getImageStyle() {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    return { filter: filters.join(' ') }
  }



  useEffect(() => {
    if (score && defaultScore) {
      // zero is full score
      console.log(score / defaultScore)
      setPercentScore(100 - (Math.round(score / defaultScore) * 5))
    }
  }, [score, defaultScore])


  return (
    <div>

      <Header>  </Header>

      <div className="container">
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

        {/* <div className="sidebar">
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
        </div> */}
        <div className='slidersContainer'>
          <div className='sliderContainer'>
            <p> Brightness</p>
            <Slider
              min={options[0].range.min}
              max={options[0].range.max}
              value={options[0].value}
              handleChange={(event) => handleSliderChange(0, event)}
            />
          </div>
          <div className='sliderContainer'>
            <p> Contrast</p>
            <Slider
              min={options[1].range.min}
              max={options[1].range.max}
              value={options[1].value}
              handleChange={(event) => handleSliderChange(1, event)}
            />
          </div>
          <div className='sliderContainer'>
            <p> Saturation </p>
            <Slider
              min={options[2].range.min}
              max={options[2].range.max}
              value={options[2].value}
              handleChange={(event) => handleSliderChange(2, event)}
            />
          </div>
          <div className='sliderContainer'>
            <p> Greyscale</p>
            <Slider
              min={options[3].range.min}
              max={options[3].range.max}
              value={options[3].value}
              handleChange={(event) => handleSliderChange(3, event)}
            />
          </div>
          <div className='sliderContainer'>
            <p> Sepia</p>
            <Slider
              min={options[4].range.min}
              max={options[4].range.max}
              value={options[4].value}
              handleChange={(event) => handleSliderChange(4, event)}
            />
          </div>
          <div className='sliderContainer'>
            <p> Hue Rotate</p>
            <Slider
              min={options[5].range.min}
              max={options[5].range.max}
              value={options[5].value}
              handleChange={(event) => handleSliderChange(5, event)}
            />
          </div>
          <div className='sliderContainer'>
            <p> Blur</p>
            <Slider
              min={options[6].range.min}
              max={options[6].range.max}
              value={options[6].value}
              handleChange={(event) => handleSliderChange(6, event)}
            />
          </div>
        </div>

        <button onClick={() => handleScoreProcessing(current, edited, getImageStyle().filter)} > Compare! </button>
        <div className='score'>
          {percentScore !== null && percentScore !== undefined && percentScore !== 0 && (
            <p>Percent score: {percentScore}</p>
          )}
        </div>
      </div>
      {/* <div>{averageRgbValues}</div> */}
    </div>
  )
}

export default Game