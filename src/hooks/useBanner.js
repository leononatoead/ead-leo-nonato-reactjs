import { useState } from 'react';
import { database } from '../firebase/config';

import { useDispatch } from 'react-redux';

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { useToast } from '@chakra-ui/react';
import {
  delBanner,
  editBanner,
  newBanner,
} from '../redux/modules/banners/actions';

const useBanner = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const addBanner = async (banner) => {
    setLoading(true);

    try {
      const res = await addDoc(collection(database, 'banners'), banner);

      const data = { id: res.id, ...banner };

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'banners');
      setDoc(updateCollection, { lastBannersUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem('lastBannersUpdate', updatedAt);

      dispatch(newBanner(data));

      toast({
        description: 'Banner adicionado com sucesso!',
        status: 'success',
        duration: '3000',
        isClosable: true,
      });
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

  const updateBanner = async (id, banner) => {
    setLoading(true);

    try {
      const bannerRef = doc(database, 'banners', id);
      await updateDoc(bannerRef, banner);

      const data = { id, ...banner };

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'banners');
      setDoc(updateCollection, { lastBannersUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem('lastBannersUpdate', updatedAt);

      dispatch(editBanner(data));

      toast({
        description: 'Banner atualizado com sucesso!',
        status: 'success',
        duration: '3000',
        isClosable: true,
      });
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

  const deleteBanner = async (id) => {
    try {
      const bannerRef = doc(database, `banners/`, id);
      await deleteDoc(bannerRef);

      dispatch(delBanner(id));

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'banners');
      setDoc(updateCollection, { lastBannersUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem('lastBannersUpdate', updatedAt);

      toast({
        description: 'Banner removido com sucesso!',
        status: 'success',
        duration: '3000',
        isClosable: true,
      });
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

  return { addBanner, updateBanner, deleteBanner, loading };
};

export default useBanner;
