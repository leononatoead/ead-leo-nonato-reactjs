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

export const verifyAuthentication = () => (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const collectionData = await getUserData(user.uid);

      // const data = {
      //   api_key: import.meta.env.VITE_VERCEL_API_TOKEN,
      //   metadata: {
      //     chave: 'valor',
      //   },
      // };

      // const payment = await api.get(`/customers`, { params: data });
      // console.log(payment);

      const userPayload = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        profileImageRef: user.profileImageRef,
        isPremium: false,
        ...collectionData,
      };
      dispatch({ type: AUTH_USER, payload: userPayload });
    } else {
      dispatch({ type: AUTH_USER, payload: null });
    }
  });
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
