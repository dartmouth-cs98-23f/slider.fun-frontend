import { useState, useEffect } from 'react'
import React from 'react'
import Slider from '../components/Slider'
import ResultsModal from '../components/ResultsModal'
import current from '../assets/Chai000724-R2-077-37.jpg'
import "../App.scss";
import $ from 'jquery';
import ImageView from '../components/ImageView'
import side2side from "../assets/SideToSideSplit.png"
import verticalSplit from "../assets/VerticalSplit.png"
import horizontalSplit from "../assets/HorizontalSplit.png"
import { compareTwoPhotos, getImageStyle } from '../components/Scoring'
import { defaultSlider } from '../components/Slider'
import { IconPhotoQuestion } from '@tabler/icons-react';
import "../styles/game.scss"
import { useDispatch } from 'react-redux'

import axios from 'axios';
import { updateScores } from '../actions/tutorialAction'

// takes a backend photo link and return the photo object
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

const DEFAULT_OPTIONS = defaultSlider

const MODIFIED_OPTIONS = []

const Game = (props) => {

  const dispatch = useDispatch();
  const stageOptions = props.stageOptions;
  const stageNumber = props.stageNumber;

  const [defaultOptions] = useState(DEFAULT_OPTIONS)
  const [editedOptions, setEditedOptions] = useState(MODIFIED_OPTIONS)
  const [currentOptions, setCurrentOptions] = useState(stageOptions)

  const [score, setScore] = useState(0)
  const [percentScore, setPercentScore] = useState(0)
  const [defaultScore, setDefaultScore] = useState(false)

  const [importEdited, setImportEdited] = useState("https://wallpapers.com/images/featured/blank-white-7sn5o1woonmklx1h.jpg")
  const [active, setActive] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resetPressable, setResetPressable] = useState(true);

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
      }
    });
  }, [props.pic_link]);


  useEffect(() => {
    setCurrentOptions(stageOptions)
  }, [stageOptions]);

  const handleScoreProcessing = async (photo, filter1, filter2) => {
    // setting a default score for the first time
    if (defaultScore === false) {
      setDefaultScore(await compareTwoPhotos(photo, getImageStyle(defaultOptions), filter2))
    }
    // console.log("hi", filter1, filter2)
    let photoScore = (await compareTwoPhotos(photo, filter1, filter2))
    // console.log("photo score", photoScore)
    setScore(photoScore)
  }

  useEffect(() => {
    if (score && defaultScore) {
      // setPercentScore(100 - (Math.round(score / defaultScore) * 10))
      let calcPercentScore = 100 - (Math.round(score))
      // console.log("percent store", calcPercentScore)

      setPercentScore(calcPercentScore)

      if (props.tutorial) {
        dispatch(updateScores(stageNumber, calcPercentScore))
      }

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <IconPhotoQuestion className="tIconGame" onClick={props.openModal} />
          <p> View: &nbsp;&nbsp;&nbsp;</p>
          <img onClick={() => SetView(1)} className='viewButtonS2S selected' src={side2side} alt="card" />
          <img onClick={() => SetView(2)} className='viewButtonVS ' src={verticalSplit} alt="card" />
          <img onClick={() => SetView(3)} className='viewButtonHS ' src={horizontalSplit} alt="card" />
          {/* {
            location.pathname.startsWith('/tutorial') &&
            <IconPhotoQuestion className="tIconGame" onClick={props.openModal} />
          } */}
          {/* <IconRotate className='tIconGame' /> */}
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

          <button onClick={handleCompareClick}>Submit</button>

          {/* uncomment below for easier navigation */}

          {/* <button onClick={props.goToPreviousStage} disabled={props.currentStageIndex === 0}>Previous Stage</button>
          <button onClick={props.goToNextStage} disabled={props.currentStageIndex === 7 - 1}>Next Stage</button> */}
        </div>

        {isModalVisible && (
          <ResultsModal
            daily={props.daily}
            dailyPuzzleId={props.dailyPuzzleId}
            tutorial={props.tutorial}
            goToNextStage={props.goToNextStage}
            score={percentScore}
            onClose={closeModal}
            img={importEdited}
            userSelectedProperties={currentOptions}
            currentStyle={getImageStyle(currentOptions)}
            targetStyle={getImageStyle(editedOptions)} />
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