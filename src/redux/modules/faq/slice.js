import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestions } from './actions';

const faqReducer = createSlice({
  name: 'faq',
  initialState: {},
  reducers: {
    addQuestion: (state, action) => {
      const questions = JSON.parse(JSON.stringify([...state.questions]));
      return { ...state, questions: [...questions, action.payload] };
    },
    editQuestion: (state, action) => {
      const questions = JSON.parse(JSON.stringify([...state.questions]));

      const updateQuestions = questions.map((question) => {
        if (question.id === action.payload.id) {
          return action.payload;
        } else {
          return question;
        }
      });

      return { ...state, questions: updateQuestions };
    },
    delQuestion: (state, action) => {
      const questions = JSON.parse(JSON.stringify([...state.questions]));
      const filterQuestions = questions.filter(
        (question) => question.id !== action.payload,
      );

      return {
        ...state,
        questions: filterQuestions,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      return { ...state, questions: action.payload };
    });
  },
});

export default faqReducer.reducer;
