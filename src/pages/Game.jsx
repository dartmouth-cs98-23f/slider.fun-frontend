import { useState } from 'react'
import React from 'react'
import Slider from '../components/Slider'
import ResultsModal from '../components/ResultsModal'
import current from '../assets/Chai000724-R2-077-37.jpg'
import "../App.scss";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'
import $ from 'jquery';
import ImageView from '../components/ImageView'
import side2side from "../assets/SideToSideSplit.png"
import verticalSplit from "../assets/VerticalSplit.png"
import horizontalSplit from "../assets/HorizontalSplit.png"

import axios from 'axios';

async function fetchPhoto(link) {
  try {
    const response = await axios.get(link);

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

const MODIFIED_OPTIONS = []

const Game = (props) => {

  const location = useLocation();
  const [defaultOptions] = useState(DEFAULT_OPTIONS)
  const [editedOptions, setEditedOptions] = useState(MODIFIED_OPTIONS)
  const [currentOptions, setCurrentOptions] = useState(props.stage_options)
  const [score, setScore] = useState(0)
  const [percentScore, setPercentScore] = useState(0)
  const [defaultScore, setDefaultScore] = useState(false)
  const [importEdited, setImportEdited] = useState("https://wallpapers.com/images/featured/blank-white-7sn5o1woonmklx1h.jpg")
  const [active, setActive] = React.useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resetPressable, setResetPressable] = useState(true);

  function handleSliderChange(propertyIndex, { target }) {
    setResetPressable(false);
    setCurrentOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== propertyIndex) return option
        return { ...option, value: target.value }
      })
    })
  }

  useEffect(() => {
    fetchPhoto(props.pic_link).then(data => {
      if (data) {

        setImportEdited(data.imageUrl);
        setEditedOptions(data.photoProperties)

        // setImportEdited("https://firebasestorage.googleapis.com/v0/b/sliderdotfun-3af7a.appspot.com/o/images%2Fdaily3.jpeg?alt=media&token=faeb4d74-5b3b-4fc4-8c68-e19278a570fe")
        // setEditedOptions(defaultOptions)
      }
    });
  }, [props.pic_link]);

  const getRBG = (pictureFile, filters = false) => {
    // console.log(filters)
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

// helper function to convert filter objects to string for css purposes. 
  function getImageStyle(state) {
    console.log(state)
    const filters = state.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    console.log(filters)
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

  const handleCompareClick = () => {
    handleScoreProcessing(current, getImageStyle(currentOptions).filter, getImageStyle(editedOptions).filter)
    setIsModalVisible(true);
  };

  const handleResetSliders = () => {
    currentOptions[0].value = defaultOptions[0].value;
    currentOptions[1].value = defaultOptions[1].value;
    currentOptions[2].value = defaultOptions[2].value;
    currentOptions[3].value = defaultOptions[3].value;
    currentOptions[4].value = defaultOptions[4].value;
    currentOptions[5].value = defaultOptions[5].value;
    currentOptions[6].value = defaultOptions[6].value;
    setResetPressable(true);
  };

  const closeModal = () => {
    setIsModalVisible(false)
  };

  const SetView = (active) => {
    $('.viewButtonS2S, .viewButtonVS, .viewButtonHS').removeClass('selected');

    // Add 'selected' class to the clicked image based on 'active' parameter
    if (active === 1) {
      $('.viewButtonS2S').addClass('selected');
    } else if (active === 2) {
      $('.viewButtonVS').addClass('selected');
    } else if (active === 3) {
      $('.viewButtonHS').addClass('selected');
    }

    setActive(active);
  };

  return (
    <div>
      {isModalVisible && <div className="modal-overlay"></div>}
      <div className="container">

        <ImageView active={active} importEdited={importEdited} getImageStyle={getImageStyle} currentOptions={currentOptions} editedOptions={editedOptions} />

        <div className='viewButtonsContainer'>
          <p> View: &nbsp;&nbsp;&nbsp;</p>
          <img onClick={() => SetView(1)} className='viewButtonS2S selected' src={side2side} alt="card" />
          <img onClick={() => SetView(2)} className='viewButtonVS ' src={verticalSplit} alt="card" />
          <img onClick={() => SetView(3)} className='viewButtonHS ' src={horizontalSplit} alt="card" />
        </div>

        <div className='slidersContainer'>

          <Slider
            name={currentOptions[0].name}
            min={currentOptions[0].range.min}
            max={currentOptions[0].range.max}
            value={currentOptions[0].value}
            status={currentOptions[0].status}
            handleChange={(event) => handleSliderChange(0, event)}

          />

          <Slider
            name={currentOptions[1].name}
            min={currentOptions[1].range.min}
            max={currentOptions[1].range.max}
            value={currentOptions[1].value}
            status={currentOptions[1].status}
            handleChange={(event) => handleSliderChange(1, event)}
          />

          <Slider
            name={currentOptions[2].name}
            min={currentOptions[2].range.min}
            max={currentOptions[2].range.max}
            value={currentOptions[2].value}
            status={currentOptions[2].status}
            handleChange={(event) => handleSliderChange(2, event)}
          />

          <Slider
            name={currentOptions[3].name}
            min={currentOptions[3].range.min}
            max={currentOptions[3].range.max}
            value={currentOptions[3].value}
            status={currentOptions[3].status}
            handleChange={(event) => handleSliderChange(3, event)}
          />

          <Slider
            name={currentOptions[4].name}
            min={currentOptions[4].range.min}
            max={currentOptions[4].range.max}
            value={currentOptions[4].value}
            status={currentOptions[4].status}
            handleChange={(event) => handleSliderChange(4, event)}
          />

          <Slider
            name={currentOptions[5].name}
            min={currentOptions[5].range.min}
            max={currentOptions[5].range.max}
            value={currentOptions[5].value}
            status={currentOptions[5].status}
            handleChange={(event) => handleSliderChange(5, event)}
          />

          <Slider
            name={currentOptions[6].name}
            min={currentOptions[6].range.min}
            max={currentOptions[6].range.max}
            value={currentOptions[6].value}
            status={currentOptions[6].status}
            handleChange={(event) => handleSliderChange(6, event)}
            step={0.1}
          />
        </div>
        <div className='actionButtons'>

          <button className='resetButton' onClick={handleResetSliders} disabled={resetPressable}>Reset</button>
          {location.pathname.startsWith('/tutorial') && <button className='infoModalButton' onClick={props.openModal} >Explanation</button>}
          <button onClick={handleCompareClick}>Compare</button>
        </div>

        {isModalVisible && (
          <ResultsModal nextLevel={props.nextLevel} score={percentScore} onClose={closeModal} img={importEdited} currentStyle={getImageStyle(currentOptions)} targetStyle={getImageStyle(editedOptions)} />
        )}
        <div className='score'>
          {/* <p> Default Score: {defaultScore}</p>
          <p> Current Score: {score}</p> */}
          {percentScore !== null && percentScore !== undefined && percentScore !== 0}
        </div>
      </div>
    </div>
  )
}

export default Game