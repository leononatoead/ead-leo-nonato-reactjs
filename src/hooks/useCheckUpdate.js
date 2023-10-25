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

  const verifyBannersUpdate = async () => {
    const bannersUpdate = doc(database, "updates", "banners");

    const document = await getDoc(bannersUpdate);
    const lastUpdate = document.data()?.lastBannersUpdate?.toMillis();

    let time;
    if (lastUpdate) {
      time = new Date(document.data()?.lastBannersUpdate?.toMillis());
    } else {
      time = null;
    }

    return time;
  };

  return {
    verifyUsersUpdate,
    verifyCourseUpdate,
    verifyBannersUpdate,
    verifyPostsUpdate,
  };
};

export default useCheckUpdate;
