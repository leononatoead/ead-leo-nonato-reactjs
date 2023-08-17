// import { addMessage } from './actions';

// export const addMessageThunk = (user, text) => {
//   return (dispatch, getState) => {
//     const { chat } = getState();
//     console.log(chat);

//     const message = { user, text };

//     const updatedChat = { ...chat, messages: [...chat.messages, message] };
//     console.log(updatedChat);

//     dispatch(addMessage(updatedChat));
//   };
// };
