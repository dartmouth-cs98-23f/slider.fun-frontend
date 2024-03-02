import { produce } from 'immer';
import { ActionTypes } from '../actions/dailyAction';

const initialState = {
  "daily": {},
  "hasHowtoPlayShown": false,
}

const dailyReducer = produce((draftState, action) => {
  switch (action.type) {
    case ActionTypes.SET_HOW_TO_PLAY_DISPLAY:
      draftState.hasHowtoPlayShown = action.payload;
      return draftState;
    default:
      return draftState;
  }
}, initialState);

export default dailyReducer;