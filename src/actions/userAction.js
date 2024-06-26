import axios from 'axios';

// Define the base API URL
const API_URL = 'https://slider-fun-backend.onrender.com/api';


// Redux action types
export const ActionTypes = {
  USER_SIGN_IN_SUCCESS: "USER_SIGN_IN_SUCCESS",
  USER_SIGN_UP_SUCCESS: "USER_SIGN_UP_SUCCESS",
  USER_SIGN_OUT: "USER_SIGN_OUT",
  SET_USER_INFO: "SET_USER_INFO",
  FETCH_USER_INFO: "FETCH_USER_INFO",
  FETCH_USER_PHOTOLIST: "FETCH_USER_PHOTOLIST",
  FETCH_PHOTO_BY_ID: "FETCH_PHOTO_BY_ID",
  FETCH_PHOTO_BY_ID_SUCCESS: "FETCH_PHOTO_BY_ID_SUCCESS",
  FETCH_USER_PHOTOLIST_SUCCESS: "FETCH_USER_PHOTOLIST_SUCCESS",
  FETCH_USER_PHOTOLIST_ERROR: "FETCH_USER_PHOTOLIST_ERROR",
  POST_USER_PHOTO_SUCCESS: "POST_USER_PHOTO_SUCCESS",
  EDIT_USER_PHOTO_SUCCESS: "EDIT_USER_PHOTO_SUCCESS",
  PUT_USER_SLIDER_SCORE_SUCCESS: "PUT_USER_SLIDER_SCORE_SUCCESS",
  DELETE_USER_PHOTO_SUCCESS: "DELETE_USER_PHOTO_SUCCESS",
  SET_USER_TOKEN: "SET_USER_TOKEN",
  USER_DAILY_COMPLETED: "USER_DAILY_COMPLETED",
  HANDLE_DAILY_SUCCESS: "HANDLE_DAILY_SUCCESS",
  ADD_DAILY_TO_USER_SUCCESS: "ADD_DAILY_TO_USER_SUCCESS",
  FETCH_USER_PUZZLES_SUCCESS: "FETCH_USER_PUZZLES_SUCCESS",
  FETCH_PUZZLE_BY_ID_SUCCESS: "FETCH_PUZZLE_BY_ID_SUCCESS",
  HANDLE_PHOTO_PLAY_SUCCESS: "HANDLE_PHOTO_PLAY_SUCCESS",
};


// gets the token
export const userSignIn = (email, password) => async (dispatch) => {

  // try {
  const response = await axios.post(`${API_URL}/users/signin`, { email, password });

  await dispatch({
    type: ActionTypes.USER_SIGN_IN_SUCCESS,
    payload: response.data.token,
  });

  localStorage.setItem('token', response.data.token);
  await dispatch(getUserInfo(response.data.token));

  // } catch (error) {
  //   console.error('Error signing in:', error);
  // }
};

export const userSignUp = (email, userName, password, sliderScore) => async (dispatch) => {
  // console.log({ email, userName, password })
  const data = {
    "email": email,
    "userName": userName,
    "name": userName,
    "about": "nothing yet!",
    "password": password,
    "sliderScore": sliderScore,
  }

  const response = await axios.post(`${API_URL}/users/new`, data);

  localStorage.setItem('token', response.data.token);
  await dispatch({
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

export const setUserInfo = (data) => async (dispatch) => {
  dispatch({
    type: ActionTypes.SET_USER_INFO,
    payload: data
  });
};

export const getUserInfo = (token) => async (dispatch) => {
  try {
    if (token) {
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
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
  try {
    const response1 = await axios.post(`${API_URL}/photo/new`, data);
    // should do a dispatch here for photo object creation but oh well

    const d = response1.data.id
    const photoId = { "photoId": d }

    await axios.put(`${API_URL}/users/addPhoto/${userId}`, photoId);

    dispatch({
      type: ActionTypes.POST_USER_PHOTO_SUCCESS,
      payload: response1.data
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

export const addDailyPuzzleSScore = (userId, count) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/users/addScore/${userId}`, { count });
    if (response.status === 200) {
      console.log(response.data)
      dispatch({
        type: ActionTypes.PUT_USER_SLIDER_SCORE_SUCCESS,
        payload: response.data.sliderScore
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

    if (response.status === 200) {
      dispatch({
        type: ActionTypes.DELETE_USER_PHOTO_SUCCESS,
        payload: photoId
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export const handleDailyCompleted = (userId, puzzleDataId, score, userSelectedProperties) => async (dispatch) => {
  try {
    await dispatch(userDailyCompleted(userId));
    await dispatch(addDailyToUser(userId, puzzleDataId, score, userSelectedProperties));
    await dispatch(addDailyPuzzleSScore(userId, 5));

    dispatch({
      type: ActionTypes.HANDLE_DAILY_SUCCESS,
      // payload: response.data.dailyTaskStatus
    })
  } catch (error) {
    console.log(error)
  }
};

export const userDailyCompleted = (userId) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/users/completePuzzle/${userId}`);

    if (response.status === 200) {
      dispatch({
        type: ActionTypes.USER_DAILY_COMPLETED,
        payload: response.data.dailyTaskStatus
      });
    }

  } catch (error) {
    console.log(error);
  }
};

export const addDailyToUser = (userId, puzzleDataId, score, userSelectedProperties) => async (dispatch) => {

  try {
    const userPuzzleResponse = await axios.post(`${API_URL}/userPuzzleData/new`, { dailyPuzzle: puzzleDataId, userSelectedProperties, score });
    if (userPuzzleResponse.status === 200) {
      console.log(userId, userPuzzleResponse.data.id)
      try {
        const puzzleDataId = userPuzzleResponse.data.id;
        console.log({ puzzleDataId })
        const response = await axios.put(`${API_URL}/users/addPuzzleData/${userId}`, { puzzleDataId });

        if (response.status === 200) {
          console.log(response.data)
          dispatch({
            type: ActionTypes.ADD_DAILY_TO_USER_SUCCESS,
            payload: response.data
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};


// Handle Community Photo Complete

export const handlePhotoComplete = (userId) => async (dispatch) => {
  try {
    // need more stuff here but don't got time

    await dispatch(addDailyPuzzleSScore(userId, 1));

    dispatch({
      type: ActionTypes.HANDLE_PHOTO_PLAY_SUCCESS,
      // payload: response.data.dailyTaskStatus
    })
  } catch (error) {
    console.log(error)
  }
};

// PuzzleData


export const fetchUserPuzzle = (userPuzzles) => async (dispatch) => {
  if (userPuzzles) {
    for (let i = 0; i < userPuzzles.length; i++) {
      dispatch(fetchPhotoById(userPuzzles[i]));
    }
  }

  dispatch({
    type: ActionTypes.FETCH_USER_PUZZLES_SUCCESS,
  });
};

export const fetchPuzzleById = (userPuzzleDataId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/userPuzzleData/${userPuzzleDataId}`);

    if (response.status === 200) {
      dispatch({
        type: ActionTypes.FETCH_PUZZLE_BY_ID_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}


