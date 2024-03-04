import React from 'react'
import { IconTrendingUp } from '@tabler/icons-react';
import { IconLivePhoto } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedPhotoList } from '../actions/photoListAction';

const CommunityFilter = () => {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.photoList.selected);
  return (
    <span className="communityFilterContainer">
      <div className="communityFilterBar">
        <button className={`blackButton ${selected === "byLikes" ? "selected" : ""}`} onClick={() => dispatch(setSelectedPhotoList("byLikes"))}>
          <IconTrendingUp />
          <p> Best </p>
        </button>
        <button className={`blackButton ${selected === "byDate" ? "selected" : ""}`} onClick={() => dispatch(setSelectedPhotoList("byDate"))}>
          <IconLivePhoto />
          <p> New</p>
        </button>
      </div>
    </span>
  )
}

export default CommunityFilter