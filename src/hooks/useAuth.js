import { useState } from 'react';
import { auth, database } from '../firebase/config';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser
} from 'firebase/auth';

import { toast } from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const actionCodeSettings = {
    url: import.meta.env.VITE_APP_URL
  };

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const registerUser = async (registerData) => {
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
      console.log(error);
      toast.error(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const verifyEmail = async () => {
    try {
      await sendEmailVerification(auth._currentUser, actionCodeSettings);
    } catch (error) {
      console.log(error);
    }
  };

  return { loginUser, registerUser, resetPassword, verifyEmail };
};

export default useAuth;
