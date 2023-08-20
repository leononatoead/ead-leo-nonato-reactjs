import { database, auth } from '../../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { AUTH_USER, LOGOUT_USER } from './slice';

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

export const logoutUser = () => async (dispatch) => {
  await signOut(auth);

  dispatch({
    type: LOGOUT_USER,
    payload: null
  });
};
