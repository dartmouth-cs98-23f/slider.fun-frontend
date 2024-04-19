import axios from 'axios';

// Define the base API URL
const API_URL = 'https://slider-fun-backend.onrender.com/api';
// 
// Redux action types
export const ActionTypes = {
  GET_TOP_25_SUCCESS: 'GET_TOP_25_SUCCESS',
};

export const getTop25 = () => async (dispatch) => {
  try {

    const response = await axios.get(`${API_URL}/users/top25`);

    dispatch({
      type: ActionTypes.GET_TOP_25_SUCCESS,
      payload: response.data
    });


  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};
