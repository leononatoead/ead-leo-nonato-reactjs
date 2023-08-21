import { createSlice } from '@reduxjs/toolkit';
import { fetchCourses, fetchVideos } from './actions';

const courseReducer = createSlice({
  name: 'courses',
  initialState: {},
  reducers: {
    addCourse: (state, action) => {
      const newCourse = action.payload;
      return {
        ...state,
        courses: [...state.courses, newCourse]
      };
    }
    // updateCourse: (state, action) => {
    //   const updatedCourse = action.payload;
    //   return {
    //     ...state,
    //     courses: state.courses.map((course) =>
    //       course.id === updatedCourse.id ? updatedCourse : course
    //     )
    //   };
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        return { ...state, courses: action.payload };
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        const courses = JSON.parse(JSON.stringify([...state.courses]));

        const findCourseById = courses.find(
          (course) => course.id === action.payload.id
        );

        const addVideosToCourse = {
          ...findCourseById,
          videos: action.payload.videos
        };

        const updateCourseList = courses.map((course) => {
          if (course.id === action.payload.id) {
            return addVideosToCourse;
          } else {
            return course;
          }
        });

        return {
          ...state,
          courses: updateCourseList,
          videos: action.payload.videos
        };
      });
  }
});

export default courseReducer.reducer;
