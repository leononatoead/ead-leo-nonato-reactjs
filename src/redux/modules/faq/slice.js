import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestions } from './actions';

const faqReducer = createSlice({
  name: 'faq',
  initialState: {},
  reducers: {
    addQuestion: (state, action) => {
      const questions = JSON.parse(JSON.stringify([...state.questions]));
      if (questions) {
        const storageQuestions = JSON.stringify([...questions, action.payload]);
        localStorage.setItem('FAQ', storageQuestions);
      } else {
        const storageQuestions = JSON.stringify([action.payload]);
        localStorage.setItem('FAQ', storageQuestions);
      }

      const updatedAt = JSON.stringify(new Date());
      localStorage.setItem('lastFAQUpdate', updatedAt);

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

      const storageQuestions = JSON.stringify([...updateQuestions]);
      localStorage.setItem('FAQ', storageQuestions);

      const updatedAt = JSON.stringify(new Date());
      localStorage.setItem('lastFAQUpdate', updatedAt);

      return { ...state, questions: updateQuestions };
    },
    delQuestion: (state, action) => {
      const questions = JSON.parse(JSON.stringify([...state.questions]));
      const filterQuestions = questions.filter(
        (question) => question.id !== action.payload,
      );

      const storageQuestions = JSON.stringify([...filterQuestions]);
      localStorage.setItem('FAQ', storageQuestions);

      const updatedAt = JSON.stringify(new Date());
      localStorage.setItem('lastFAQUpdate', updatedAt);

      return {
        ...state,
        questions: filterQuestions,
      };
    },
    fetchFAQFromLocalStorage: (state, action) => {
      return { ...state, questions: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      const storageQuestions = JSON.stringify([...action.payload]);
      localStorage.setItem('FAQ', storageQuestions);

      const updatedAt = JSON.stringify(new Date());
      localStorage.setItem('lastFAQUpdate', updatedAt);

      return { ...state, questions: action.payload };
    });
  },
});

export default faqReducer.reducer;
