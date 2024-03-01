import React, { useEffect, useRef } from 'react'
import PuzzleCard from '../components/PuzzleCard'
import '../styles/community.scss';
import { useDispatch } from 'react-redux';
import { fetchAllPhoto, likePhoto } from '../actions/photoListAction';
import { useSelector } from 'react-redux';

const Community = () => {
  const dispatch = useDispatch();
  const hasFetchedPhotosRef = useRef(false);
  const userId = useSelector(state => state.user.info.id);

  useEffect(() => {
    if (!hasFetchedPhotosRef.current) {
      hasFetchedPhotosRef.current = true;
      dispatch(fetchAllPhoto());
    }
  }, []);

  const communityPhotoList = useSelector(state => state.photoList.community);

  const puzzleCards = Object.keys(communityPhotoList).map((key, index) => (
    <PuzzleCard
      puzzleInfo={communityPhotoList[key]}
      id={communityPhotoList[key].id || index}
      key={index}
      photoListLocation="community"
      editMode={false}
      userId={userId}
    />
  ));

  return (
    <div >
      <div className='headerText' style={{ padding: "5px", marginLeft: "60px" }} > Community Gallery </div>
      <div className='communityPhotoContainer'> {puzzleCards} </div>
    </div>
  )
}

export default Community