import { produce } from 'immer';
import { ActionTypes } from '../actions/photoListAction';

const initialState = {
  "daily": {},
}

const dailyReducer = produce((draftState, action) => {
  switch (action.type) {

    default:
      return draftState;
  }
}, initialState);

export default dailyReducer;