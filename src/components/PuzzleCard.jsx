import React from 'react'
import { getImageStyle } from './Scoring'
import '../styles/puzzleCard.scss'
// import ProgressBar from './ProgressBar'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PuzzleCard = ({ photoUrl, photoProperties, onRemove, authorId }) => {


  return (
    <div className='puzzleCardContainer' >
      {/* <div className='dateHeader'> {dailyPuzzle.date} </div> */}
      <div>
        <LazyLoadImage
          alt={"Puzzle image"}
          src={photoUrl}
          effect="blur"
          style={getImageStyle(photoProperties)}
        />

        {/* <img src={photoUrl} loading="lazy" alt="pic" style={getImageStyle(photoProperties)} /> */}
      </div>
      {/* <div className='dateHeader'> 2/2/2 </div> */}
      {/* <div className='scoreHeader'> Score </div> */}
      <div className='scoreDisplay'>
        {/* <button onClick={onRemove}>Remove Photo</button> */}
        {authorId && <div className='scoreHeader'> {authorId} </div>}
        {/* <div> {11}%</div> */}
        {/* <ProgressBar bgcolor="green" completed={11} /> */}
      </div>
    </div>
  )
}

export default PuzzleCard