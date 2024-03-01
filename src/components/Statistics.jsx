import React, { useEffect, useRef } from 'react'
import PuzzleCard from './PuzzleCard'
import { removePhoto as removePhotoAPI } from '../context/photoFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPhoto } from '../actions/userAction';

const Statistics = ({ userInfo }) => {
  const dispatch = useDispatch();
  const userPhotoList = useSelector(state => state.user.info.photos);
  const puzzleHistory = useSelector(state => state.user.photoObjects);
  const photoObjectsFetched = useSelector(state => state.user.photoObjectsFetched);

  // useEffect(() => {
  //   if (!photoObjectsFetched) {
  //     dispatch(fetchUserPhoto(userInfo.photos));
  //   }
  // }, []);

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

  const puzzleCards = Object.keys(puzzleHistory).map((key, index) => (
    <PuzzleCard
      id={puzzleHistory[key].id || index}
      key={index}
      // puzzleInfo={puzzleHistory[key]}
      photoListLocation="user"
      editMode={true}
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