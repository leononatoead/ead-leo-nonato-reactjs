import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/reducer';
import videosReducer from './modules/videos/reducer';

const reducers = {
  auth: authReducer,
  videos: videosReducer
};

const store = configureStore({
  reducer: reducers
});

export default store;
