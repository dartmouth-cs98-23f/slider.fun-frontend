import { produce } from 'immer';
import { ActionTypes } from '../actions/userAction';

const initialState = {
  "token": "",
  "info": {},
  "photoObjects": []
}

const userReducer = produce((draftState, action) => {
  switch (action.type) {
    case ActionTypes.USER_SIGN_IN_SUCCESS:
      draftState.token = action.payload;
      break;
    case ActionTypes.USER_SIGN_UP_SUCCESS:
      draftState.token = action.payload;
      break;
    case ActionTypes.USER_SIGN_OUT:
      draftState.token = "";
      draftState.info = {};
      draftState.photoObjects = [];
      break;
    case ActionTypes.FETCH_USER_INFO:
      if (draftState.token) {
        draftState.info = action.payload;
      }
      break;
    case ActionTypes.FETCH_PHOTO_BY_ID_SUCCESS:
      console.log(action.payload);
      const exists = draftState.photoObjects.some(photo => photo.id === action.payload.id);
      if (!exists) {
        draftState.photoObjects.push(action.payload);
      }
      break;
    default:
      return draftState;
  }
}, initialState);

export default userReducer;