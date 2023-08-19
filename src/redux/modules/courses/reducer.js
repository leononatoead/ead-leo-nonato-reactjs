const initialState = {
  videos: null
};

const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case '':
      return action.payload;

    default:
      return state;
  }
};

export default coursesReducer;
