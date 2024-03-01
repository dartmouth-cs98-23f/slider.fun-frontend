import React, { useEffect, useState } from 'react'
import Game from './Game'
import InfoModal from '../components/InfoModal'
import axios from 'axios'

export const fetchPuzzleOfDay = async () => {
  try {
    const currentDate = new Date();
    // Format the date as YYYY/MM/DD
    const formattedDate = currentDate.toISOString().slice(0, 10);
    console.log(currentDate)
    // console.log(formattedDate);
    const data = {
      "date": formattedDate
    }
    console.log(data)
    // Use the formatted date in your API request
    const response = await axios.get("https://slider-fun.onrender.com/api/dailyPuzzle/byDate", {
      params: {
        date: formattedDate // The date is passed as a query parameter
      }
    });

    // Assuming you want to do something with the response here
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the puzzle of the day:', error);
    // Handle the error appropriately
  }
};


const CURRENT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%',
    status: true,
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%',
    status: true,
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%',
    status: true,
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%',
    status: true,
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%',
    status: true,
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg',
    status: true,
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 1.5
    },
    unit: 'px',
    status: true,
  }
]


// const dHallLink = "https://slider-fun.onrender.com/api/photo/6553e5a2ab042abb281b2661"
// const nycLink = "https://slider-fun.onrender.com/api/photo/6553e6b0ab042abb281b2702"
// const bakerTower = "https://slider-fun.onrender.com/api/photo/65cc7534ef5a21ddc90401e7"

// const links = {
//   "1": dHallLink,
//   "2": nycLink,
//   "3": bakerTower,
// }

const Daily = () => {

  const [dailyPuzzle, setDailyPuzzle] = useState({})

  useEffect(() => {
    const fetchAndSetPuzzle = async () => {
      try {
        const dailyPuzzleTemp = await fetchPuzzleOfDay();

        console.log(dailyPuzzleTemp);
        if (dailyPuzzleTemp) {
          setDailyPuzzle(dailyPuzzleTemp);
        }
      } catch (error) {
        console.error('Failed to fetch daily puzzle:', error);

      }
    };

    fetchAndSetPuzzle();
  }, [])

  const [isModalVisible, setIsModalVisible] = useState(true);

  const closeModal = () => {
    setIsModalVisible(false)
  };

  const openModal = () => {
    setIsModalVisible(true)
  };

  return (
    <div>
      {isModalVisible && <div className="modal-overlay"></div>}
      <InfoModal isModalVisible={isModalVisible} daily={true} closeModal={closeModal} openModal={openModal} />
      {dailyPuzzle.photo &&
        <Game
          stageOptions={CURRENT_OPTIONS}
          closeModal={closeModal}
          openModal={openModal}
          pic_link={dailyPuzzle.photo ? `https://slider-fun.onrender.com/api/photo/${dailyPuzzle.photo}` : null}
          daily={true}
        />}
    </div>
  )
}

export default Daily