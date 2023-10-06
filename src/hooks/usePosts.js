import { useState } from 'react';
import { database } from '../firebase/config';

import { useDispatch } from 'react-redux';

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { useToast } from '@chakra-ui/react';
import {
  addCommentAction,
  addLikePost,
  delPost,
  editPost,
  newPost,
  removeCommentAction,
  removeLikePost,
} from '../redux/modules/posts/actions';
import {
  addLikedPostToUser,
  removeLikedPostFromUser,
} from '../redux/modules/auth/actions';

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

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'posts');
      setDoc(updateCollection, { lastPostsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem('lastPostsUpdate', updatedAt);

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

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'posts');
      setDoc(updateCollection, { lastPostsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem('lastPostsUpdate', updatedAt);

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

  const addComment = async (id, comment) => {
    setLoading(true);

    try {
      const commentData = { ...comment, createdAt: Timestamp.now() };

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'posts');
      setDoc(updateCollection, { lastPostsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem('lastPostsUpdate', updatedAt);

      const res = await addDoc(
        collection(database, `posts/${id}/comments/`),
        commentData,
      );

      const data = {
        id,
        comment: {
          id: res.id,
          ...comment,
          createdAt: Timestamp.now().toMillis(),
        },
      };

      dispatch(addCommentAction(data));

      toast({
        description: 'Comentário adicionado com sucesso!',
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

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'posts');
      setDoc(updateCollection, { lastPostsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem('lastPostsUpdate', updatedAt);

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

  const deleteComment = async (postId, commentId) => {
    try {
      const postRef = doc(database, `posts/${postId}/comments`, commentId);
      await deleteDoc(postRef);

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'posts');
      setDoc(updateCollection, { lastPostsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem('lastPostsUpdate', updatedAt);

      dispatch(removeCommentAction({ postId, commentId }));

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

  const addLike = async (postId, userId) => {
    setLoading(true);

    try {
      const postRef = doc(database, 'posts', postId);
      const postSnapshot = await getDoc(postRef);
      const likesCount = postSnapshot.data().likesCount
        ? postSnapshot.data().likesCount + 1
        : 1;

      await updateDoc(postRef, { likesCount });

      const userRef = doc(database, 'users', userId);
      const userSnapshot = await getDoc(userRef);

      const likedPosts = userSnapshot.data().likedPosts
        ? [...userSnapshot.data().likedPosts, postId]
        : [postId];

      //TODO: CORRIGIR POSSIVEL ERRO AO CURTIR O MESMO POST
      // let likedPosts;

      // if (userSnapshot.data().likedPosts) {
      //   const verifyIfAlreadyLiked = userSnapshot
      //     .data()
      //     .likedPosts.find((post) => post === postId);

      //   if (verifyIfAlreadyLiked) {
      //     likedPosts = userSnapshot.data().likedPosts;
      //   } else {
      //     likedPosts = [...userSnapshot.data().likedPosts, postId];
      //   }
      // } else {
      //   likedPosts = [postId];
      // }

      await updateDoc(userRef, { likedPosts });

      const postData = { postId, likesCount };
      dispatch(addLikePost(postData));
      const userData = { userId, likedPosts };
      dispatch(addLikedPostToUser(userData));

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'posts');
      setDoc(updateCollection, { lastPostsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem('lastPostsUpdate', updatedAt);
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
  const removeLike = async (postId, userId) => {
    setLoading(true);

    try {
      const postRef = doc(database, 'posts', postId);
      const postSnapshot = await getDoc(postRef);
      const likesCount = postSnapshot.data().likesCount - 1;

      await updateDoc(postRef, { likesCount });

      const userRef = doc(database, 'users', userId);
      const userSnapshot = await getDoc(userRef);
      const likedPosts = userSnapshot
        .data()
        .likedPosts.filter((post) => post.id === postId);

      await updateDoc(userRef, { likedPosts });

      const postData = { postId, likesCount };
      dispatch(removeLikePost(postData));
      const userData = { userId, likedPosts };
      dispatch(removeLikedPostFromUser(userData));

      const updateTime = Timestamp.now();
      const updateCollection = doc(database, 'updates', 'posts');
      setDoc(updateCollection, { lastPostsUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem('lastPostsUpdate', updatedAt);
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

  return {
    addPost,
    updatePost,
    deletePost,
    addComment,
    deleteComment,
    addLike,
    removeLike,
    loading,
  };
};

export default usePosts;
