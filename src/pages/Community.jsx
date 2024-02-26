import React, { useEffect, useState } from 'react'
import PuzzleCard from '../components/PuzzleCard'
import axios from 'axios';
import '../styles/community.scss';

const Community = () => {

  const API_URL = "https://slider-fun.onrender.com/api";
  const [photos, setPhotos] = useState([]);

  async function fetchAllPhoto() {
    try {
      const response = await axios.get(`${API_URL}/photo/all`);

      if (response.status === 200) {
        setPhotos(response.data)
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
  }, [])

  const puzzleCards = photos.map((puzzle, index) => (
    <PuzzleCard
      key={puzzle.id || index}
      photoUrl={puzzle.imageUrl}
      photoProperties={puzzle.photoProperties}
    />
  ));

  return (
    <div >
      <div className='headerText' style={{ padding: "5px" }} > Community Photo Gallery </div>
      <div className='communityPhotoContainer'> {puzzleCards} </div>
    </div>
  )
}

export default Community