import React from 'react'
import PhotoCard from './PhotoCard'
import { useSelector } from 'react-redux';

const UserCompletedDaily = ({ userInfo }) => {
  const puzzleHistory = useSelector(state => state.user.info.dailyPuzzles);
  console.log(puzzleHistory)


  const filteredPuzzleHistory = puzzleHistory.filter(element => element !== null);

  const puzzleCards = Object.keys(filteredPuzzleHistory)
    .filter(key => puzzleHistory[key] !== undefined && puzzleHistory[key] !== null)
    .map((key, index) => (
      <PhotoCard
        id={puzzleHistory[key].id || index}
        key={index}
        puzzleInfo={puzzleHistory[key]}
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

export default UserCompletedDaily