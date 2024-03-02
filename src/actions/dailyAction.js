// import axios from 'axios';

// Define the base API URL
// const API_URL = 'https://slider-fun.onrender.com/api';

// Redux action types
export const ActionTypes = {
  SET_HOW_TO_PLAY_DISPLAY: 'SET_HOW_TO_PLAY_DISPLAY',
};

export const setHasHowtoPlayShown = (displayStatus) => async (dispatch) => {
  dispatch({
    type: ActionTypes.SET_HOW_TO_PLAY_DISPLAY,
    payload: displayStatus
  });
}