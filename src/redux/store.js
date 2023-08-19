import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/reducer';
import coursesReducer from './modules/courses/reducer';

const reducers = {
  auth: authReducer,
  courses: coursesReducer
};

const store = configureStore({
  reducer: reducers
});

export default store;
