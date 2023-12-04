import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "../../../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export const fetchUsers = createAsyncThunk("usersData/fetchUsers", async () => {
  const collectionRef = collection(database, "users");

  try {
    const q = query(collectionRef, orderBy("name", "asc"));

    return new Promise((resolve, reject) => {
      onSnapshot(
        q,
        (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          resolve(data);
        },
        (error) => {
          reject(error);
        },
      );
    });
  } catch (error) {
    console.log(error.message);
  }
});

export const updateUserListWhenChangeAdminState = (data) => {
  return {
    type: "usersData/updateUserListWhenChangeAdminState",
    payload: data,
  };
};

export const updateUserClassAndCoursePurchased = (data) => {
  return {
    type: "usersData/updateUserClassAndCoursePurchased",
    payload: data,
  };
};

export const updateUserDeleteState = (data) => {
  return {
    type: "usersData/updateUserDeleteState",
    payload: data,
  };
};
