import React from 'react'
import ProgressBar from './ProgressBar'

const PuzzleCard = ({ dailyPuzzle, score, photoProperties, date }) => {
  console.log(dailyPuzzle, score, photoProperties, date)
  return (
    <div className='puzzleCardContainer' >
      {/* <div className='dateHeader'> {dailyPuzzle.date} </div> */}
      <div> <img src={dailyPuzzle.photo} alt="pic" /></div>


      <div className='dateHeader'> {dailyPuzzle.date} </div>
      {/* <div className='scoreHeader'> Score </div> */}
      <div className='scoreDisplay'>
        {/* <div className='scoreHeader'> Score: </div> */}
        <div> {score}%</div>
        <ProgressBar bgcolor="green" completed={score} />
      </div>
    </div>
  )
}

export default PuzzleCard