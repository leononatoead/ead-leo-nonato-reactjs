import { createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../../firebase/config';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

export const fetchBanners = createAsyncThunk(
  'banners/fetchBanners',
  async () => {
    const collectionRef = collection(database, 'banners');

    try {
      const q = query(collectionRef, orderBy('order', 'asc'));

      const courseUpdate = doc(database, 'updates', 'banners');
      const document = await getDoc(courseUpdate);

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            resolve(data);

            localStorage.setItem(
              'lastBannersUpdate',
              JSON.stringify(
                new Date(document.data()?.lastBannersUpdate?.toMillis()),
              ),
            );
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

export const newBanner = (data) => async (dispatch) => {
  dispatch({
    type: 'banners/newBanner',
    payload: data,
  });
};

export const editBanner = (data) => async (dispatch) => {
  dispatch({
    type: 'banners/editBanner',
    payload: data,
  });
};

export const delBanner = (data) => async (dispatch) => {
  dispatch({
    type: 'banners/delBanner',
    payload: data,
  });
};

export const fetchBannersFromLocalStorage = (data) => async (dispatch) => {
  dispatch({
    type: 'banners/fetchBannersFromLocalStorage',
    payload: data,
  });
};
