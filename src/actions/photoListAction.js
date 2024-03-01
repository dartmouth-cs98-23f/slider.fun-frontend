import axios from 'axios';

// Define the base API URL
const API_URL = 'https://slider-fun.onrender.com/api';

// Redux action types
export const ActionTypes = {
  FETCH_PHOTOLIST_SUCCESS: 'FETCH_PHOTOLIST_SUCCESS',
  FETCH_PHOTOLIST_ERROR: 'FETCH_PHOTOLIST_ERROR',
  POST_PHOTO: 'POST_PHOTO',
  EDIT_PHOTO: "EDIT_PHOTO",
  REMOVE_PHOTO: "REMOVE_PHOTO",
  FETCH_USER_PHOTO_LIST: "FETCH_USER_PHOTO_LIST",
  GET_PHOTO_LIKES_SUCCESS: 'GET_PHOTO_LIKES_SUCCESS',
  PHOTO_LIKE_SUCCESS: 'PHOTO_LIKE_SUCCESS',
  REMOVE_PHOTO_LIKE_SUCCESS: 'REMOVE_PHOTO_LIKE_SUCCESS',
};

export const fetchAllPhoto = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/photo/all`);

    if (response.status === 200) {
      const photoObjectList = response.data.reduce((acc, photo) => {
        acc[photo.id] = photo;
        return acc;
      }, {});

      dispatch({
        type: ActionTypes.FETCH_PHOTOLIST_SUCCESS,
        payload: photoObjectList,
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


//  PUT FUNCTIONS  //


export const postPhoto = (data, userId) => async (dispatch) => {
  dispatch({ type: ActionTypes.POST_PHOTO });

  try {
    const response = await axios.post(`${API_URL}/photo/new`, data);
    const photoId = response.data.id;
    await axios.put(`${API_URL}/users/addPhoto/${userId}`, { "photoId": photoId });

  } catch (error) {
    console.error('Error posting new photo:', error);
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

// Action creator for removing a photo from user
export const removePhoto = (userId, photoId) => async (dispatch) => {
  dispatch({ type: ActionTypes.REMOVE_PHOTO });

  try {
    await axios.put(`${API_URL}/users/removePhoto/${userId}`, { "photoId": photoId });
  } catch (error) {
    console.error('Error removing photo:', error);
  }
};


export const likePhoto = (photoId, userId) => async (dispatch) => {
  // console.log(photoId, { userId })
  try {
    const response = await axios.put(`${API_URL}/photo/addLike/${photoId}`, { userId });

    dispatch({
      type: ActionTypes.PHOTO_LIKE_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    console.error('Error liking photo:', error);
  }
}

export const removeLikeFromPhoto = (photoId, userId) => async (dispatch) => {
  // console.log(photoId, { userId })
  try {
    const response = await axios.put(`${API_URL}/photo/removeLike/${photoId}`, { userId });

    dispatch({
      type: ActionTypes.REMOVE_PHOTO_LIKE_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    console.error('Error removing like from photo:', error);
  }
}
