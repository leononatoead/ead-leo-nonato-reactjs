import { createAsyncThunk } from '@reduxjs/toolkit';

import { database } from '../../../firebase/config';

import {
  collection,
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
