import React, { useEffect, useRef } from 'react'
import PuzzleCard from '../components/PuzzleCard'
import '../styles/community.scss';
import { useDispatch } from 'react-redux';
import { fetchAllPhoto } from '../actions/photoListAction';
import { useSelector } from 'react-redux';

const Community = () => {
  const dispatch = useDispatch();
  const hasFetchedPhotosRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedPhotosRef.current) {
      hasFetchedPhotosRef.current = true;
      dispatch(fetchAllPhoto());
    }
  }, []);

  const communityPhotoList = useSelector(state => state.photoList.community);

  // const handleRemovePhoto = async (photoId) => {
  //   try {
  //     await deletePhoto(photoId);
  //     const updatedPuzzleHistory = photos.filter(photo => photo.id !== photoId);
  //     // setPhotos(updatedPuzzleHistory);

  //     console.log(photoId, "removed")
  //   } catch (error) {
  //     console.error('Error removing photo:', error);
  //   }
  // };

  const puzzleCards = Object.keys(communityPhotoList).map((key, index) => (
    <PuzzleCard
      puzzleInfo={communityPhotoList[key]}
      id={communityPhotoList[key].id || index}
      key={index}
      photoListLocation="community"
      editMode={false}
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