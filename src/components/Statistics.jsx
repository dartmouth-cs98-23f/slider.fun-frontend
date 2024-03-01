import React from 'react'
import PuzzleCard from './PuzzleCard'
import { removePhoto as removePhotoAPI } from '../context/photoFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPhoto } from '../actions/userAction';

const Statistics = ({ userInfo }) => {
  // const dispatch = useDispatch();
  // const userPhotoList = useSelector(state => state.user.info.photos);
  const puzzleHistory = useSelector(state => state.user.photoObjects);
  // const photoObjectsFetched = useSelector(state => state.user.photoObjectsFetched);

  const puzzleCards = Object.keys(puzzleHistory)
    .filter(key => puzzleHistory[key] !== undefined) // Filter out undefined entries
    .map((key, index) => (
      <PuzzleCard
        id={puzzleHistory[key].id || index}
        key={index}
        // puzzleInfo={puzzleHistory[key]}
        photoListLocation="user"
        editMode={true}
      />
    ));

  console.log(puzzleCards);
  return (
    <div >
      <div className='headerText' style={{ padding: "5px" }} > {userInfo.username ? userInfo.username : userInfo.email}'s Photo Gallery </div>
      <div className='statisticsContainer'> {puzzleCards} </div>
    </div>
  )
}

export default Statistics