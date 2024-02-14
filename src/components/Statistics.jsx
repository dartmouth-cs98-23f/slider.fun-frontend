import React, { useState, useEffect } from 'react'
import PuzzleCard from './PuzzleCard'
import axios from 'axios';


const Statistics = ({ username, photoObjectList }) => {
  const [puzzleHistory, setPuzzleHistory] = useState([]);

  // takes a backend photo link and return the photo object
  async function fetchPhoto(link) {
    try {
      const response = await axios.get(`https://slider-fun.onrender.com/api/photo/${link}`);

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

  // useEffect to fetch all photo objects based on photoObjectList (an array of links)
  useEffect(() => {
    async function fetchAllPhotos() {
      const photos = await Promise.all(photoObjectList.map(async (link) => {
        console.log(link)
        const photo = await fetchPhoto(link);
        return photo; // This will be null if there's an error
      }));

      // Filter out any null responses to ensure only successfully fetched photo objects are stored
      setPuzzleHistory(photos.filter(photo => photo !== null));
    }

    fetchAllPhotos();
  }, [photoObjectList]); // Rerun this effect if photoObjectList changes
  console.log(puzzleHistory)

  const puzzleHistory2 = [
    {
      "dailyPuzzle": {
        "photo": "https://firebasestorage.googleapis.com/v0/b/sliderdotfun-3af7a.appspot.com/o/images%2Fbrightness.jpg?alt=media&token=f716b679-5d21-431e-814d-1e8a2e37bffa",
        "date": "January, 2nd"
      },
      "photoProperties": [
        {
          "range": {
            "min": 0,
            "max": 200
          },
          "name": "Brightness",
          "property": "brightness",
          "value": 75,
          "unit": "%",
          "status": true,
          "_id": "654feac4663946fee35a1601",
          "id": "654feac4663946fee35a1601"
        },
        {
          "range": {
            "min": 0,
            "max": 200
          },
          "name": "Contrast",
          "property": "contrast",
          "value": 110,
          "unit": "%",
          "status": true,
          "_id": "654feac4663946fee35a1602",
          "id": "654feac4663946fee35a1602"
        },
        {
          "range": {
            "min": 0,
            "max": 200
          },
          "name": "Saturation",
          "property": "saturate",
          "value": 100,
          "unit": "%",
          "status": true,
          "_id": "654feac4663946fee35a1603",
          "id": "654feac4663946fee35a1603"
        },
        {
          "range": {
            "min": 0,
            "max": 100
          },
          "name": "Grayscale",
          "property": "grayscale",
          "value": 0,
          "unit": "%",
          "status": false,
          "_id": "654feac4663946fee35a1604",
          "id": "654feac4663946fee35a1604"
        },
        {
          "range": {
            "min": 0,
            "max": 100
          },
          "name": "Sepia",
          "property": "sepia",
          "value": 0,
          "unit": "%",
          "status": false,
          "_id": "654feac4663946fee35a1605",
          "id": "654feac4663946fee35a1605"
        },
        {
          "range": {
            "min": 0,
            "max": 360
          },
          "name": "Hue Rotate",
          "property": "hue-rotate",
          "value": 0,
          "unit": "deg",
          "status": false,
          "_id": "654feac4663946fee35a1606",
          "id": "654feac4663946fee35a1606"
        },
        {
          "range": {
            "min": 0,
            "max": 20
          },
          "name": "Blur",
          "property": "blur",
          "value": 0,
          "unit": "px",
          "status": false,
          "_id": "654feac4663946fee35a1607",
          "id": "654feac4663946fee35a1607"
        }
      ],
      "score": "21",

    },
    {
      "dailyPuzzle": {
        "photo": "https://firebasestorage.googleapis.com/v0/b/sliderdotfun-3af7a.appspot.com/o/images%2Fdaily3.jpeg?alt=media&token=faeb4d74-5b3b-4fc4-8c68-e19278a570fe",
        "date": "January, 3rd"
      },
      "score": "95",
      "photoProperties": [
        {
          "range": {
            "min": 0,
            "max": 200
          },
          "name": "Brightness",
          "property": "brightness",
          "value": 75,
          "unit": "%",
          "status": true,
          "_id": "654feac4663946fee35a1601",
          "id": "654feac4663946fee35a1601"
        },
        {
          "range": {
            "min": 0,
            "max": 200
          },
          "name": "Contrast",
          "property": "contrast",
          "value": 110,
          "unit": "%",
          "status": true,
          "_id": "654feac4663946fee35a1602",
          "id": "654feac4663946fee35a1602"
        },
        {
          "range": {
            "min": 0,
            "max": 200
          },
          "name": "Saturation",
          "property": "saturate",
          "value": 100,
          "unit": "%",
          "status": true,
          "_id": "654feac4663946fee35a1603",
          "id": "654feac4663946fee35a1603"
        },
        {
          "range": {
            "min": 0,
            "max": 100
          },
          "name": "Grayscale",
          "property": "grayscale",
          "value": 0,
          "unit": "%",
          "status": false,
          "_id": "654feac4663946fee35a1604",
          "id": "654feac4663946fee35a1604"
        },
        {
          "range": {
            "min": 0,
            "max": 100
          },
          "name": "Sepia",
          "property": "sepia",
          "value": 0,
          "unit": "%",
          "status": false,
          "_id": "654feac4663946fee35a1605",
          "id": "654feac4663946fee35a1605"
        },
        {
          "range": {
            "min": 0,
            "max": 360
          },
          "name": "Hue Rotate",
          "property": "hue-rotate",
          "value": 0,
          "unit": "deg",
          "status": false,
          "_id": "654feac4663946fee35a1606",
          "id": "654feac4663946fee35a1606"
        },
        {
          "range": {
            "min": 0,
            "max": 20
          },
          "name": "Blur",
          "property": "blur",
          "value": 0,
          "unit": "px",
          "status": false,
          "_id": "654feac4663946fee35a1607",
          "id": "654feac4663946fee35a1607"
        }
      ],
    },
  ]

  const puzzleCards = puzzleHistory.map((puzzle, index) => {
    return (
      <PuzzleCard
        key={index}
        photoUrl={puzzle.imageUrl}
        // dailyPuzzle={puzzle.dailyPuzzle}
        photoProperties={puzzle.photoProperties}
      // score={puzzle.score}
      // date={puzzle.date}
      />
    )
  }
  )
  return (
    <div >
      <div className='headerText' style={{ padding: "5px" }} > {username}'s Photo Gallery </div>
      <div className='statisticsContainer'> {puzzleCards} </div>
    </div>
  )
}

export default Statistics