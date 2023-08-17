import {
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  EDIT_USER,
  REMOVE_USER
} from './actionType';

const initialState = {
  user: null
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      console.log({ ...action.payload });
      return { user: { ...action.payload } };
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return { user: action.payload };
    case REGISTER_USER:
      return action.payload;
    case EDIT_USER:
      return action.payload;
    case REMOVE_USER:
      return action.payload;
    default:
      return state;
  }
};

export default chatReducer;
