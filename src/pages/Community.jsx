import React, { useEffect, useState } from 'react'
import PuzzleCard from '../components/PuzzleCard'
import axios from 'axios';
import '../styles/community.scss';
import { DeletePhoto } from '../context/photoFunctions';

const Community = () => {

  const API_URL = "https://slider-fun.onrender.com/api";
  const [photos, setPhotos] = useState([]);

  async function fetchAllPhoto() {
    try {
      const response = await axios.get(`${API_URL}/photo/all`);

      if (response.status === 200) {
        setPhotos(response.data)
        console.log(response.data)
        return response.data; // This will contain the data returned from the server
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return null;
      }

    } catch (error) {
      console.error('There was an error fetching the photo:', error);
      return null;
    }
  }

  useEffect(() => {
    fetchAllPhoto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRemovePhoto = async (photoId) => {
    try {
      await DeletePhoto(photoId);
      const updatedPuzzleHistory = photos.filter(photo => photo.id !== photoId);
      setPhotos(updatedPuzzleHistory);
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
    <div >
      <div className='headerText' style={{ padding: "5px", marginLeft: "60px" }} > Community Gallery </div>
      <div className='communityPhotoContainer'> {puzzleCards} </div>
    </div>
  )
}

export default Community