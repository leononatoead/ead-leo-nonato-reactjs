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

import { AUTH_USER, LOGOUT_USER } from './actionType';

const actionCodeSettings = {
  url: import.meta.env.VITE_APP_URL
};

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

export const loginUser = (email, password) => async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log(e.message);
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
  } catch (error) {
    console.log(e.message);
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (e) {
    console.log(e.message);
  }
};
