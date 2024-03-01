import axios from 'axios';

// Define the base API URL
const API_URL = 'https://slider-fun.onrender.com/api';


// Redux action types
export const ActionTypes = {
  USER_SIGN_IN_SUCCESS: "USER_SIGN_IN_SUCCESS",
  USER_SIGN_UP_SUCCESS: "USER_SIGN_UP_SUCCESS",
  USER_SIGN_OUT: "USER_SIGN_OUT",
  FETCH_USER_INFO: "FETCH_USER_INFO",
  FETCH_USER_PHOTOLIST: "FETCH_USER_PHOTOLIST",
  FETCH_PHOTO_BY_ID: "FETCH_PHOTO_BY_ID",
  FETCH_PHOTO_BY_ID_SUCCESS: "FETCH_PHOTO_BY_ID_SUCCESS",
  FETCH_USER_PHOTOLIST_SUCCESS: "FETCH_USER_PHOTOLIST_SUCCESS",
  FETCH_USER_PHOTOLIST_ERROR: "FETCH_USER_PHOTOLIST_ERROR",
  POST_USER_PHOTO_SUCCESS: "POST_USER_PHOTO_SUCCESS",
  EDIT_USER_PHOTO_SUCCESS: "EDIT_USER_PHOTO_SUCCESS",
  DELETE_USER_PHOTO_SUCCESS: "DELETE_USER_PHOTO_SUCCESS",
  SET_USER_TOKEN: "SET_USER_TOKEN",
};

// gets the token
export const userSignIn = (email, password) => async (dispatch) => {

  try {
    const response = await axios.post(`${API_URL}/users/signin`, { email, password });

    await dispatch({
      type: ActionTypes.USER_SIGN_IN_SUCCESS,
      payload: response.data.token,
    });

    localStorage.setItem('token', response.data.token);
    await dispatch(getUserInfo(response.data.token));

  } catch (error) {
    console.error('Error signing in:', error);
  }
};

export const userSignUp = (email, userName, password) => async (dispatch) => {
  console.log({ email, userName, password })
  const data = {
    "email": email,
    "userName": userName,
    "name": userName,
    "about": "nothing yet!",
    "password": password
  }
  const response = await axios.post(`${API_URL}/users/new`, data);

  localStorage.setItem('token', response.data.token);
  dispatch({
    type: ActionTypes.USER_SIGN_UP_SUCCESS,
    payload: response.data.token,
  });
};

export const userSignOut = () => async (dispatch) => {

  localStorage.removeItem('token');
  dispatch({
    type: ActionTypes.USER_SIGN_OUT,
  });
};

export const setUserToken = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.SET_USER_TOKEN,
    payload: localStorage.getItem('token'),
  });
};

export const getUserInfo = (token) => async (dispatch) => {

  console.log(token)
  try {
    if (token) {
      // Adjust the URL as needed

      const response = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await dispatch({
        type: ActionTypes.FETCH_USER_INFO,
        payload: response.data
      });

      await dispatch(fetchUserPhoto(response.data.photos));
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }

};


export const fetchUserPhoto = (userPhotoList) => async (dispatch) => {
  if (userPhotoList) {
    for (let i = 0; i < userPhotoList.length; i++) {
      dispatch(fetchPhotoById(userPhotoList[i]));
    }
  }

  dispatch({
    type: ActionTypes.FETCH_USER_PHOTOLIST_SUCCESS,
  });
};

export const fetchPhotoById = (photoID) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/photo/${photoID}`);

    if (response.status === 200) {
      dispatch({
        type: ActionTypes.FETCH_PHOTO_BY_ID_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}


// POST FUNCTIONS 
export const postPhotoToUser = (userId, data) => async (dispatch) => {
  // console.log({ imageUrl, photoProperties })
  try {

    console.log(userId, data)
    const response1 = await axios.post(`${API_URL}/photo/new`, data);

    const d = response1.data.id
    const photoId = { "photoId": d }

    const response2 = await axios.put(`${API_URL}/users/addPhoto/${userId}`, photoId);

    dispatch({
      type: ActionTypes.POST_USER_PHOTO_SUCCESS,
      payload: response2.data
    });


  } catch (error) {
    console.log(error);
  }
}



// PUT FUNCTIONS

// Edit a photo by ID
export const editPhotoById = (photoId, data) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/photo/${photoId}`, data);

    if (response.status === 200) {
      const newResponse = { ...response.data, ...data };
      dispatch({
        type: ActionTypes.EDIT_USER_PHOTO_SUCCESS,
        payload: newResponse
      });
    }

  } catch (error) {
    console.log(error);

  }
}


// Delete a photo object from user and the photo itself
export const removePhotoFromUser = (userId, photoId) => async (dispatch) => {

  try {
    const response = await axios.put(`${API_URL}/users/removePhoto/${userId}`, { photoId });
    console.log(response)

    dispatch({
      type: ActionTypes.DELETE_USER_PHOTO_SUCCESS,
      payload: response.data.id
    });

  } catch (error) {
    console.log(error);
  }

}


