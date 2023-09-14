import { createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../../firebase/config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export const fetchForms = createAsyncThunk('forms/fetchForms', async () => {
  const collectionRef = collection(database, 'forms');

  try {
    const q = query(collectionRef, orderBy('createdAt', 'asc'));

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

export const newForm = (data) => async (dispatch) => {
  dispatch({
    type: 'forms/newForm',
    payload: data,
  });
};

export const editForm = (data) => async (dispatch) => {
  dispatch({
    type: 'forms/editForm',
    payload: data,
  });
};

export const delForm = (data) => async (dispatch) => {
  dispatch({
    type: 'forms/delForm',
    payload: data,
  });
};
