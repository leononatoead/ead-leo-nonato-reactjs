import { createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../../firebase/config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const collectionRef = collection(database, 'posts');

  try {
    const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(10));

    const postsUpdate = doc(database, 'updates', 'posts');
    const document = await getDoc(postsUpdate);

    return new Promise((resolve, reject) => {
      onSnapshot(
        q,
        (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toMillis(),
          }));

          resolve(data);

          localStorage.setItem(
            'lastPostsUpdate',
            JSON.stringify(
              new Date(document.data()?.lastPostsUpdate?.toMillis()),
            ),
          );
        },
        (error) => {
          reject(error);
        },
      );
    });
  } catch (error) {
    console.log(error.message);
  }
});

export const fetchMorePosts = createAsyncThunk(
  'posts/fetchMorePosts',
  async (id) => {
    const collectionRef = collection(database, 'posts');
    const lastPost = doc(database, 'posts', id);

    try {
      const lastPostSnapshot = await getDoc(lastPost);

      const q = query(
        collectionRef,
        orderBy('createdAt', 'desc'),
        startAfter(lastPostSnapshot),
        limit(10),
      );

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt.toMillis(),
            }));

            resolve(data);
          },
          (error) => {
            reject(error);
          },
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id) => {
  const docRef = doc(database, 'posts', id);

  try {
    const docSnapshot = await getDoc(docRef);

    return new Promise((resolve, reject) => {
      try {
        const data = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
          createdAt: docSnapshot.data().createdAt.toMillis(),
        };

        resolve(data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async (search) => {
    const searchRef = collection(database, 'posts');

    try {
      const q = query(
        searchRef,
        where('searchStr', 'array-contains-any', search),
        orderBy('createdAt', 'desc'),
        limit(10),
      );

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt.toMillis(),
            }));

            resolve(data);
          },
          (error) => {
            reject(error);
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const selectCategory = createAsyncThunk(
  'posts/selectCategory',
  async (category) => {
    if (category === null) {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    }

    const searchRef = collection(database, 'posts');

    try {
      const q = query(
        searchRef,
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(10),
      );

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt.toMillis(),
            }));

            resolve(data);
          },
          (error) => {
            reject(error);
            console.log(error);
          },
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (id) => {
    const collectionRef = collection(database, `posts/${id}/comments`);

    try {
      const q = query(collectionRef, orderBy('createdAt', 'asc'));

      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (querySnapshot) => {
            const comments = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              createdAt: doc.data().createdAt.toMillis(),
            }));

            const data = { id, comments };
            resolve(data);
          },
          (error) => {
            reject(error);
          },
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const delPost = createAsyncThunk('posts/delPost', async (data) => {
  const collectionRef = collection(database, 'posts');
  const lastPost = doc(database, 'posts', data.lastPostId);

  try {
    const lastPostSnapshot = await getDoc(lastPost);

    const q = query(
      collectionRef,
      orderBy('createdAt', 'desc'),
      startAfter(lastPostSnapshot),
      limit(1),
    );

    return new Promise((resolve, reject) => {
      onSnapshot(
        q,
        (querySnapshot) => {
          const post = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toMillis(),
          }));

          const delData = {
            id: data.delId,
            post: post[0],
          };

          resolve(delData);
        },
        (error) => {
          reject(error);
        },
      );
    });
  } catch (error) {
    console.log(error.message);
  }
});

export const newPost = (data) => async (dispatch) => {
  dispatch({
    type: 'posts/newPost',
    payload: data,
  });
};

export const setCurrentPost = (data) => async (dispatch) => {
  dispatch({
    type: 'posts/setCurrentPost',
    payload: data,
  });
};

export const editPost = (data) => async (dispatch) => {
  dispatch({
    type: 'posts/editPost',
    payload: data,
  });
};

export const changePage = (page) => async (dispatch) => {
  dispatch({
    type: 'posts/changePage',
    payload: page,
  });
};

export const addLikePost = (data) => async (dispatch) => {
  dispatch({
    type: 'posts/addLikePost',
    payload: data,
  });
};

export const removeLikePost = (data) => async (dispatch) => {
  dispatch({
    type: 'posts/removeLikePost',
    payload: data,
  });
};

export const addCommentAction = (data) => async (dispatch) => {
  dispatch({
    type: 'posts/addCommentAction',
    payload: data,
  });
};
export const removeCommentAction = (data) => async (dispatch) => {
  dispatch({
    type: 'posts/removeCommentAction',
    payload: data,
  });
};

export const fetchPostsFromLocalStorage = (data) => async (dispatch) => {
  dispatch({
    type: 'posts/fetchPostsFromLocalStorage',
    payload: data,
  });
};
