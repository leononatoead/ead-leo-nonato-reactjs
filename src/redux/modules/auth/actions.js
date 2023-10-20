import { auth } from "../../../firebase/config";
import { signOut } from "firebase/auth";

import {
  AUTH_USER,
  UPDATE_IMAGE,
  LOGOUT_USER,
  UPDATE_USER_COURSES,
  UPDATE_USER_COURSE_VIDEOS,
  ADD_LIKED_POST_TO_USER,
  UPDATE_USER_CONCLUDED_VIDEOS,
  REMOVE_LIKED_POST_FROM_USER,
} from "./slice";

export const verifyAuthentication = (user) => (dispatch) => {
  if (user) {
    dispatch({ type: AUTH_USER, payload: user });
  } else {
    dispatch({ type: AUTH_USER, payload: null });
  }
};

export const logoutUser = () => async (dispatch) => {
  await signOut(auth);

  dispatch({
    type: LOGOUT_USER,
    payload: null,
  });
};

export const updateProfileImage = (url) => async (dispatch) => {
  dispatch({
    type: UPDATE_IMAGE,
    payload: url,
  });
};

export const updtateUserCourses = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_COURSES,
    payload: data,
  });
};

export const updtateUserCoursesVideos = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_COURSE_VIDEOS,
    payload: data,
  });
};

export const updateConludedVideoState = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_CONCLUDED_VIDEOS,
    payload: data,
  });
};

export const addLikedPostToUser = (data) => async (dispatch) => {
  dispatch({
    type: ADD_LIKED_POST_TO_USER,
    payload: data,
  });
};

export const removeLikedPostFromUser = (data) => async (dispatch) => {
  dispatch({
    type: REMOVE_LIKED_POST_FROM_USER,
    payload: data,
  });
};
