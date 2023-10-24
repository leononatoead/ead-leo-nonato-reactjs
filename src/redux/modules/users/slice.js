import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./actions";

const usersDataReducer = createSlice({
  name: "usersData",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const storageUsers = JSON.stringify([...action.payload]);
      localStorage.setItem("dashboardUsers", storageUsers);

      return { ...state, userList: action.payload };
    });
  },
});

export default usersDataReducer.reducer;
