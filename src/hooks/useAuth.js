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

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const actionCodeSettings = {
    url: import.meta.env.VITE_APP_URL
  };

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      toast.error(e.message);
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
      toast.error(e.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return { loginUser, registerUser, resetPassword };
};

export default useAuth;
