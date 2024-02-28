import React, { useState, useEffect } from 'react'
import Slider from './Slider'
import "../App.scss";
import ImageView from './ImageView'
import { getImageStyle } from '../components/Scoring'
import { defaultSlider } from '../components/Slider'
import { postPhoto } from '../context/photoFunctions';
import photoReq from '../assets/photoReq.png'

const PhotoCreation = (props) => {
  const DEFAULT_OPTIONS = defaultSlider;
  // const [active, setActive] = useState(1);
  const [currentOptions, setCurrentOptions] = useState(props.puzzleInfo ? props.puzzleInfo.photoProperties : DEFAULT_OPTIONS);
  const [editedOptions] = useState(DEFAULT_OPTIONS)
  const setMessageVisability = props.setMessageVisability;
  const photoUrl = props.photoUrl;

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


  async function handleSubmitPhoto(title, photoURL, sliderValues) {

    if (title === "") {
      props.setTitleMissingVis(true);
    } else {

      const imageUrl = photoURL;
      const photoProperties = addStatusToPhotoProperties(sliderValues);

      const data = {
        "title": title,
        "imageUrl": imageUrl,
        "photoProperties": photoProperties,
        "authorId": props.userId
      }
      console.log(data, props.userId)
      try {
        await postPhoto(data, props.userId);
        props.closeModal();
        setMessageVisability(true);
      } catch (error) {
        console.error('Error submitting photo:', error);
      }
    }

  }

  const [orientation, setOrientation] = useState('horizontal');

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      // Determine if the image is vertical or horizontal
      setOrientation(img.width > img.height ? 'horizontal' : 'vertical');
    };

    img.src = photoUrl; // Assuming this is the image URL
  }, [photoUrl]);

  if (orientation !== 'horizontal') {
    return (
      <div>
        <img style={{ width: "450px" }} src={photoReq} alt="requirement" />
        <p style={{ fontWeight: "bold" }} >
          Please select a horizontal/landscape picture. Vertical pictures not compatible yet </p></div>
    )
  }
  return (
    <div className="container">

      <ImageView active={1} importEdited={photoUrl} getImageStyle={getImageStyle} currentOptions={editedOptions} editedOptions={currentOptions} />

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
        <button className='submit' onClick={() => handleSubmitPhoto(props.title, photoUrl, currentOptions)}>{props.editMode ? "update" : "submit"}</button>

      </div>
    </div>
  )
}

export default PhotoCreation