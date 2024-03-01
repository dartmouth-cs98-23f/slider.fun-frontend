import React from 'react'
import PuzzleCard from './PuzzleCard'
import { useSelector } from 'react-redux';

const Statistics = ({ userInfo }) => {

  const puzzleHistory = useSelector(state => state.user.photoObjects);

  const puzzleCards = Object.keys(puzzleHistory)
    .filter(key => puzzleHistory[key] !== undefined)
    .map((key, index) => (
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
      <div className='headerText' style={{ padding: "5px" }} > {userInfo.userName ? userInfo.userName : userInfo.email}'s Photo Gallery </div>
      <div className='statisticsContainer'> {puzzleCards} </div>
    </div>
  )
}

export default Statistics