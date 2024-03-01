import { produce } from 'immer';
import { ActionTypes } from '../actions/userAction';

const initialState = {
  "token": "",
  "info": {},
  "photoObjects": {},
  "photoObjectsFetched": false,
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
      Object.assign(draftState, initialState);
      break;
    case ActionTypes.SET_USER_TOKEN:
      draftState.token = action.payload;
      break;
    case ActionTypes.FETCH_USER_INFO:
      if (draftState.token) {
        draftState.info = action.payload;
      }
      break;
    case ActionTypes.POST_USER_PHOTO_SUCCESS:
      draftState.photoObjects[action.payload.id] = action.payload;
      break;
    case ActionTypes.EDIT_USER_PHOTO_SUCCESS:
      draftState.photoObjects[action.payload.id] = action.payload;
      break;
    case ActionTypes.FETCH_USER_PHOTOLIST_SUCCESS:
      draftState.photoObjectsFetched = true;
      break;
    case ActionTypes.DELETE_USER_PHOTO_SUCCESS:
      console.log("deleting", action.payload)
      draftState.photoObjects.delete(action.payload);
      break;
    case ActionTypes.FETCH_PHOTO_BY_ID_SUCCESS:
      draftState.photoObjects[action.payload.id] = action.payload;
      break;
    default:
      return draftState;
  }
}, initialState);

export default userReducer;