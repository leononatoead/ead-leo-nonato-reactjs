import { database } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const useCheckUpdate = () => {
  const verifyCourseUpdate = async () => {
    const courseUpdate = doc(database, 'updates', 'courses');

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
    const postsUpdate = doc(database, 'updates', 'posts');

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

  return { verifyCourseUpdate, verifyPostsUpdate };
};

export default useCheckUpdate;
