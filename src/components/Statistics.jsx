import React, { useState, useEffect, useRef } from 'react'
import PuzzleCard from './PuzzleCard'
import { removePhoto as removePhotoAPI } from '../context/photoFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPhoto } from '../actions/userAction';

const Statistics = ({ userInfo }) => {
  const dispatch = useDispatch();
  const puzzleHistory = useSelector(state => state.user.photoObjects);
  const hasFetchedPhotosRef = useRef(false);

  useEffect(() => {
    if (userInfo.photos && !hasFetchedPhotosRef.current) {
      hasFetchedPhotosRef.current = true;
      dispatch(fetchUserPhoto(userInfo.photos));
    }
  }, [userInfo, dispatch]);
  // const handleRemovePhoto = async (photoId) => {
  //   try {
  //     await removePhotoAPI(userInfo.id, photoId);
  //     const updatedPuzzleHistory = puzzleHistory.filter(photo => photo.id !== photoId);
  //     setPuzzleHistory(updatedPuzzleHistory);
  //     console.log(photoId, "removed")
  //   } catch (error) {
  //     console.error('Error removing photo:', error);
  //   }
  // };

  const puzzleCards = puzzleHistory.map((puzzle, index) => (
    <PuzzleCard
      key={puzzle.id || index}
      puzzleInfo={puzzle}
      editMode={true}
    // onRemove={() => handleRemovePhoto(puzzle.id)}
    />
  ));

  return (
    <div >
      <div className='headerText' style={{ padding: "5px" }} > {userInfo.username ? userInfo.username : userInfo.email}'s Photo Gallery </div>
      <div className='statisticsContainer'> {puzzleCards} </div>
    </div>
  )
}

export default Statistics