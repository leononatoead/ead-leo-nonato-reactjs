import { createSlice } from '@reduxjs/toolkit';
import { fetchCourses, fetchVideos } from './actions';

const courseReducer = createSlice({
  name: 'courses',
  initialState: { courses: [] },
  reducers: {
    addCourse: (state, action) => {
      if (state.courses) {
        const courses = JSON.parse(JSON.stringify([...state.courses]));
        const storageCourses = JSON.stringify([...courses, action.payload]);
        localStorage.setItem('courses', storageCourses);
      } else {
        const storageCourses = JSON.stringify([action.payload]);
        localStorage.setItem('courses', storageCourses);
      }

      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    },
    searchCourse: (state, action) => {
      const courses = JSON.parse(JSON.stringify([...state.courses]));

      const searchQuery = action.payload
        .toLowerCase()
        .replace(/[áàãâä]/g, 'a')
        .replace(/[éèêë]/g, 'e')
        .replace(/[íìîï]/g, 'i')
        .replace(/[óòõôö]/g, 'o')
        .replace(/[úùûü]/g, 'u')
        .replace(/ç/g, 'c');

      const searchResults = courses.filter((course) =>
        course.name
          .toLowerCase()
          .toLowerCase()
          .replace(/[áàãâä]/g, 'a')
          .replace(/[éèêë]/g, 'e')
          .replace(/[íìîï]/g, 'i')
          .replace(/[óòõôö]/g, 'o')
          .replace(/[úùûü]/g, 'u')
          .replace(/ç/g, 'c')
          .includes(searchQuery),
      );

      return {
        ...state,
        searchResults,
      };
    },
    editCourse: (state, action) => {
      const courses = JSON.parse(JSON.stringify([...state.courses]));

      const updateCourse = {
        ...action.payload,
      };

      const updatedCourseList = courses.map((course) => {
        if (course.id === action.payload.id) {
          return updateCourse;
        } else {
          return course;
        }
      });

      const storageCourses = JSON.stringify([...updatedCourseList]);
      localStorage.setItem('courses', storageCourses);

      return {
        ...state,
        courses: updatedCourseList,
      };
    },
    delCourse: (state, action) => {
      const filterCourses = state.courses.filter(
        (course) => course.id !== action.payload,
      );

      const storageCourses = JSON.stringify([...filterCourses]);
      localStorage.setItem('courses', storageCourses);

      return {
        ...state,
        courses: filterCourses,
      };
    },
    addVideo: (state, action) => {
      const newVideo = action.payload.videoData;
      const courses = JSON.parse(JSON.stringify([...state.courses]));
      const course = courses.find(
        (course) => course.id === action.payload.courseId,
      );

      const updateCourseVideos = {
        ...course,
        videos: [...course.videos, newVideo],
      };

      const updatedCourseList = courses.map((course) => {
        if (course.id === action.payload.courseId) {
          return updateCourseVideos;
        } else {
          return course;
        }
      });

      const storageCourses = JSON.stringify([...updatedCourseList]);
      localStorage.setItem('courses', storageCourses);

      return {
        ...state,
        courses: updatedCourseList,
      };
    },
    editVideo: (state, action) => {
      const courses = JSON.parse(JSON.stringify([...state.courses]));
      const course = courses.find(
        (course) => course.id === action.payload.courseId,
      );
      const updatedVideo = { ...action.payload.videoData };

      const updateVideoData = course.videos.map((video) => {
        if (video.id === updatedVideo.id) {
          return updatedVideo;
        } else {
          return video;
        }
      });

      const updateCourseVideos = {
        ...course,
        videos: updateVideoData,
      };

      const updatedCourseList = courses.map((course) => {
        if (course.id === action.payload.courseId) {
          return updateCourseVideos;
        } else {
          return course;
        }
      });

      const storageCourses = JSON.stringify([...updatedCourseList]);
      localStorage.setItem('courses', storageCourses);

      return {
        ...state,
        courses: updatedCourseList,
      };
    },
    delVideo: (state, action) => {
      const removedVideo = action.payload;
      const courses = JSON.parse(JSON.stringify([...state.courses]));
      const course = courses.find(
        (course) => course.id === removedVideo.courseId,
      );

      const updatedVideoList = course.videos.filter(
        (video) => video.id !== removedVideo.videoId,
      );

      const updateCourseVideos = {
        ...course,
        videos: updatedVideoList,
      };

      const updatedCourseList = courses.map((course) => {
        if (course.id === removedVideo.courseId) {
          return updateCourseVideos;
        } else {
          return course;
        }
      });

      const storageCourses = JSON.stringify([...updatedCourseList]);
      localStorage.setItem('courses', storageCourses);

      return {
        ...state,
        courses: updatedCourseList,
      };
    },
    selectLesson: (state, action) => {
      return { ...state, activeLesson: action.payload };
    },
    fetchCoursesFromLocalStorage: (state, action) => {
      return { ...state, courses: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        const storageCourses = JSON.stringify([...action.payload]);
        localStorage.setItem('courses', storageCourses);

        return { ...state, courses: action.payload };
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        const courses = JSON.parse(JSON.stringify([...state.courses]));
        const course = courses.find(
          (course) => course.id === action.payload.id,
        );
        const videos = action.payload.videos;

        const addVideosToCourse = {
          ...course,
          videos,
        };

        const updatedCourseList = courses.map((course) => {
          if (course.id === action.payload.id) {
            return addVideosToCourse;
          } else {
            return course;
          }
        });

        const storageCourses = JSON.stringify(updatedCourseList);
        localStorage.setItem('courses', storageCourses);

        return {
          ...state,
          courses: updatedCourseList,
        };
      });
  },
});

export default courseReducer.reducer;
