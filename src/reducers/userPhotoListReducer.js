import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = [
]

const userPhotoListReducer = produce((draftState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_PHOTOLIST_SUCCESS:
      // Replace the draft state with the new photo list from the action's payload
      return action.payload; // Assuming the payload is the new list of photos

    case ActionTypes.REMOVE_PHOTO:
      // Assuming action.payload is the id of the photo to be removed
      const index = draftState.findIndex(photo => photo.id === action.payload);
      if (index !== -1) draftState.splice(index, 1);
      break;

    default:
      // In the default case, we don't need to modify the draftState
      return draftState;
  }
}, initialState);

export default userPhotoListReducer;