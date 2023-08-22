import { createAsyncThunk } from '@reduxjs/toolkit';

import { database } from '../../../firebase/config';

import {
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const collectionRef = collection(database, 'courses');

    try {
      const q = query(collectionRef, orderBy('createdAt', 'asc'), limit(10));

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt.toMillis()
            }));
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const fetchVideos = createAsyncThunk(
  'courses/fetchVideos',
  async (courseId) => {
    const collectionRef = collection(database, `courses/${courseId}/videos`);

    try {
      const q = query(collectionRef, orderBy('createdAt', 'asc'), limit(10));

      const querySnapshot = await getDocs(q);

      const videos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toMillis()
      }));

      return {
        id: courseId,
        videos: videos
      };
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const addCourse = (courseData) => {
  return {
    type: 'courses/addCourse',
    payload: courseData
  };
};

export const editCourse = (courseData) => {
  return {
    type: 'courses/editCourse',
    payload: courseData
  };
};

export const delCourse = (courseId) => {
  return {
    type: 'courses/delCourse',
    payload: courseId
  };
};

export const addVideo = (videoData) => {
  return {
    type: 'courses/addVideo',
    payload: videoData
  };
};

export const editVideo = (videoData) => {
  return {
    type: 'courses/editVideo',
    payload: videoData
  };
};

export const delVideo = (videoData) => {
  return {
    type: 'courses/delVideo',
    payload: videoData
  };
};
