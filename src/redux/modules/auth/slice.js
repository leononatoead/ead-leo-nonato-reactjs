export const AUTH_USER = 'AUTH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const UPDATE_USER_COURSES = 'UPDATE_USER_COURSES';
export const ADD_LIKED_POST_TO_USER = 'ADD_LIKED_POST_TO_USER';
export const REMOVE_LIKED_POST_FROM_USER = 'REMOVE_LIKED_POST_FROM_USER';

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER: {
      if (action.payload !== null) {
        const storageUser = JSON.stringify(action.payload);
        localStorage.setItem('user', storageUser);

        const updatedAt = JSON.stringify(new Date());
        localStorage.setItem('lastUserUpdate', updatedAt);
      }

      return { user: action.payload };
    }
    case LOGOUT_USER: {
      const storageUser = JSON.stringify(action.payload);
      localStorage.removeItem('user', storageUser);

      const updatedAt = JSON.stringify(new Date());
      localStorage.removeItem('lastUserUpdate', updatedAt);

      return { user: action.payload };
    }
    case UPDATE_IMAGE: {
      const storageUser = JSON.stringify({ ...state.user, ...action.payload });
      localStorage.setItem('user', storageUser);

      const updatedAt = JSON.stringify(new Date());
      localStorage.setItem('lastUserUpdate', updatedAt);
      return { user: { ...state.user, ...action.payload } };
    }
    case UPDATE_USER_COURSES: {
      const storageUser = JSON.stringify({
        user: { ...state.user, courses: action.payload },
      });
      localStorage.setItem('user', storageUser);

      const updatedAt = JSON.stringify(new Date());
      localStorage.setItem('lastUserUpdate', updatedAt);
      return { user: { ...state.user, courses: action.payload } };
    }
    case ADD_LIKED_POST_TO_USER: {
      const storageUser = JSON.stringify({
        user: { ...state.user, likedPosts: action.payload.likedPosts },
      });
      localStorage.setItem('user', storageUser);

      const updatedAt = JSON.stringify(new Date());
      localStorage.setItem('lastUserUpdate', updatedAt);

      return { user: { ...state.user, likedPosts: action.payload.likedPosts } };
    }
    case REMOVE_LIKED_POST_FROM_USER: {
      const storageUser = JSON.stringify({
        user: { ...state.user, likedPosts: action.payload.likedPosts },
      });
      localStorage.setItem('user', storageUser);

      const updatedAt = JSON.stringify(new Date());
      localStorage.setItem('lastUserUpdate', updatedAt);

      return { user: { ...state.user, likedPosts: action.payload.likedPosts } };
    }
    default:
      return state;
  }
};

export default authReducer;
