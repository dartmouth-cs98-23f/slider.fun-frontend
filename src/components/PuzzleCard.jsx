import React from 'react'
import { getImageStyle } from './Scoring'
// import ProgressBar from './ProgressBar'

const PuzzleCard = ({ photoUrl, photoProperties, onRemove }) => {


  return (
    <div className='puzzleCardContainer' >
      {/* <div className='dateHeader'> {dailyPuzzle.date} </div> */}
      <div> <img src={photoUrl} alt="pic" style={getImageStyle(photoProperties)} /></div>


      {/* <div className='dateHeader'> 2/2/2 </div> */}
      {/* <div className='scoreHeader'> Score </div> */}
      <div className='scoreDisplay'>
        {/* <button onClick={onRemove}>Remove Photo</button> */}
        {/* <div className='scoreHeader'> Score: </div> */}
        {/* <div> {11}%</div> */}
        {/* <ProgressBar bgcolor="green" completed={11} /> */}
      </div>
    </div>
  )
}

export default PuzzleCard