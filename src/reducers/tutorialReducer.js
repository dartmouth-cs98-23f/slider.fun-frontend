import { produce } from 'immer';
import { ActionTypes } from '../actions/tutorialAction';
import tutorialData from "../assets/TutorialData.js"

const initialState = {
  "tutorialData": tutorialData,
  "scores": [0, 0, 0, 0, 0, 0, 0],
  "currentStage": 0,
  "mostForwardStage": 0,
}

const tutorialReducer = produce((draftState, action) => {
  switch (action.type) {
    case ActionTypes.GO_TO_SPECIFIC_STAGE:
      console.log(action.payload)
      draftState.currentStage = action.payload;
      break;
    case ActionTypes.UPDATE_SCORES:
      draftState.scores[action.payload.indexToUpdate] = action.payload.newScore;
      break;
    default:
      return draftState;
  }
}, initialState);

export default tutorialReducer;