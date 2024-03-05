import axios from 'axios';

// Define the base API URL
const API_URL = 'https://slider-fun.onrender.com/api';

// Redux action types
export const ActionTypes = {
  SET_HOW_TO_PLAY_DISPLAY: 'SET_HOW_TO_PLAY_DISPLAY',
  FETCH_PUZZLE_OF_DAY_SUCCCSS: 'FETCH_PUZZLE_OF_DAY_SUCCCSS',
};

export const setHasHowtoPlayShown = (displayStatus) => async (dispatch) => {
  dispatch({
    type: ActionTypes.SET_HOW_TO_PLAY_DISPLAY,
    payload: displayStatus
  });
}

export const fetchPuzzleOfDay = () => async (dispatch) => {
  try {
    const moment = require('moment-timezone')

    // For just the date part in 'YYYY-MM-DD' format
    let formattedDateInEST = moment().tz("America/New_York").format('YYYY-MM-DD');


    const response = await axios.get(`${API_URL}/dailyPuzzle/byDate`, {
      params: {
        date: formattedDateInEST
      }
    });

    dispatch({
      type: ActionTypes.FETCH_PUZZLE_OF_DAY_SUCCCSS,
      payload: response.data
    });

  } catch (error) {
    console.error('There was an error fetching the puzzle of the day:', error);
  }
};

export const defaultPhotoProperties = [
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
      max: 0.5
    },
    unit: 'px',
    status: true,
  }];