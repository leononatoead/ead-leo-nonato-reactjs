import { database } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const useCheckUpdate = () => {
  const verifyCourseUpdate = async () => {
    const courseUpdate = doc(database, 'updates', 'courses');

    const document = await getDoc(courseUpdate);

    const time = new Date(document.data().lastCoursesUpdate.toMillis());

    return time;
  };

  return { verifyCourseUpdate };
};

export default useCheckUpdate;
