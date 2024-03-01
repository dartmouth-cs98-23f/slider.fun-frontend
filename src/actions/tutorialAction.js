import axios from 'axios';

// Define the base API URL
const API_URL = 'https://slider-fun.onrender.com/api';

// Redux action types
export const ActionTypes = {

  GO_TO_SPECIFIC_STAGE: 'GO_TO_SPECIFIC_STAGE',
  UPDATE_SCORES: 'UPDATE_SCORES',
};

export const goToSpecificStage = (index) => async (dispatch) => {
  dispatch({
    type: ActionTypes.GO_TO_SPECIFIC_STAGE,
    payload: index,
  });
};

export const updateScores = (indexToUpdate, newScore) => async (dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_SCORES,
    payload: { indexToUpdate, newScore },
  });
};