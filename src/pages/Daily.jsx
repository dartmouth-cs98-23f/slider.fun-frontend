import React, { useEffect, useState } from 'react'
import Game from './Game'
import InfoModal from '../components/InfoModal'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setHasHowtoPlayShown } from '../actions/dailyAction'

export const fetchPuzzleOfDay = async () => {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);

    const response = await axios.get("https://slider-fun.onrender.com/api/dailyPuzzle/byDate", {
      params: {
        date: formattedDate
      }
    });

    return response.data;
  } catch (error) {
    console.error('There was an error fetching the puzzle of the day:', error);
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
const Daily = () => {
  const [dailyPuzzle, setDailyPuzzle] = useState({})
  const dispatch = useDispatch();

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
  const hasHowtoPlayShown = useSelector((state => state.daily.hasHowtoPlayShown));

  const [isModalVisible, setIsModalVisible] = useState(!hasHowtoPlayShown);

  const closeModal = () => {
    setIsModalVisible(false)
    dispatch(setHasHowtoPlayShown(true));
  };

  const openModal = () => {
    setIsModalVisible(true)
  };

  return (
    <div>
      {isModalVisible && <div className="modal-overlay" onClick={() => closeModal()}></div>}
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