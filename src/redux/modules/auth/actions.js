import { database, auth } from '../../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import api from '../../../api/axios';

import {
  AUTH_USER,
  UPDATE_IMAGE,
  LOGOUT_USER,
  UPDATE_USER_COURSES,
} from './slice';

const getUserData = async (uid) => {
  try {
    const collectionRef = doc(database, `users/${uid}`);
    const res = await getDoc(collectionRef);

    return res.data();
  } catch (e) {
    console.log(e.message);
  }
};

export const verifyAuthentication = (user) => (dispatch) => {
  if (user) {
    dispatch({ type: AUTH_USER, payload: user });
  } else {
    dispatch({ type: AUTH_USER, payload: null });
  }
};

export const logoutUser = () => async (dispatch) => {
  await signOut(auth);

  dispatch({
    type: LOGOUT_USER,
    payload: null,
  });
};

export const updateProfileImage = (url) => async (dispatch) => {
  dispatch({
    type: UPDATE_IMAGE,
    payload: url,
  });
};

export const updtateUserCourses = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_COURSES,
    payload: data,
  });
};
