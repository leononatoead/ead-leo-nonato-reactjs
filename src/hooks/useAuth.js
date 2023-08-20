import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../firebase/config';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
  signOut
} from 'firebase/auth';

import { toast } from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const actionCodeSettings = {
    url: import.meta.env.VITE_APP_URL
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast.error(error.message);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (registerData) => {
    setLoading(true);
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

      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    setLoading(true);
    try {
      await sendEmailVerification(auth._currentUser, actionCodeSettings);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    signOut(auth);
    navigate('/');
  };

  return {
    loginUser,
    registerUser,
    resetPassword,
    verifyEmail,
    logoutUser,
    loading
  };
};

export default useAuth;
