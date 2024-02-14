import React from 'react'
import ProgressBar from './ProgressBar'

const PuzzleCard = ({ photoUrl, photoProperties }) => {
  // console.log(dailyPuzzle, score, photoProperties, date)
  return (
    <div className='puzzleCardContainer' >
      {/* <div className='dateHeader'> {dailyPuzzle.date} </div> */}
      <div> <img src={photoUrl} alt="pic" /></div>


      <div className='dateHeader'> 2/2/2 </div>
      {/* <div className='scoreHeader'> Score </div> */}
      <div className='scoreDisplay'>
        {/* <div className='scoreHeader'> Score: </div> */}
        <div> {11}%</div>
        <ProgressBar bgcolor="green" completed={11} />
      </div>
    </div>
  )
}

export default PuzzleCard