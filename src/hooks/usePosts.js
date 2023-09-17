import { useState } from 'react';
import { database } from '../firebase/config';

import { useDispatch } from 'react-redux';

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { useToast } from '@chakra-ui/react';
import { delPost, editPost, newPost } from '../redux/modules/posts/actions';

const usePosts = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const addPost = async (post) => {
    setLoading(true);

    try {
      const postData = { ...post, createdAt: Timestamp.now() };

      const res = await addDoc(collection(database, 'posts'), postData);

      const data = {
        id: res.id,
        ...post,
        createdAt: Timestamp.now().toMillis(),
      };

      dispatch(newPost(data));

      toast({
        description: 'Post adicionado com sucesso!',
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

  const updatePost = async (id, post) => {
    setLoading(true);

    try {
      const postRef = doc(database, 'posts', id);
      await updateDoc(postRef, post);

      const data = { id, ...post };

      dispatch(editPost(data));

      toast({
        description: 'Post atualizado com sucesso!',
        status: 'success',
        duration: '3000',
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
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

  const deletePost = async (delId, lastPostId) => {
    try {
      const postRef = doc(database, `posts`, delId);
      await deleteDoc(postRef);

      dispatch(delPost({ delId, lastPostId }));

      toast({
        description: 'Post removido com sucesso!',
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

  return { addPost, updatePost, deletePost, loading };
};

export default usePosts;
