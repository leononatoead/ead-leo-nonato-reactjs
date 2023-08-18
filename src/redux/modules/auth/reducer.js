import { AUTH_USER, LOGOUT_USER } from './actionTypes';

const initialState = {
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { user: action.payload };
    case LOGOUT_USER:
      console.log(action.payload);
      return { user: action.payload };
    default:
      return state;
  }
};

export default authReducer;
