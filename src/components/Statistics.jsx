import React, { useState, useEffect } from 'react'
import PuzzleCard from './PuzzleCard'
import axios from 'axios';
import { removePhoto as removePhotoAPI } from '../context/photoFunctions'; // Renamed for clarity


const Statistics = ({ userInfo }) => {
  const API_URL = "https://slider-fun.onrender.com/api";
  const [puzzleHistory, setPuzzleHistory] = useState([]);

  // takes a backend photo link and return the photo object
  async function fetchPhoto(link) {
    try {
      const response = await axios.get(`${API_URL}/photo/${link}`);

      if (response.status === 200) {
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

  const handleRemovePhoto = async (photoId) => {
    try {
      await removePhotoAPI(userInfo.id, photoId);
      const updatedPuzzleHistory = puzzleHistory.filter(photo => photo.id !== photoId);
      setPuzzleHistory(updatedPuzzleHistory);
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };


  // useEffect to fetch all photo objects based on photoObjectList (an array of links)
  useEffect(() => {
    async function fetchAllPhotos() {
      const photos = await Promise.all(userInfo.photos.map(async (link) => {
        // console.log(link)
        const photo = await fetchPhoto(link);
        return photo; // This will be null if there's an error
      }));

      // Filter out any null responses to ensure only successfully fetched photo objects are stored
      setPuzzleHistory(photos.filter(photo => photo !== null));
    }
    fetchAllPhotos();

  }, [userInfo.photos]);

  const puzzleCards = puzzleHistory.map((puzzle, index) => (
    <PuzzleCard
      key={puzzle.id || index}
      photoUrl={puzzle.imageUrl}
      photoProperties={puzzle.photoProperties}
      onRemove={() => handleRemovePhoto(puzzle.id)}
    />
  ));

  return (
    <div >
      <div className='headerText' style={{ padding: "5px" }} > {userInfo.email}'s Photo Gallery </div>
      <div className='statisticsContainer'> {puzzleCards} </div>
    </div>
  )
}

export default Statistics