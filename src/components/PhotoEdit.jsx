import React, { useState, useEffect } from 'react'
import Slider from './Slider'
import "../App.scss";
import ImageView from './ImageView';
import { getImageStyle } from './Scoring';
import { defaultSlider } from './Slider';
import photoReq from '../assets/photoReq.png';
import $ from 'jquery';
import side2side from "../assets/SideToSideSplit.png";
import verticalSplit from "../assets/VerticalSplit.png";
import horizontalSplit from "../assets/HorizontalSplit.png";
import { useDispatch } from 'react-redux';
import { editPhotoById, removePhotoFromUser } from '../actions/userAction';
import "../styles/game.scss";

const PhotoEdit = (props) => {
  const puzzleInfo = props.puzzleInfo;

  const [title, setTitle] = useState(puzzleInfo.title)

  const dispatch = useDispatch();
  const DEFAULT_OPTIONS = defaultSlider;
  const [active, setActive] = useState(1);

  const [modifiedPhotoProperties, setModifiedPhotoProperties] = useState(props.puzzleInfo ? props.puzzleInfo.photoProperties : DEFAULT_OPTIONS);

  const [originalPhotoProperties] = useState(DEFAULT_OPTIONS)
  const setMessageVisability = props.setMessageVisability;
  const photoUrl = props.photoUrl;

  function handleSliderChange(propertyIndex, { target }) {
    const newSliderValues = modifiedPhotoProperties.map((option, index) => {
      if (index !== propertyIndex) {
        return option;
      }
      return { ...option, value: target.value };
    });

    // sets the local sliders to the new value 
    setModifiedPhotoProperties(newSliderValues)
  }

  async function handleEditPhoto(title, photoProperties) {
    const data = {
      "title": title,
      "photoProperties": photoProperties,
    }

    try {
      await dispatch(editPhotoById(props.puzzleInfo.id, data));
      props.closeModal();
    } catch (error) {
      console.error('Error submitting photo:', error);
    }
  }

  const SetView = (active) => {
    $('.viewButtonS2S, .viewButtonVS, .viewButtonHS').removeClass('selected');
    if (active === 1) {
      $('.viewButtonS2S').addClass('selected');
    } else if (active === 2) {
      $('.viewButtonVS').addClass('selected');
    } else if (active === 3) {
      $('.viewButtonHS').addClass('selected');
    }
    setActive(active);
  };

  const [orientation, setOrientation] = useState('horizontal');
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      // Determine if the image is vertical or horizontal
      setOrientation(img.width > img.height ? 'horizontal' : 'vertical');
    };
    img.src = photoUrl;
  }, [photoUrl]);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  async function handleDelete(authorId, photoId) {
    try {
      dispatch(removePhotoFromUser(authorId, photoId))
      props.closeModal();

    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  }

  const handleSubmit = async (title, photoProperties) => {
    props.closeModal();
  }

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
      {props.editMode ?
        <div id="editFields">
          <div>
            <label htmlFor="photoTitle"> Title: </label>
            <input type="text" id="photoTitle" name="photoTitle" value={title} onChange={handleChange} />
          </div>
          <button className="red" onClick={() => handleDelete(props.userId, puzzleInfo.id)}> Delete Photo</button>
        </div> :
        <div>
          <h2 htmlFor="photoTitle"> {title} </h2>
        </div>
      }

      <ImageView active={active} importEdited={photoUrl} getImageStyle={getImageStyle} currentOptions={originalPhotoProperties} editedOptions={modifiedPhotoProperties} />
      <div className='viewButtonsContainer'>
        <p> View: &nbsp;&nbsp;&nbsp;</p>
        <img onClick={() => SetView(1)} className='viewButtonS2S selected' src={side2side} alt="card" />
        <img onClick={() => SetView(2)} className='viewButtonVS ' src={verticalSplit} alt="card" />
        <img onClick={() => SetView(3)} className='viewButtonHS ' src={horizontalSplit} alt="card" />
      </div>

      <div className='slidersContainer'>
        {modifiedPhotoProperties.map((option, index) => (
          <Slider
            key={index}
            name={option.name}
            min={option.range.min}
            max={option.range.max}
            value={option.value}
            status={true}
            handleChange={(event) => handleSliderChange(index, event)}
            step={0.1}
          />
        ))}
      </div>
      <div className='actionButtons'>
        {props.editMode ?
          <button className='submit' onClick={() => handleEditPhoto(title, modifiedPhotoProperties)}>
            update
          </button>
          :
          <button className='submit' onClick={() => handleSubmit(title, modifiedPhotoProperties)}>
            submit
          </button>
        }
      </div>
    </div>
  )
}

export default PhotoEdit