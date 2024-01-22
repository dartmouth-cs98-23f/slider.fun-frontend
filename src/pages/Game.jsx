import { useState, useEffect } from 'react'
import React from 'react'
import Slider from '../components/Slider'
import ResultsModal from '../components/ResultsModal'
import current from '../assets/Chai000724-R2-077-37.jpg'
import "../App.scss";
import { useLocation } from 'react-router-dom';
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
      max: 20
    },
    unit: 'px'
  }
]

const MODIFIED_OPTIONS = []

const Game = (props) => {
  const stageOptions = props.stageOptions;

  const location = useLocation();
  const [defaultOptions] = useState(DEFAULT_OPTIONS)
  const [editedOptions, setEditedOptions] = useState(MODIFIED_OPTIONS)
  const [currentOptions, setCurrentOptions] = useState(stageOptions)

  const [score, setScore] = useState(0)
  const [percentScore, setPercentScore] = useState(0)
  const [defaultScore, setDefaultScore] = useState(false)

  const [importEdited, setImportEdited] = useState("https://wallpapers.com/images/featured/blank-white-7sn5o1woonmklx1h.jpg")
  const [active, setActive] = React.useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resetPressable, setResetPressable] = useState(true);

  const updateScores = props.updateScores;
  const stageNumber = props.stageNumber;

  function handleSliderChange(propertyIndex, { target }) {
    setResetPressable(false);

    const newSliderValues = currentOptions.map((option, index) => {
      if (index !== propertyIndex) {
        return option;
      }
      return { ...option, value: target.value };
    });

    // sets the local sliders to the new value 
    setCurrentOptions(newSliderValues)

    // sets the global tutorial sliders to the new value
    if (props.updateStageSliders !== undefined) {
      props.updateStageSliders(props.stageNumber, newSliderValues)
    }
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


  useEffect(() => {
    setCurrentOptions(stageOptions)
  }, [stageOptions]);

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
    // for loop to calculate the differences for each color
    for (let i = 0; i < pic1RGB.length; i++) {
      redSum += Math.pow(pic1RGB[i].averageRed - pic2RGB[i].averageRed, 2);
      greenSum += Math.pow(pic1RGB[i].averageGreen - pic2RGB[i].averageGreen, 2);
      blueSum += Math.pow(pic1RGB[i].averageBlue - pic2RGB[i].averageBlue, 2);
    }

    // calculate the RMSE for each color
    const redRMSE = Math.sqrt(redSum / pic1RGB.length);
    const greenRMSE = Math.sqrt(greenSum / pic1RGB.length);
    const blueRMSE = Math.sqrt(blueSum / pic1RGB.length);

    const totalRMSE = (redRMSE + greenRMSE + blueRMSE) / 3;

    console.log('RMSE - Red:', redRMSE, 'Green:', greenRMSE, 'Blue:', blueRMSE);
    console.log('Total RMSE:', totalRMSE);

    return totalRMSE;
  }



  const handleScoreProcessing = async (photo, filter1, filter2) => {
    // setting a default score for the first time
    if (defaultScore === false) {
      setDefaultScore(await compareTwoPhotos(photo, getImageStyle(defaultOptions), filter2))
    }
    console.log("hi", filter1, filter2)
    let photoScore = (await compareTwoPhotos(photo, filter1, filter2))
    console.log("photo score", photoScore)
    setScore(photoScore)
  }

// helper function to convert filter objects to string for css purposes. 
  function getImageStyle(state) {
    console.log(state)
    const filters = state.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    // console.log(filters)
    return { filter: filters.join(' ') }
  }

  useEffect(() => {
    if (score && defaultScore) {
      // zero is full score
      console.log(score / defaultScore)

      // setPercentScore(100 - (Math.round(score / defaultScore) * 10))
      let calcPercentScore = 100 - (Math.round(score))
      console.log("percent store", calcPercentScore)

      setPercentScore(calcPercentScore)
      if (updateScores !== undefined) {
        updateScores(stageNumber, calcPercentScore)
      }
    }
  }, [score, defaultScore, updateScores, stageNumber])

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
          {currentOptions.map((option, index) => (
            <Slider
              key={index}
              name={option.name}
              min={option.range.min}
              max={option.range.max}
              value={option.value}
              status={option.status}
              handleChange={(event) => handleSliderChange(index, event)}
              // only want to set `step` for the last slider
              step={index === 6 ? 0.1 : undefined}
            />
          ))}
        </div>
        <div className='actionButtons'>
          <button className='resetButton' onClick={handleResetSliders} disabled={resetPressable}>Reset</button>
          {location.pathname.startsWith('/tutorial') && <button className='infoModalButton' onClick={props.openModal} >Explanation</button>}
          <button onClick={handleCompareClick}>Compare</button>
          {/* <button onClick={props.goToPreviousStage} disabled={props.currentStageIndex === 0}>Previous Stage</button>
          <button onClick={props.goToNextStage} disabled={props.currentStageIndex === 7 - 1}>Next Stage</button> */}
        </div>

        {isModalVisible && (
          <ResultsModal tutorial={props.tutorial} goToNextStage={props.goToNextStage} score={percentScore} onClose={closeModal} img={importEdited} currentStyle={getImageStyle(currentOptions)} targetStyle={getImageStyle(editedOptions)} />
        )}
        <div className='score'>
          {/* <p> Default RMSE: {defaultScore}</p>
          <p> Current RMSE: {score}</p> */}
          {percentScore !== null && percentScore !== undefined && percentScore !== 0}

        </div>
      </div>
    </div>
  )
}

export default Game