import { createSlice } from '@reduxjs/toolkit';
import { fetchForms } from './actions';

const formsReducer = createSlice({
  name: 'forms',
  initialState: {},
  reducers: {
    newForm: (state, action) => {
      const forms = JSON.parse(JSON.stringify([...state.forms]));

      return { ...state, forms: [...forms, action.payload] };
    },
    editForm: (state, action) => {
      const forms = JSON.parse(JSON.stringify([...state.forms]));

      const updateForms = forms.map((form) => {
        if (form.id === action.payload.id) {
          return action.payload;
        } else {
          return form;
        }
      });

      return { ...state, forms: updateForms };
    },
    delForm: (state, action) => {
      const forms = JSON.parse(JSON.stringify([...state.forms]));
      const filterForms = forms.filter((form) => form.id !== action.payload);

      return {
        ...state,
        forms: filterForms,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForms.fulfilled, (state, action) => {
      return { ...state, forms: action.payload };
    });
  },
});

export default formsReducer.reducer;
