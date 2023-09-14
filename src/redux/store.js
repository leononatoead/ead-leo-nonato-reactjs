import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/slice';
import coursesReducer from './modules/courses/slice';
import faqReducer from './modules/faq/slice';
import formsReducer from './modules/forms/slice';

const reducers = {
  auth: authReducer,
  courses: coursesReducer,
  faq: faqReducer,
  forms: formsReducer,
};

const store = configureStore({
  reducer: reducers,
});

export default store;
