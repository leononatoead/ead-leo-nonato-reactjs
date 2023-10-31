import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserClassAndCoursePurchased,
  updateUserListWhenChangeAdminState,
} from "../redux/modules/users/actions";
import {
  updateAdminState,
  updateClassAndPurchasedCoursesToUser,
  updateConludedVideoState,
  updateQuizResult,
  updateRating,
  updateSurveyAnswer,
  updtateUserCourses,
  updtateUserCoursesVideos,
} from "../redux/modules/auth/actions";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { database } from "../firebase/config";
import { useToast } from "@chakra-ui/react";

const useUserData = () => {
  const [loading, setLoading] = useState(false);
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

  const changeAdminState = async (userId, value, actualUser) => {
    try {
      const userRef = doc(database, "users", userId);
      await updateDoc(userRef, { admin: value });

      if (actualUser.uid === userId) {
        dispatch(updateAdminState(value));
      }

      dispatch(
        updateUserListWhenChangeAdminState({ id: userId, admin: value }),
      );

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

      toast({
        description: "Usuário alterado com sucesso",
        status: "success",
        duration: "3000",
        isClosable: true,
      });
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

  const changeUserClassAndPurchasedCourses = async (
    userId,
    actualUser,
    classData,
    purchasedData,
  ) => {
    setLoading(true);
    try {
      const userRef = doc(database, "users", userId);
      await updateDoc(userRef, {
        studantClass: classData,
        purchased: purchasedData,
      });

      if (actualUser.uid === userId) {
        dispatch(
          updateClassAndPurchasedCoursesToUser({
            class: classData,
            purchased: purchasedData,
          }),
        );
      }

      dispatch(
        updateUserClassAndCoursePurchased({
          id: userId,
          class: classData,
          purchased: purchasedData,
        }),
      );

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
      toast({
        description: "Usuário alterado com sucesso",
        status: "success",
        duration: "3000",
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    addCourseToUser,
    addCourseVideosToUser,
    changeConcludedVideoState,
    ratingVideo,
    changeQuizResult,
    changeSurveyAnswer,
    changeAdminState,
    changeUserClassAndPurchasedCourses,
    loading,
  };
};

export default useUserData;
