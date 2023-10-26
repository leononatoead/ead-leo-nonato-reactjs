import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./actions";

const usersDataReducer = createSlice({
  name: "usersData",
  initialState: {},
  reducers: {
    updateUserListWhenChangeAdminState: (state, action) => {
      const { userList } = JSON.parse(JSON.stringify(state));

      const updatedList = userList.map((user) => {
        if (user.id === action.payload.id) {
          const updatedUser = { ...user, admin: action.payload.admin };
          return updatedUser;
        } else return user;
      });

      return {
        ...state,
        userList: updatedList,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const storageUsers = JSON.stringify([...action.payload]);
      localStorage.setItem("dashboardUserList", storageUsers);

      return { ...state, userList: action.payload };
    });
  },
});

export default usersDataReducer.reducer;
