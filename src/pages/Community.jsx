import React, { useEffect } from 'react'
import PuzzleCard from '../components/PuzzleCard'
import '../styles/community.scss';
import { useDispatch } from 'react-redux';
import { deletePhoto } from '../context/photoFunctions';
import { fetchAllPhoto } from '../actions';
import { useSelector } from 'react-redux';

const Community = () => {
  const dispatch = useDispatch();
  // const API_URL = "https://slider-fun.onrender.com/api";
  const photos = useSelector(state => state.photoList);

  useEffect(() => {
    console.log("fetch")
    dispatch(fetchAllPhoto());
  }, [dispatch]);

  const handleRemovePhoto = async (photoId) => {
    try {
      await deletePhoto(photoId);
      const updatedPuzzleHistory = photos.filter(photo => photo.id !== photoId);
      // setPhotos(updatedPuzzleHistory);
      console.log(photoId, "removed")
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };

  const puzzleCards = photos.map((puzzle, index) => (
    <PuzzleCard
      puzzleInfo={puzzle}
      key={puzzle.id || index}
      onRemove={() => handleRemovePhoto(puzzle.id)}
    />
  ));

  return (
    <div>
      <div className='communityPhotoContainer'> {puzzleCards} </div>
    </div>
  )
}

export default Community