const initialState = {
  videos: null
};

const videosReducer = (state = initialState, action) => {
  switch (action.type) {
    case '':
      return action.payload;

    default:
      return state;
  }
};

export default videosReducer;
