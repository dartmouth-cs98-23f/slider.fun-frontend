import React, { useState, useEffect } from 'react'
import { getImageStyle } from './Scoring'
import '../styles/puzzleCard.scss'
// import ProgressBar from './ProgressBar'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IconCameraHeart } from '@tabler/icons-react';
import axios from 'axios';
import GameModal from './GameModal';
import { useDispatch, useSelector } from 'react-redux';
import { likePhoto, removeLikeFromPhoto } from '../actions/photoListAction';

const PuzzleCard = ({ id, photoListLocation, editMode, userId, openSignUpModal, closeSignUpModal }) => {
  const puzzleInfo = useSelector(photoListLocation === "user" ? state => state.user.photoObjects[id] : state => state.photoList.community[id])
  const photoTitle = puzzleInfo.title;
  const photoUrl = puzzleInfo.imageUrl;
  const photoProperties = puzzleInfo.photoProperties;
  const likes = puzzleInfo.likedBy.length;
  const authorId = puzzleInfo.authorId;
  const [isModalVisible, setIsModalVisible] = useState(false)
  const dispatch = useDispatch();


  const API_URL = "https://slider-fun.onrender.com/api";
  const [username, setUsername] = useState(false);

  async function fetchUsernameFromId() {
    try {
      const response = await axios.get(`${API_URL}/users/username/${authorId}`);
      if (response.status === 200) {
        setUsername(response.data)
        return response.data;
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return null;
      }

    } catch (error) {
      console.error('There was an error fetching the photo:', error);
      return null;
    }
  }

  useEffect(() => {
    fetchUsernameFromId(authorId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorId])

  const closeModal = () => {
    console.log("close")
    setIsModalVisible(false)
  };

  const openModal = () => {
    console.log("open")
    setIsModalVisible(true)
  }

  const handleAddingLike = async (photoId) => {
    if (localStorage.getItem('token') !== null) {
      if (puzzleInfo.likedBy.indexOf(userId) === -1) {
        console.log(photoId, userId)
        dispatch(likePhoto(photoId, userId));
      } else {
        dispatch(removeLikeFromPhoto(photoId, userId))
      }
    } else {
      openSignUpModal()
    }
  }

  return (
    <div className='puzzleCardContainer' >
      {isModalVisible &&
        <GameModal
          puzzleInfo={puzzleInfo}
          isModalVisible={isModalVisible}
          closeModal={closeModal}
          editMode={editMode}
          username={username}
        />}

      <div o>
        <LazyLoadImage
          alt={"Puzzle image"}
          src={photoUrl}
          effect="blur"
          style={getImageStyle(photoProperties)}
        />

      </div>
      <div className='scoreDisplay'>
        <div>
          {photoTitle ? <div className='photoTitle'> {photoTitle} </div> : <div className='photoTitle'> Unnamed </div>}
          {username ? <div className='scoreHeader'> {username} </div> : <div className='scoreHeader'> Default </div>}
        </div>
        <div className={`rightSidePuzzleStats ${puzzleInfo.likedBy.indexOf(userId) === -1 ? 'default' : 'redLike'}`} onClick={() => (handleAddingLike(id))}>
          <IconCameraHeart className='heartIcon' />
          <div>: {likes ? likes : 0} </div>
        </div>
      </div>
    </div>
  )
}

export default PuzzleCard