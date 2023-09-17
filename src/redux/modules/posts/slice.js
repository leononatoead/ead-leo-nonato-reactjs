import { createSlice } from '@reduxjs/toolkit';
import { fetchMorePosts, fetchPost, fetchPosts } from './actions';

const postsReducer = createSlice({
  name: 'posts',
  initialState: {},
  reducers: {
    newPost: (state, action) => {
      const posts = JSON.parse(JSON.stringify([...state.posts]));
      const pages = JSON.parse(JSON.stringify([...state.pages]));
      console.log(pages);

      let post = action.payload;

      const updatedPages = pages.map((page) => {
        let posts = [...page.posts];
        posts.unshift(post);

        if (page.page === pages.length + 1) {
          return { page: pages.length + 2, posts: [post] };
        } else {
          posts.pop();
          post = page.posts[9];

          return { ...page, posts };
        }
      });

      console.log(updatedPages);
      return {
        ...state,
        posts: [...posts, action.payload],
        pages: updatedPages,
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
    delPost: (state, action) => {
      const posts = JSON.parse(JSON.stringify([...state.posts]));
      const filterPosts = posts.filter((post) => post.id !== action.payload);

      return {
        ...state,
        posts: filterPosts,
      };
    },
    changePage: (state, action) => {
      console.log(action.payload);
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
        const posts = JSON.parse(JSON.stringify([...state.posts]));
        const pages = JSON.parse(JSON.stringify([...state.pages]));
        const page = { page: pages.length + 1, posts: action.payload };

        return {
          ...state,
          posts: [...posts, ...action.payload],
          pages: [...pages, page],
          currentPage: pages.length + 1,
        };
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        return { ...state, currentPost: action.payload };
      });
  },
});

export default postsReducer.reducer;
