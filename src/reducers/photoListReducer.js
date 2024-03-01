import { produce } from 'immer';
import { ActionTypes } from '../actions/photoListAction';

const initialState = {
  "community": {},
}

const photoListReducer = produce((draftState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PHOTOLIST_SUCCESS:
      Object.assign(draftState.community, action.payload);
      break;
    case ActionTypes.GET_PHOTO_LIKES_SUCCESS:
      draftState.community[action.payload.id] = action.payload;
      break;
    case ActionTypes.REMOVE_PHOTO:
      // Assuming action.payload is the id of the photo to be removed
      if (draftState.photoObjects.hasOwnProperty(action.payload)) {
        draftState.photoObjects[action.payload] = undefined;
      }
      break;
    case ActionTypes.PHOTO_LIKE_SUCCESS:
      draftState.community[action.payload.id].likedBy = action.payload.likedBy;
      break;
    case ActionTypes.REMOVE_PHOTO_LIKE_SUCCESS:
      draftState.community[action.payload.id].likedBy = action.payload.likedBy;
      break;

    default:
      return draftState;
  }
}, initialState);

export default photoListReducer;