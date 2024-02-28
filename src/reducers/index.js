// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';
import photoListReducer from './photoListReducer';
import userPhotoListReducer from './userPhotoListReducer';

const rootReducer = combineReducers({
  photoList: photoListReducer,
  userPhotoListReducer: userPhotoListReducer,
});


export default rootReducer;