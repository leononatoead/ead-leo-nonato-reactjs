import { createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../../firebase/config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export const fetchQuestions = createAsyncThunk(
  'faq/fetchQuestions',
  async () => {
    const collectionRef = collection(database, 'faq');

    try {
      const q = query(collectionRef, orderBy('order', 'asc'));

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
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

export const newQuestion = (data) => async (dispatch) => {
  dispatch({
    type: 'faq/addQuestion',
    payload: data,
  });
};

export const editQuestion = (data) => async (dispatch) => {
  dispatch({
    type: 'faq/editQuestion',
    payload: data,
  });
};

export const delQuestion = (data) => async (dispatch) => {
  dispatch({
    type: 'faq/delQuestion',
    payload: data,
  });
};

export const fetchFAQFromLocalStorage = (data) => async (dispatch) => {
  dispatch({
    type: 'faq/fetchFAQFromLocalStorage',
    payload: data,
  });
};
