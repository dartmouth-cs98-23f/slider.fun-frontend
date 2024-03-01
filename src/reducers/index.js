// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';
import photoListReducer from './photoListReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  photoList: photoListReducer,
  user: userReducer,
});


export default rootReducer;