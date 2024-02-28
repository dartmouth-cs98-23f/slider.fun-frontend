import axios from 'axios';

// Define the base API URL
const API_URL = 'https://slider-fun.onrender.com/api';

// Redux action types
export const ActionTypes = {
  FETCH_PHOTOLIST: 'FETCH_PHOTOLIST',
  FETCH_PHOTOLIST_SUCCESS: 'FETCH_PHOTOLIST_SUCCESS',
  FETCH_PHOTOLIST_ERROR: 'FETCH_PHOTOLIST_ERROR',
  POST_PHOTO: 'POST_PHOTO',
  EDIT_PHOTO: "EDIT_PHOTO",
  REMOVE_PHOTO: "REMOVE_PHOTO",
  FETCH_USER_PHOTO_LIST: "FETCH_USER_PHOTO_LIST"
};

// Redux thunk action creator for fetching all photos
export const fetchAllPhoto = () => async (dispatch) => {
  dispatch({ type: ActionTypes.FETCH_PHOTOLIST });

  try {
    const response = await axios.get(`${API_URL}/photo/all`);
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.FETCH_PHOTOLIST_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: ActionTypes.FETCH_PHOTOLIST_ERROR,
        payload: `Error: ${response.status} - ${response.statusText}`,
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.FETCH_PHOTOLIST_ERROR,
      payload: 'There was an error fetching the photos: ' + error,
    });
  }
};

// Action creator for posting a new photo
export const postPhoto = (data, userId) => async (dispatch) => {
  dispatch({ type: ActionTypes.POST_PHOTO });

  try {
    const response = await axios.post(`${API_URL}/photo/new`, data);
    const photoId = response.data.id;
    await axios.put(`${API_URL}/users/addPhoto/${userId}`, { "photoId": photoId });

    // Re-fetch photos or dispatch another action as needed
    // For example, you could dispatch a success action here
  } catch (error) {
    console.error('Error posting new photo:', error);
    // Optionally, dispatch an error action here
  }
};

// Action creator for editing a photo
export const editPhoto = (photoId, data) => async (dispatch) => {
  dispatch({ type: ActionTypes.EDIT_PHOTO });

  try {
    await axios.put(`${API_URL}/photo/${photoId}`, data);
    // Dispatch success or re-fetch photos as needed
  } catch (error) {
    console.error('Error editing photo:', error);
    // Optionally, dispatch an error action here
  }
};

// Action creator for removing a photo
export const removePhoto = (userId, photoId) => async (dispatch) => {
  dispatch({ type: ActionTypes.REMOVE_PHOTO });

  try {
    await axios.put(`${API_URL}/users/removePhoto/${userId}`, { "photoId": photoId });
    // Optionally, follow up with any state updates or fetches
  } catch (error) {
    console.error('Error removing photo:', error);
    // Optionally, dispatch an error action here
  }
};

// Function to delete a photo object from the database
export const deletePhoto = async (photoId) => {
  await axios.delete(`${API_URL}/photo/${photoId}`);
};


