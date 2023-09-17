import { createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../../firebase/config';
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const collectionRef = collection(database, 'posts');

  try {
    const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(10));

    return new Promise((resolve, reject) => {
      onSnapshot(
        q,
        (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toMillis(),
          }));

          resolve(data);
        },
        (error) => {
          reject(error);
        },
      );
    });
  } catch (error) {
    console.log(error.message);
  }
});

export const fetchMorePosts = createAsyncThunk(
  'posts/fetchMorePosts',
  async (id) => {
    const collectionRef = collection(database, 'posts');
    const lastPost = doc(database, 'posts', id);

    try {
      const lastPostSnapshot = await getDoc(lastPost);

      const q = query(
        collectionRef,
        orderBy('createdAt', 'desc'),
        startAfter(lastPostSnapshot),
        limit(10),
      );

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt.toMillis(),
            }));

            resolve(data);
          },
          (error) => {
            reject(error);
          },
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id) => {
  const docRef = doc(database, 'posts', id);

  try {
    const docSnapshot = await getDoc(docRef);

    return new Promise((resolve, reject) => {
      try {
        const data = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
          createdAt: docSnapshot.data().createdAt.toMillis(),
        };

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

export const newPost = (data) => async (dispatch) => {
  dispatch({
    type: 'posts/newPost',
    payload: data,
  });
};

export const setCurrentPost = (data) => async (dispatch) => {
  dispatch({
    type: 'posts/setCurrentPost',
    payload: data,
  });
};

export const editPost = (data) => async (dispatch) => {
  dispatch({
    type: 'posts/editPost',
    payload: data,
  });
};

export const delPost = (data) => async (dispatch) => {
  dispatch({
    type: 'posts/delPost',
    payload: data,
  });
};

export const changePage = (page) => async (dispatch) => {
  dispatch({
    type: 'posts/changePage',
    payload: page,
  });
};
