import React, { useState } from 'react'
import Slider from './Slider'
import $ from 'jquery';
import "../App.scss";
import ImageView from './ImageView'
import { getImageStyle } from '../components/Scoring'
// import side2side from "../assets/SideToSideSplit.png"
// import verticalSplit from "../assets/VerticalSplit.png"
// import horizontalSplit from "../assets/HorizontalSplit.png"
import { defaultSlider } from '../components/Slider'
import { postPhoto } from '../context/photoFunctions';

const PhotoCreation = (props) => {

  const DEFAULT_OPTIONS = defaultSlider;
  const [active, setActive] = useState(1);
  const [currentOptions, setCurrentOptions] = useState(DEFAULT_OPTIONS)
  const [editedOptions] = useState(DEFAULT_OPTIONS)
  const photoUrl = props.photoUrl;

  // const [photoUrl, setPhotoUrl] = useState("https://firebasestorage.googleapis.com/v0/b/sliderdotfun-3af7a.appspot.com/o/selfUploadedImages%2FeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NWM2ODQyYTk5YzhiZTNhMTc3OGNhNGMiLCJpYXQiOjE3MDc1MDg3NzkzNDB9.AAFbUj49GaxuytZ_c845fo749BSgvIci8sIZQ5khbjE%2F99243A94-704B-4036-A69C-4D9D791FBDBD.JPG57175079-348e-4738-8ad6-635879600b18?alt=media&token=d32f9f49-8a55-4ffc-88d2-fb5353f0bc4c")

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


  function handleSliderChange(propertyIndex, { target }) {
    const newSliderValues = currentOptions.map((option, index) => {
      if (index !== propertyIndex) {
        return option;
      }
      return { ...option, value: target.value };
    });

    // sets the local sliders to the new value 
    setCurrentOptions(newSliderValues)
  }

  function addStatusToPhotoProperties(photoProperties) {
    // Iterate through each property in the photoProperties array
    photoProperties.forEach(property => {
      // Add the 'status' key with a value of true to each property object
      property.status = true;
    });

    return photoProperties;
  }


  async function handleSubmitPhoto(photoURL, sliderValues) {
    const imageUrl = photoURL;
    const photoProperties = addStatusToPhotoProperties(sliderValues);

    const data = {
      "imageUrl": imageUrl,
      "photoProperties": photoProperties
    }

    try {
      await postPhoto(data, props.userId);

    } catch (error) {
      console.error('Error submitting photo:', error);
    }
  }

  return (
    <div className="container">
      <ImageView active={1} importEdited={photoUrl} getImageStyle={getImageStyle} currentOptions={editedOptions} editedOptions={currentOptions} />

      {/* <div className='viewButtonsContainer'>
        <p> View: &nbsp;&nbsp;&nbsp;</p>
        <img onClick={() => SetView(1)} className='viewButtonS2S selected' src={side2side} alt="card" />
        <img onClick={() => SetView(2)} className='viewButtonVS ' src={verticalSplit} alt="card" />
        <img onClick={() => SetView(3)} className='viewButtonHS ' src={horizontalSplit} alt="card" />
      </div> */}

      <div className='slidersContainer'>
        {currentOptions.map((option, index) => (
          <Slider
            key={index}
            name={option.name}
            min={option.range.min}
            max={option.range.max}
            value={option.value}
            status={true}
            handleChange={(event) => handleSliderChange(index, event)}
            // only want to set `step` for the last slider
            step={0.1}
          />
        ))}
      </div>
      <div className='actionButtons'>
        <button className='submit' onClick={() => handleSubmitPhoto(photoUrl, currentOptions)}>submit</button>

      </div>
    </div>
  )
}

export default PhotoCreation