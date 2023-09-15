import { createSlice } from '@reduxjs/toolkit';
import { fetchPost, fetchPosts } from './actions';

const postsReducer = createSlice({
  name: 'posts',
  initialState: {},
  reducers: {
    newPost: (state, action) => {
      const posts = JSON.parse(JSON.stringify([...state.posts]));

      return { ...state, posts: [...posts, action.payload] };
    },
    setCurrentPost: (state, action) => {
      return { ...state, currentPost: action.payload };
    },
    editPost: (state, action) => {
      const posts = JSON.parse(JSON.stringify([...state.posts]));

      const updatePosts = posts.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        } else {
          return post;
        }
      });

      return { ...state, posts: updatePosts };
    },
    delPost: (state, action) => {
      const posts = JSON.parse(JSON.stringify([...state.posts]));
      const filterPosts = posts.filter((post) => post.id !== action.payload);

      return {
        ...state,
        posts: filterPosts,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return { ...state, posts: action.payload };
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        return { ...state, currentPost: action.payload };
      });
  },
});

export default postsReducer.reducer;
