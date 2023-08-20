import { createSlice } from '@reduxjs/toolkit';
import { fetchCourses } from './actions';

const courseReducer = createSlice({
  name: 'courses',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      return { ...state, courses: action.payload };
    });
  }
});

export default courseReducer.reducer;
