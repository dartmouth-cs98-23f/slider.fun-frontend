// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';

// import CountReducer from './count-reducer';
// import BracketReducer from './bracketReducer';

const rootReducer = combineReducers({
  user: [],
});
export default rootReducer;