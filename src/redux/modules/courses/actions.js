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

import { toast } from 'react-hot-toast';

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

//TODO: MIGRAR FUNCAO DE ADD CURSO PARA O REDUCER
// export const addCourse = createAsyncThunk(
//   'courses/addCourse',
//   async (docCollection) => {
//     try {
//       const newDocument = { ...document, createdAt: Timestamp.now() };
//       await addDoc(collection(database, docCollection), newDocument);

//       toast.success('Curso cadastrado com sucesso!');
//     } catch (e) {
//       toast.error(e.message);
//       console.log(e.message);
//     }
//   }
// );

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
