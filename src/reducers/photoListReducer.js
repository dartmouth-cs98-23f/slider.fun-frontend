import { produce } from 'immer';
import { ActionTypes } from '../actions/photoListAction';

const initialState = {
  "testing": "wtf bruh",
  "community": {},
}

const photoListReducer = produce((draftState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PHOTOLIST_SUCCESS:
      Object.assign(draftState.community, action.payload);
      break;
    case ActionTypes.REMOVE_PHOTO:
      // Assuming action.payload is the id of the photo to be removed
      const index = draftState.findIndex(photo => photo.id === action.payload);
      if (index !== -1) draftState.splice(index, 1);
      break;
    case ActionTypes.LIKE_PHOTO:
      break;
    default:
      return draftState;
  }
}, initialState);

export default photoListReducer;