import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { database } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { updtateUserCourses } from '../redux/modules/auth/actions';

const useUserData = () => {
  const dispatch = useDispatch();

  const addCourseToUser = async (id, newCourse, prev = null) => {
    try {
      const userRef = doc(database, 'users', id);

      let data;

      if (prev) {
        data = {
          courses: [
            ...prev,
            { courseId: newCourse, createdAt: Timestamp.now().toMillis() },
          ],
        };
      } else {
        data = {
          courses: [
            { courseId: newCourse, createdAt: Timestamp.now().toMillis() },
          ],
        };
      }

      await updateDoc(userRef, data);
      dispatch(updtateUserCourses(data.courses));
    } catch (error) {
      console.log(error);
    }
  };

  return { addCourseToUser };
};

export default useUserData;
