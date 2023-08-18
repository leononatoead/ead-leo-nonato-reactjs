import { AUTH_USER, LOGOUT_USER } from './actionType';

const initialState = {
  user: null
};

const chatReducer = (state = initialState, action) => {
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

export default chatReducer;
