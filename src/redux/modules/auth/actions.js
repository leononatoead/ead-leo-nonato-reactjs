import {
  AUTH_USER,
  GET_USER_DATA,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  EDIT_USER,
  REMOVE_USER
} from './actionType';

import { auth } from '../../../firebase/config';

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
  deleteUser
} from 'firebase/auth';

export const getUserData = () => ({
  type: GET_USER_DATA,
  payload: ''
});

// export const registerUser = () => ({
//   type: REGISTER_USER,
//   payload: ''
// });

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
    console.log('foi');
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
    console.log(email, password);
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

export const registerUser =
  (name, phone, email, password) => async (dispatch) => {
    try {
      auth.languageCode = 'pt-BR';
      const actionCodeSettings = {
        url: import.meta.env.VITE_APP_URL
      };

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, { displayName: name, phoneNumber: phone });

      const userData = {
        id: user.uid,
        admin: false
      };

      await setDoc(doc(database, 'users', user.uid), userData);

      sendEmailVerification(user, actionCodeSettings);
    } catch (error) {}
  };
