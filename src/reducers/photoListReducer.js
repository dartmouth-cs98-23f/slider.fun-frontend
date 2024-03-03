import { produce } from 'immer';
import { ActionTypes } from '../actions/photoListAction';

const initialState = {
  "selected": "byLikes",
  "community": {},
  "communityByLikes": {},
  "photoListFetched": false,
}

const photoListReducer = produce((draftState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PHOTOLIST_SUCCESS:
      Object.assign(draftState.community, action.payload);
      draftState.photoListFetched = true;
      break;
    case ActionTypes.FETCH_PHOTOLIST_BY_LIKES_SUCCESS:
      Object.assign(draftState.communityByLikes, action.payload);
      draftState.photoListFetched = true;
      break;
    case ActionTypes.GET_PHOTO_LIKES_SUCCESS:
      draftState.community[action.payload.id] = action.payload;
      break;
    case ActionTypes.REMOVE_PHOTO:
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
    case ActionTypes.SET_SELECTED_PHOTO_LIST:
      draftState.selected = action.payload;
      break;
    default:
      return draftState;
  }
}, initialState);

export default photoListReducer;