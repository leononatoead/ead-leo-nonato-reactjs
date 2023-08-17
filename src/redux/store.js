import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/reducer';

const reducers = {
  auth: authReducer
};

const store = configureStore({
  reducer: reducers
});

export default store;
