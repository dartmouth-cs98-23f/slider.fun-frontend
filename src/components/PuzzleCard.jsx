import React from 'react'
import { getImageStyle } from './Scoring'
import '../styles/puzzleCard.scss'
// import ProgressBar from './ProgressBar'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IconCameraHeart } from '@tabler/icons-react';

const PuzzleCard = ({ photoUrl, photoProperties, onRemove, authorId, likes, photoTitle }) => {


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
      <div className='scoreDisplay'>
        {/* <button onClick={onRemove}>Remove Photo</button> */}
        <div>
          {photoTitle ? <div className='photoTitle'> {photoTitle} </div> : <div className='photoTitle'> Unnamed </div>}
          {authorId ? <div className='scoreHeader'> {authorId} </div> : <div className='scoreHeader'> Default </div>}
        </div>
        <div className='rightSidePuzzleStats'>
          <IconCameraHeart className='heartIcon' />
          <div>: {likes !== null ? 0 : likes} </div>
        </div>
        {/* <ProgressBar bgcolor="green" completed={11} /> */}
      </div>
    </div>
  )
}

export default PuzzleCard