import { useState } from 'react'
import React from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'
import edited from '../assets/Chai-Edited.jpg'
import current from '../assets/Chai000724-R2-077-37.jpg'
import "../App.scss";
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios';

async function fetchPhoto() {
  try {
    const response = await axios.get('https://slider-fun.onrender.com/api/photo/653f28684b5cc0e8cb636edb');

    if (response.status === 200) {
      return response.data; // This will contain the data returned from the server
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }

  } catch (error) {
    console.error('There was an error fetching the photo:', error);
    return null;
  }
}



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


const CURRENT_OPTIONS = [
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

const MODIFIED_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 150,
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
    value: 123,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 4,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 23,
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
  const [defaultOptions] = useState(DEFAULT_OPTIONS)
  const [editedOptions] = useState(MODIFIED_OPTIONS)
  const [currentOptions, setCurrentOptions] = useState(CURRENT_OPTIONS)
  const [score, setScore] = useState(0)
  const [percentScore, setPercentScore] = useState(0)
  const [defaultScore, setDefaultScore] = useState(false)
  const [importEdited, setImportEdited] = useState("https://firebasestorage.googleapis.com/v0/b/sliderdotfun-3af7a.appspot.com/o/images%2F4.jpg?alt=media&token=4910492b-1934-4014-b1c1-dea6a0365b51&_gl=1*5klvjs*_ga*MTI5MTQyNzc4OS4xNjk4MjUzOTEz*_ga_CW55HF8NVT*MTY5ODYzMzU1Mi44LjEuMTY5ODYzNzgzOS42MC4wLjA")
  const selectedOption = currentOptions[selectedOptionIndex]
  const navigate = useNavigate();

  function handleSliderChange(propertyIndex, { target }) {
    setCurrentOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== propertyIndex) return option
        return { ...option, value: target.value }
      })
    })
  }

  useEffect(() => {
    // Example usage:
    fetchPhoto().then(data => {
      console.log("Received data:", data); // Check the full data object
      if (data && data.imageURL) {
        setImportEdited(data.imageURL);
      }
    });



  }, []);

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

  const compareTwoPhotos = async (pic, editedFilter, goalFilter1) => {
    const pic1RGB = await getRBG(pic, goalFilter1);
    const pic2RGB = await getRBG(pic, editedFilter);

    if (pic1RGB.length !== pic2RGB.length) {
      throw new Error('Image dimensions do not match.');
    }

    let redSum = 0, greenSum = 0, blueSum = 0;

    for (let i = 0; i < pic1RGB.length; i++) {
      redSum += Math.pow(pic1RGB[i].averageRed - pic2RGB[i].averageRed, 2);
      greenSum += Math.pow(pic1RGB[i].averageGreen - pic2RGB[i].averageGreen, 2);
      blueSum += Math.pow(pic1RGB[i].averageBlue - pic2RGB[i].averageBlue, 2);
    }

    const redRMSE = Math.sqrt(redSum / pic1RGB.length);
    const greenRMSE = Math.sqrt(greenSum / pic1RGB.length);
    const blueRMSE = Math.sqrt(blueSum / pic1RGB.length);

    const totalRMSE = (redRMSE + greenRMSE + blueRMSE) / 3;

    console.log('RMSE - Red:', redRMSE, 'Green:', greenRMSE, 'Blue:', blueRMSE);
    console.log('Total RMSE:', totalRMSE);

    return totalRMSE;
  }



  const handleScoreProcessing = async (photo, filter1, filter2) => {
    if (defaultScore === false) {
      setDefaultScore(await compareTwoPhotos(photo, getImageStyle(defaultOptions), filter2))
    }

    setScore(await compareTwoPhotos(photo, filter1, filter2))

  }


  function getImageStyle(state) {
    const filters = state.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    return { filter: filters.join(' ') }
  }

  useEffect(() => {
    if (score && defaultScore) {
      // zero is full score
      console.log(score / defaultScore)
      // setPercentScore(100 - (Math.round(score / defaultScore) * 10))
      setPercentScore(100 - (Math.round(score)))
    }
  }, [score, defaultScore])


  // useEffect(() => {
  //   if (defaultScore === false) {
  //     setDefaultScore(compareTwoPhotos(current, edited, getImageStyle().filter, getEditedImageStyle().filter))
  //   }
  // }, [importEdited])


  return (
    <div>

      <Header>  </Header>

      <div className="container">
        <div className='photoContainer'>
          <div className='photo'>
            <p> Pre </p>
            <img src={importEdited} alt="pre edit pics" style={getImageStyle(currentOptions)} />
          </div>
          <div className='photo'>
            <p> Goal </p>
            <img src={importEdited} style={getImageStyle(editedOptions)} alt="edited pics" />
          </div>
        </div>

        <div className='slidersContainer'>
          <div className='sliderContainer'>
            <p> Brightness</p>
            <Slider
              min={currentOptions[0].range.min}
              max={currentOptions[0].range.max}
              value={currentOptions[0].value}
              handleChange={(event) => handleSliderChange(0, event)}
            />
          </div>
          <div className='sliderContainer'>
            <p> Contrast</p>
            <Slider
              min={currentOptions[1].range.min}
              max={currentOptions[1].range.max}
              value={currentOptions[1].value}
              handleChange={(event) => handleSliderChange(1, event)}
            />
          </div>
          <div className='sliderContainer'>
            <p> Saturation </p>
            <Slider
              min={currentOptions[2].range.min}
              max={currentOptions[2].range.max}
              value={currentOptions[2].value}
              handleChange={(event) => handleSliderChange(2, event)}
            />
          </div>
          <div className='sliderContainer'>
            <p> Greyscale</p>
            <Slider
              min={currentOptions[3].range.min}
              max={currentOptions[3].range.max}
              value={currentOptions[3].value}
              handleChange={(event) => handleSliderChange(3, event)}
            />
          </div>
          <div className='sliderContainer'>
            <p> Sepia</p>
            <Slider
              min={currentOptions[4].range.min}
              max={currentOptions[4].range.max}
              value={currentOptions[4].value}
              handleChange={(event) => handleSliderChange(4, event)}
            />
          </div>
          <div className='sliderContainer'>
            <p> Hue Rotate</p>
            <Slider
              min={currentOptions[5].range.min}
              max={currentOptions[5].range.max}
              value={currentOptions[5].value}
              handleChange={(event) => handleSliderChange(5, event)}
            />
          </div>
          <div className='sliderContainer'>
            <p> Blur</p>
            <Slider
              min={currentOptions[6].range.min}
              max={currentOptions[6].range.max}
              value={currentOptions[6].value}
              handleChange={(event) => handleSliderChange(6, event)}
            />
          </div>
        </div>
        <button onClick={() => {navigate("/results")}}>Compare!</button>
        {/* <button onClick={() => handleScoreProcessing(current, getImageStyle(currentOptions).filter, getImageStyle(editedOptions).filter)} > Compare! </button> */}
        <div className='score'>
          <p> Default Score: {defaultScore}</p>
          <p> Current Score: {score}</p>
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