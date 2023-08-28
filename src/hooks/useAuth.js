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
} from 'firebase/auth';

import { toast } from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const actionCodeSettings = {
    url: `${import.meta.env.VITE_VERCEL_APP_URL}/verify-success`,
    locale: 'pt-br',
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
        registerData.password,
      );

      await updateProfile(user, {
        displayName: registerData.name,
      });

      const userData = {
        admin: false,
        cpf: registerData.cpf,
      };

      await setDoc(doc(database, 'users', user.uid), userData);

      sendEmailVerification(user, actionCodeSettings);

      navigate('/verify-phone');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email, setSuccess) => {
    setLoading(true);
    try {
      const actionCodeSettings = {
        url: `${import.meta.env.VITE_VERCEL_APP_URL}/change-password-success`,
        locale: 'pt-br',
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setSuccess(true);
    } catch (error) {
      toast.error(error.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    setLoading(true);
    try {
      await sendEmailVerification(auth._currentUser, actionCodeSettings);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    registerUser,
    resetPassword,
    verifyEmail,
    loading,
  };
};

export default useAuth;
