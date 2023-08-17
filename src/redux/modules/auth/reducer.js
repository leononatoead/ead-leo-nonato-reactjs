import {
  AUTH_USER,
  GET_USER_DATA,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  EDIT_USER,
  REMOVE_USER
} from './actionType';

const initialState = {
  user: ''
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.payload;
    case GET_USER_DATA:
      return action.payload;
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return action.payload;
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
