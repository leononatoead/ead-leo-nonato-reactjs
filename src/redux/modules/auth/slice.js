export const AUTH_USER = 'AUTH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

const initialState = {
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { user: action.payload };
    case LOGOUT_USER:
      return { user: action.payload };
    default:
      return state;
  }
};

export default authReducer;
