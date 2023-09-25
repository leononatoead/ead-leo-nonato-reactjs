import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/slice';
import coursesReducer from './modules/courses/slice';
import faqReducer from './modules/faq/slice';
import formsReducer from './modules/forms/slice';
import postsReducer from './modules/posts/slice';
import bannersReducer from './modules/banners/slice';

const reducers = {
  auth: authReducer,
  courses: coursesReducer,
  faq: faqReducer,
  forms: formsReducer,
  posts: postsReducer,
  banners: bannersReducer,
};

const store = configureStore({
  reducer: reducers,
});

export default store;
