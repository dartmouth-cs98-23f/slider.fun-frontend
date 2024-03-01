import axios from 'axios';

// Define the base API URL
const API_URL = 'https://slider-fun.onrender.com/api';

// Redux action types
export const ActionTypes = {
  FETCH_USER_INFO: "FETCH_USER_INFO",
  USER_SIGN_IN_SUCCESS: "USER_SIGN_IN_SUCCESS",
  USER_SIGN_UP_SUCCESS: "USER_SIGN_UP_SUCCESS",
  USER_SIGN_OUT: "USER_SIGN_OUT",
  FETCH_USER_PHOTOLIST: "FETCH_USER_PHOTOLIST",
  FETCH_PHOTO_BY_ID: "FETCH_PHOTO_BY_ID",
  FETCH_PHOTO_BY_ID_SUCCESS: "FETCH_PHOTO_BY_ID_SUCCESS",
  FETCH_USER_PHOTOLIST_SUCCESS: "FETCH_USER_PHOTOLIST_SUCCESS",
  FETCH_USER_PHOTOLIST_ERROR: "FETCH_USER_PHOTOLIST_ERROR",
};

// gets the token
export const userSignIn = (email, password) => async (dispatch) => {
  const response = await axios.post(`${API_URL}/users/signin`, { email, password });

  dispatch({
    type: ActionTypes.USER_SIGN_IN_SUCCESS,
    payload: response.data,
  });
};

export const signUp = (email, userName, password) => async (dispatch) => {
  console.log({ email, userName, password })
  const data = {
    "email": email,
    "userName": userName,
    "name": userName,
    "about": "nothing yet!",
    "password": password
  }
  const response = await axios.post(`${API_URL}/users/new`, data);
  dispatch({
    type: ActionTypes.USER_SIGN_UP_SUCCESS,
    payload: response.data,
  });
};

export const userSignOut = () => async (dispatch) => {
  dispatch({
    type: ActionTypes.USER_SIGN_OUT,
  });
};

export const getUserInfo = (token) => async (dispatch) => {
  try {
    if (!token) {
      throw new Error('No token found');
    }
    // Adjust the URL as needed
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({
      type: ActionTypes.FETCH_USER_INFO,
      payload: response.data
    });

  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }

};


export const fetchUserPhoto = (userPhotoList) => async (dispatch) => {
  for (let i = 0; i < userPhotoList.length; i++) {
    dispatch(fetchPhotoById(userPhotoList[i]));
  }
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
    console.log(error)
  }
}


