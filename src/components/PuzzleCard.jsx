import React from 'react'

const PuzzleCard = ({ dailyPuzzle, score, photoProperties, date }) => {
  console.log(dailyPuzzle, score, photoProperties, date)
  return (
    <div className='puzzleCardContainer' >
      <div> {dailyPuzzle.date} </div>
      <div> <img src={dailyPuzzle.photo} alt="pic" /></div>

      <div> {score}</div>
    </div>
  )
}

export default PuzzleCard