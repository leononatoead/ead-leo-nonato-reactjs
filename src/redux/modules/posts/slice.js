import { createSlice } from '@reduxjs/toolkit';
import { fetchMorePosts, fetchPost, fetchPosts, delPost } from './actions';

const postsReducer = createSlice({
  name: 'posts',
  initialState: {},
  reducers: {
    newPost: (state, action) => {
      const oldPosts = JSON.parse(JSON.stringify([...state.posts]));
      let posts = [action.payload, ...oldPosts];
      posts.pop();

      let pagination = [];
      let currentPage = null;

      posts.forEach((post, index) => {
        if (index % 10 === 0) {
          currentPage = { page: Math.floor(index / 10) + 1, posts: [] };
          pagination.push(currentPage);
        }
        currentPage.posts.push(post);
      });

      return {
        ...state,
        posts: [...posts],
        pages: [pagination[0]],
      };
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
    // delPost: (state, action) => {
    //   console.log(action.payload);
    //   const posts = JSON.parse(JSON.stringify([...state.posts]));
    //   const removePost = posts.filter((post) => post.id !== action.payload);
    //   const newPosts = [...removePost, action.payload.post];

    //   let pagination = [];
    //   let currentPage = null;

    //   filterPosts.forEach((post, index) => {
    //     if (index % 10 === 0) {
    //       currentPage = { page: Math.floor(index / 10) + 1, posts: [] };
    //       pagination.push(currentPage);
    //     }
    //     currentPage.posts.push(post);
    //   });

    //   console.log(pagination);
    //   return {
    //     ...state,
    //     posts: filterPosts,
    //     pages: pagination,
    //   };
    // },
    changePage: (state, action) => {
      return {
        ...state,
        currentPage: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const page = { page: 1, posts: action.payload };
        return {
          ...state,
          posts: action.payload,
          pages: [page],
          currentPage: 1,
        };
      })
      .addCase(fetchMorePosts.fulfilled, (state, action) => {
        const oldPosts = JSON.parse(JSON.stringify([...state.posts]));
        const pages = JSON.parse(JSON.stringify([...state.pages]));
        const posts = [...oldPosts, ...action.payload];

        let pagination = [];
        let currentPage = null;

        posts.forEach((post, index) => {
          if (index % 10 === 0) {
            currentPage = { page: Math.floor(index / 10) + 1, posts: [] };
            pagination.push(currentPage);
          }
          currentPage.posts.push(post);
        });

        return {
          ...state,
          posts: [...posts],
          pages: pagination,
          currentPage: pages[pages.length - 1].page + 1,
        };
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        return { ...state, currentPost: action.payload };
      })
      .addCase(delPost.fulfilled, (state, action) => {
        const posts = JSON.parse(JSON.stringify([...state.posts]));
        const removePost = posts.filter(
          (post) => post.id !== action.payload.id,
        );
        const newPosts = [...removePost, action.payload.post];

        let pagination = [];
        let currentPage = null;
        newPosts.forEach((post, index) => {
          if (index % 10 === 0) {
            currentPage = { page: Math.floor(index / 10) + 1, posts: [] };
            pagination.push(currentPage);
          }
          currentPage.posts.push(post);
        });

        return {
          ...state,
          posts: newPosts,
          pages: pagination,
        };
      });
  },
});

export default postsReducer.reducer;
