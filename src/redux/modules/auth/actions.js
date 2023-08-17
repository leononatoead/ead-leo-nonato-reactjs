import { database, auth } from '../../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  deleteUser
} from 'firebase/auth';

import {
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  EDIT_USER,
  REMOVE_USER
} from './actionType';

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

      const userPayload = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        ...collectionData
      };
      dispatch({ type: AUTH_USER, payload: userPayload });
    } else {
      dispatch({ type: AUTH_USER, payload: null });
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
    payload: null
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
      admin: false
    };

    await setDoc(doc(database, 'users', user.uid), userData);

    sendEmailVerification(user, actionCodeSettings);
  } catch (error) {}
};

export const editUser = () => ({
  type: EDIT_USER,
  payload: ''
});

export const removeUser = () => ({
  type: REMOVE_USER,
  payload: ''
});
