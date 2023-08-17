import { database, auth } from '../../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  RecaptchaVerifier,
  sendEmailVerification,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  deleteUser,
  PhoneAuthProvider
} from 'firebase/auth';

import {
  AUTH_USER,
  GET_USER_DATA,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  EDIT_USER,
  REMOVE_USER
} from './actionType';

export const getUserData = () => ({
  type: GET_USER_DATA,
  payload: ''
});

export const editUser = () => ({
  type: EDIT_USER,
  payload: ''
});

export const removeUser = () => ({
  type: REMOVE_USER,
  payload: ''
});

export const verifyAuthentication = () => (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    console.log(user);
    if (user) {
      dispatch({ type: AUTH_USER, payload: 'user' });
    } else {
      dispatch({ type: AUTH_USER, payload: 'sem user' });
    }
  });
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);

    console.log(data);
    dispatch({
      type: LOGIN_USER,
      payload: ''
    });
  } catch (e) {
    setError(e.message);
  }
};

export const logoutUser = () => (dispatch) => {
  signOut(auth);

  dispatch({
    type: LOGOUT_USER,
    payload: ''
  });
};

export const registerUser = (registerData) => async (dispatch) => {
  try {
    auth.languageCode = 'pt-BR';
    const actionCodeSettings = {
      url: import.meta.env.VITE_APP_URL
    };

    const { user } = await createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password
    );

    await updateProfile(user, {
      displayName: registerData.name
    });

    const userData = {
      id: user.uid,
      admin: false
    };

    await setDoc(doc(database, 'users', user.uid), userData);

    sendEmailVerification(user, actionCodeSettings);
  } catch (error) {}
};
