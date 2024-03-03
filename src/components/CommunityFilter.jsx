import React from 'react'
import { IconTrendingUp } from '@tabler/icons-react';
import { IconLivePhoto } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { setSelectedPhotoList } from '../actions/photoListAction';

const CommunityFilter = () => {
  const dispatch = useDispatch();
  return (
    <span className="communityFilterContainer">
      <div className="communityFilterBar">
        <button className='blackButton' onClick={() => dispatch(setSelectedPhotoList("byLikes"))}>
          <IconTrendingUp />
          <p> Best </p>
        </button>
        <button className='blackButton' onClick={() => dispatch(setSelectedPhotoList("byDate"))}>
          <IconLivePhoto />
          <p> New</p>
        </button>
      </div>
    </span>
  )
}

export default CommunityFilter