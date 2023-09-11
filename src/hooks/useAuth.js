import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, database, storage } from '../firebase/config';
import {
  updateProfileImage,
  verifyAuthentication,
} from '../redux/modules/auth/actions';
import { useToast } from '@chakra-ui/react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  deleteUser,
  onAuthStateChanged,
} from 'firebase/auth';

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { v4 } from 'uuid';

const useAuth = () => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const actionCodeSettings = {
    url: `${import.meta.env.VITE_VERCEL_APP_URL}/verify-success`,
    locale: 'pt-br',
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

  const authUser = () => {
    setLoadingAuth(true);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const collectionData = await getUserData(user.uid);

        const userPayload = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          profileImageRef: user.profileImageRef,
          isPremium: false,
          ...collectionData,
        };

        dispatch(verifyAuthentication(userPayload));
        setLoadingAuth(false);
      } else {
        dispatch(verifyAuthentication(null));
        setLoadingAuth(false);
      }
    });
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

  const changeImage = async (image, setSuccess, user) => {
    setLoading(true);

    if (user.profileImageRef) {
      const fileRef = ref(storage, user.profileImageRef);
      await deleteObject(fileRef);
    }

    try {
      const firestoreFileName = `profileImages/${Date.now()}${v4()}`;
      const storageRef = ref(storage, firestoreFileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progressStatus =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case 'paused':
              toast({
                description: 'Envio pausado',
                status: 'info',
                duration: '3000',
                isClosable: true,
              });
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              toast({
                description:
                  'O usuário não tem autorização para acessar o objeto.',
                status: 'error',
                duration: '3000',
                isClosable: true,
              });
              break;
            case 'storage/canceled':
              toast({
                description: 'O usuário cancelou o upload',
                status: 'error',
                duration: '3000',
                isClosable: true,
              });
              break;
            default:
              toast({
                description: 'Ocorreu um erro, tente novamente.',
                status: 'error',
                duration: '3000',
                isClosable: true,
              });
              break;
          }
        },
        async () => {
          try {
            const fileURL = await getDownloadURL(uploadTask.snapshot.ref);

            await updateProfile(auth.currentUser, { photoURL: fileURL });

            const userRef = doc(database, 'users', user.uid);
            await updateDoc(userRef, { profileImageRef: fileURL });

            const data = {
              photoURL: fileURL,
              profileImageRef: fileURL,
            };

            dispatch(updateProfileImage(data));
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
        },
      );
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        duration: '3000',
        isClosable: true,
      });
    }
  };

  return {
    authUser,
    loginUser,
    registerUser,
    verifyEmail,
    resetPassword,
    changePassword,
    changeImage,
    loadingAuth,
    loading,
  };
};

export default useAuth;
