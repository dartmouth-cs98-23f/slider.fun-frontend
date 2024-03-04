import { produce } from 'immer';
import { ActionTypes } from '../actions/dailyAction';

const initialState = {
  "photo": {},
  "hasHowtoPlayShown": false,
  "puzzleFetched": false,
}

const dailyReducer = produce((draftState, action) => {
  switch (action.type) {
    case ActionTypes.SET_HOW_TO_PLAY_DISPLAY:
      draftState.hasHowtoPlayShown = action.payload;
      return draftState;
    case ActionTypes.FETCH_PUZZLE_OF_DAY_SUCCCSS:
      draftState.photo = action.payload;
      draftState.puzzleFetched = true;
      return draftState;
    default:
      return draftState;
  }
}, initialState);

export default dailyReducer;