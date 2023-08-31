import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../firebase/config';
import { updateProfileImage } from '../redux/modules/auth/actions';
import { useToast } from '@chakra-ui/react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  deleteUser,
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const actionCodeSettings = {
    url: `${import.meta.env.VITE_VERCEL_APP_URL}/verify-success`,
    locale: 'pt-br',
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: '3000',
        isClosable: true,
      });
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
      toast({
        description: error.message,
        status: 'error',
        duration: '3000',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    setLoading(true);
    try {
      await sendEmailVerification(auth._currentUser, actionCodeSettings);
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: '3000',
        isClosable: true,
      });
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
      toast({
        description: error.message,
        status: 'error',
        duration: '3000',
        isClosable: true,
      });
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword, setSuccess) => {
    setLoading(true);
    try {
      await updatePassword(auth.currentUser, newPassword);
      setSuccess(true);
    } catch (error) {
      if (error.message.includes('equires-recent-login')) {
        toast({
          description:
            'A troca de senha necessita de um login recente, por favor ente novamente para altera-la.',
          status: 'error',
          duration: '3000',
          isClosable: true,
        });
      } else {
        toast({
          description: error.message,
          status: 'error',
          duration: '3000',
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const changeImage = async (url, setSuccess) => {
    setLoading(true);

    try {
      await updateProfile(auth.currentUser, { photoURL: url });

      dispatch(updateProfileImage(url));
      setSuccess(true);
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: '3000',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loginUser,
    registerUser,
    verifyEmail,
    resetPassword,
    changePassword,
    changeImage,
    loading,
  };
};

export default useAuth;
