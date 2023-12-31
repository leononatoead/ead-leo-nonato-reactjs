import { database } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const useCheckUpdate = () => {
  const verifyUsersUpdate = async (id) => {
    const userUpdate = doc(database, "updates", "users", "updates", id);

    const document = await getDoc(userUpdate);

    const lastUpdate = document.data()?.lastUserUpdate?.toMillis();

    let time;
    if (lastUpdate) {
      time = new Date(document.data()?.lastUserUpdate?.toMillis());
    } else {
      time = null;
    }

    return time;
  };

  const verifyCourseUpdate = async () => {
    const courseUpdate = doc(database, "updates", "courses");

    const document = await getDoc(courseUpdate);

    const lastUpdate = document.data()?.lastCoursesUpdate?.toMillis();

    let time;
    if (lastUpdate) {
      time = new Date(document.data()?.lastCoursesUpdate?.toMillis());
    } else {
      time = null;
    }

    return time;
  };

  const verifyPostsUpdate = async () => {
    const postsUpdate = doc(database, "updates", "posts");

    const document = await getDoc(postsUpdate);
    const lastUpdate = document.data()?.lastPostsUpdate?.toMillis();

    let time;
    if (lastUpdate) {
      time = new Date(document.data()?.lastPostsUpdate?.toMillis());
    } else {
      time = null;
    }

    return time;
  };

  const verifySettingsUpdate = async () => {
    const settingsUpdate = doc(database, "updates", "settings");

    const document = await getDoc(settingsUpdate);
    const lastUpdate = document.data()?.lastSettingsUpdate?.toMillis();

    let time;
    if (lastUpdate) {
      time = new Date(document.data()?.lastSettingsUpdate?.toMillis());
    } else {
      time = null;
    }

    return time;
  };

  return {
    verifyUsersUpdate,
    verifyCourseUpdate,
    verifySettingsUpdate,
    verifyPostsUpdate,
  };
};

export default useCheckUpdate;
