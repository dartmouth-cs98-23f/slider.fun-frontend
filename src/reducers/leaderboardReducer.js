import { produce } from 'immer';
import { ActionTypes } from '../actions/leaderboardAction';

const initialState = {
  "top25": [],
}

const leaderboardReducer = produce((draftState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TOP_25_SUCCESS:
      draftState.top25 = action.payload;
      return draftState;
    default:
      return draftState;
  }
}, initialState);

export default leaderboardReducer;