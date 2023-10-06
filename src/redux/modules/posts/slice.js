import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMorePosts,
  fetchPost,
  fetchPosts,
  delPost,
  searchPosts,
  selectCategory,
  fetchComments,
  addLikePost,
} from './actions';

const postsReducer = createSlice({
  name: 'posts',
  initialState: { posts: [], pages: [] },
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

      const storagePosts = JSON.stringify([...posts]);
      localStorage.setItem('posts', storagePosts);
      const storagePages = JSON.stringify([pagination[0]]);
      localStorage.setItem('pages', storagePages);
      const storagePage = JSON.stringify(1);
      localStorage.setItem('currentPage', storagePage);

      return {
        ...state,
        posts: [...posts],
        pages: [pagination[0]],
        currentPage: 1,
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

      let pagination = [];
      let currentPage = null;

      updatePosts.forEach((post, index) => {
        if (index % 10 === 0) {
          currentPage = { page: Math.floor(index / 10) + 1, posts: [] };
          pagination.push(currentPage);
        }
        currentPage.posts.push(post);
      });

      const storagePosts = JSON.stringify([...updatePosts]);
      localStorage.setItem('posts', storagePosts);
      const storagePages = JSON.stringify([...pagination]);
      localStorage.setItem('pages', storagePages);

      return { ...state, posts: updatePosts, pages: pagination };
    },
    changePage: (state, action) => {
      const storagePage = JSON.stringify(action.payload);
      localStorage.setItem('currentPage', storagePage);

      return {
        ...state,
        currentPage: action.payload,
      };
    },
    addCommentAction: (state, action) => {
      const posts = JSON.parse(JSON.stringify([...state.posts]));

      const updatePosts = posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            comments: [...post.comments, action.payload.comment],
          };
        } else {
          return post;
        }
      });

      let pagination = [];
      let currentPage = null;

      updatePosts.forEach((post, index) => {
        if (index % 10 === 0) {
          currentPage = { page: Math.floor(index / 10) + 1, posts: [] };
          pagination.push(currentPage);
        }
        currentPage.posts.push(post);
      });

      const storagePosts = JSON.stringify([...updatePosts]);
      localStorage.setItem('posts', storagePosts);
      const storagePages = JSON.stringify([...pagination]);
      localStorage.setItem('pages', storagePages);

      return { ...state, posts: updatePosts, pages: pagination };
    },
    removeCommentAction: (state, action) => {
      const posts = JSON.parse(JSON.stringify([...state.posts]));

      const updatePosts = posts.map((post) => {
        if (post.id === action.payload.postId) {
          const filterComments = post.comments.filter(
            (comment) => comment.id !== action.payload.commentId,
          );

          return {
            ...post,
            comments: filterComments,
          };
        } else {
          return post;
        }
      });

      let pagination = [];
      let currentPage = null;

      updatePosts.forEach((post, index) => {
        if (index % 10 === 0) {
          currentPage = { page: Math.floor(index / 10) + 1, posts: [] };
          pagination.push(currentPage);
        }
        currentPage.posts.push(post);
      });

      const storagePosts = JSON.stringify([...updatePosts]);
      localStorage.setItem('posts', storagePosts);
      const storagePages = JSON.stringify([...pagination]);
      localStorage.setItem('pages', storagePages);

      return { ...state, posts: updatePosts, pages: pagination };
    },
    addLikePost: (state, action) => {
      const posts = JSON.parse(JSON.stringify([...state.posts]));

      const updatePosts = posts.map((post) => {
        if (post.id === action.payload.postId) {
          return { ...post, likesCount: action.payload.likesCount };
        } else {
          return post;
        }
      });

      let pagination = [];
      let currentPage = null;

      updatePosts.forEach((post, index) => {
        if (index % 10 === 0) {
          currentPage = { page: Math.floor(index / 10) + 1, posts: [] };
          pagination.push(currentPage);
        }
        currentPage.posts.push(post);
      });

      const storagePosts = JSON.stringify([...updatePosts]);
      localStorage.setItem('posts', storagePosts);
      const storagePages = JSON.stringify([...pagination]);
      localStorage.setItem('pages', storagePages);

      return { ...state, posts: updatePosts, pages: pagination };
    },
    removeLikePost: (state, action) => {
      const posts = JSON.parse(JSON.stringify([...state.posts]));

      const updatePosts = posts.map((post) => {
        if (post.id === action.payload.postId) {
          return { ...post, likesCount: action.payload.likesCount };
        } else {
          return post;
        }
      });

      let pagination = [];
      let currentPage = null;

      updatePosts.forEach((post, index) => {
        if (index % 10 === 0) {
          currentPage = { page: Math.floor(index / 10) + 1, posts: [] };
          pagination.push(currentPage);
        }
        currentPage.posts.push(post);
      });

      const storagePosts = JSON.stringify([...updatePosts]);
      localStorage.setItem('posts', storagePosts);
      const storagePages = JSON.stringify([...pagination]);
      localStorage.setItem('pages', storagePages);

      return { ...state, posts: updatePosts, pages: pagination };
    },
    fetchPostsFromLocalStorage: (state, action) => {
      return {
        ...state,
        posts: action.payload.posts,
        pages: action.payload.pages,
        currentPage: action.payload.currentPage,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const page = { page: 1, posts: action.payload };

        const storagePosts = JSON.stringify([...action.payload]);
        localStorage.setItem('posts', storagePosts);
        const storagePages = JSON.stringify([page]);
        localStorage.setItem('pages', storagePages);
        const storagePage = JSON.stringify(1);
        localStorage.setItem('currentPage', storagePage);

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

        const storagePosts = JSON.stringify([...posts]);
        localStorage.setItem('posts', storagePosts);
        const storagePages = JSON.stringify([...pagination]);
        localStorage.setItem('pages', storagePages);
        const storagePage = JSON.stringify(pages[pages.length - 1].page + 1);
        localStorage.setItem('currentPage', storagePage);

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
      .addCase(searchPosts.fulfilled, (state, action) => {
        return { ...state, searchResults: action.payload };
      })
      .addCase(selectCategory.fulfilled, (state, action) => {
        return { ...state, selectedCategory: action.payload };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const posts = JSON.parse(JSON.stringify([...state.posts]));

        const updatePosts = posts.map((post) => {
          if (post.id === action.payload.id) {
            return { ...post, comments: [...action.payload.comments] };
          } else {
            return post;
          }
        });

        let pagination = [];
        let currentPage = null;

        updatePosts.forEach((post, index) => {
          if (index % 10 === 0) {
            currentPage = { page: Math.floor(index / 10) + 1, posts: [] };
            pagination.push(currentPage);
          }
          currentPage.posts.push(post);
        });

        const storagePosts = JSON.stringify([...updatePosts]);
        localStorage.setItem('posts', storagePosts);
        const storagePages = JSON.stringify([...pagination]);
        localStorage.setItem('pages', storagePages);

        return { ...state, posts: updatePosts, pages: pagination };
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

        const storagePosts = JSON.stringify([...newPosts]);
        localStorage.setItem('posts', storagePosts);
        const storagePages = JSON.stringify([...pagination]);
        localStorage.setItem('pages', storagePages);

        return {
          ...state,
          posts: newPosts,
          pages: pagination,
        };
      });
  },
});

export default postsReducer.reducer;
