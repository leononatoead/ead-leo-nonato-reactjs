import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { database } from "../firebase/config";
import { useDispatch } from "react-redux";
import {
  updateConludedVideoState,
  updateQuizResult,
  updateRating,
  updateSurveyAnswer,
  updtateUserCourses,
  updtateUserCoursesVideos,
} from "../redux/modules/auth/actions";
import { useToast } from "@chakra-ui/react";

const useUserData = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const addCourseToUser = async (userId, courseData, prevCourses) => {
    try {
      const userRef = doc(database, "users", userId);

      let courses;
      if (prevCourses) {
        courses = { courses: [...prevCourses, courseData] };
        await updateDoc(userRef, courses);
      } else {
        courses = { courses: [courseData] };
        await updateDoc(userRef, courses);
      }

      dispatch(updtateUserCourses(courses));

      const updateTime = Timestamp.now();
      const updateCollection = doc(
        database,
        "updates",
        "users",
        "updates",
        userId,
      );

      updateDoc(updateCollection, { lastUserUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastUserUpdate", updatedAt);
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: "3000",
        isClosable: true,
      });
    }
  };

  const addCourseVideosToUser = async (userId, coursesData) => {
    try {
      const userRef = doc(database, "users", userId);
      await updateDoc(userRef, { courses: coursesData });

      dispatch(updtateUserCoursesVideos(coursesData));

      const updateTime = Timestamp.now();
      const updateCollection = doc(
        database,
        "updates",
        "users",
        "updates",
        userId,
      );

      updateDoc(updateCollection, { lastUserUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastUserUpdate", updatedAt);
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: "3000",
        isClosable: true,
      });
    }
  };

  const changeConcludedVideoState = async (userId, coursesData) => {
    try {
      const userRef = doc(database, "users", userId);
      await updateDoc(userRef, { courses: coursesData });

      dispatch(updateConludedVideoState(coursesData));

      const updateTime = Timestamp.now();
      const updateCollection = doc(
        database,
        "updates",
        "users",
        "updates",
        userId,
      );

      updateDoc(updateCollection, { lastUserUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastUserUpdate", updatedAt);
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: "3000",
        isClosable: true,
      });
    }
  };

  const ratingVideo = async (userId, coursesData) => {
    try {
      const userRef = doc(database, "users", userId);
      await updateDoc(userRef, { courses: coursesData });

      dispatch(updateRating(coursesData));

      const updateTime = Timestamp.now();
      const updateCollection = doc(
        database,
        "updates",
        "users",
        "updates",
        userId,
      );

      updateDoc(updateCollection, { lastUserUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastUserUpdate", updatedAt);
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      console.log(error);
    }
  };

  const changeQuizResult = async (userId, coursesData) => {
    try {
      const userRef = doc(database, "users", userId);
      await updateDoc(userRef, { courses: coursesData });

      dispatch(updateQuizResult(coursesData));

      const updateTime = Timestamp.now();
      const updateCollection = doc(
        database,
        "updates",
        "users",
        "updates",
        userId,
      );

      updateDoc(updateCollection, { lastUserUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastUserUpdate", updatedAt);
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      console.log(error);
    }
  };

  const changeSurveyAnswer = async (userId, coursesData) => {
    try {
      const userRef = doc(database, "users", userId);
      await updateDoc(userRef, { courses: coursesData });

      dispatch(updateSurveyAnswer(coursesData));

      const updateTime = Timestamp.now();
      const updateCollection = doc(
        database,
        "updates",
        "users",
        "updates",
        userId,
      );

      updateDoc(updateCollection, { lastUserUpdate: updateTime });
      const updatedAt = JSON.stringify(new Date(updateTime.toMillis()));
      localStorage.setItem("lastUserUpdate", updatedAt);
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      console.log(error);
    }
  };

  return {
    addCourseToUser,
    addCourseVideosToUser,
    changeConcludedVideoState,
    ratingVideo,
    changeQuizResult,
    changeSurveyAnswer,
  };
};

export default useUserData;
