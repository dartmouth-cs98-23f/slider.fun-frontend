// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';
import photoListReducer from './photoListReducer';
import userReducer from './userReducer';
import tutorialReducer from './tutorialReducer';
import dailyReducer from './dailyReducer';
import leaderboardReducer from './leaderboardReducer';

const rootReducer = combineReducers({
  tutorial: tutorialReducer,
  daily: dailyReducer,
  photoList: photoListReducer,
  user: userReducer,
  leaderboard: leaderboardReducer,
});


export default rootReducer;