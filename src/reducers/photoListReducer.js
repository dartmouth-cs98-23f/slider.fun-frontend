import { produce } from 'immer';
import { ActionTypes } from '../actions/photoListAction';

const initialState = {
  "selected": "byLikes",
  "community": {},
  "communityByLikes": {},
  "photoListFetched": false,
  "scoreHighMessageVis": false,
  "scoreLowMessageVis": false,
  "reportedMessageVis": false,
  "currentPhotoScore": 0,
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
      draftState.communityByLikes[action.payload.id].likedBy = action.payload.likedBy;

      break;
    case ActionTypes.REMOVE_PHOTO_LIKE_SUCCESS:
      draftState.community[action.payload.id].likedBy = action.payload.likedBy;
      draftState.communityByLikes[action.payload.id].likedBy = action.payload.likedBy;
      break;
    case ActionTypes.SET_SELECTED_PHOTO_LIST:
      draftState.selected = action.payload;
      break;
    case ActionTypes.SET_SCORE_LOW_MESSAGE_VIS:
      draftState.scoreLowMessageVis = action.payload;
      break;
    case ActionTypes.SET_SCORE_HIGH_MESSAGE_VIS:
      draftState.scoreHighMessageVis = action.payload;
      break;
    case ActionTypes.SET_REPORT_PHOTO_VIS:
      draftState.reportedMessageVis = action.payload;
      break;
    case ActionTypes.SET_CURRENT_PHOTO_SCORE:
      draftState.currentPhotoScore = action.payload;
      break;
    case ActionTypes.REPORT_PHOTO:
      console.log(action.payload)

      if (!draftState.community[action.payload.id].reported) {
        draftState.community[action.payload.id].reported = [];
      }
      if (!draftState.communityByLikes[action.payload.id].reported) {
        draftState.communityByLikes[action.payload.id].reported = [];
      }
      draftState.community[action.payload.id].reported = (action.payload.reported);
      draftState.communityByLikes[action.payload.id].reported = (action.payload.reported);
      break;
    default:
      return draftState;
  }
}, initialState);

export default photoListReducer;