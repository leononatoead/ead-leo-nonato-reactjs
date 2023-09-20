import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCourses,
  fetchCoursesFromLocalStorage,
} from './redux/modules/courses/actions';
import { fetchPosts } from './redux/modules/posts/actions';

import { ChakraProvider } from '@chakra-ui/react';

import AdminRoutes from './routes/Admin';

import UserAuthenticated from './routes/UserAuthenticated';
import UserUnAuthenticated from './routes/UserUnAuthenticated';
import useAuth from './hooks/useAuth';
import Loading from './pages/Loading';

function App() {
  const { authUser, loadingAuth } = useAuth();
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const lastCoursesUpdate = new Date(
      JSON.parse(localStorage.getItem('lastCoursesUpdate')),
    );
    const actualTime = new Date();
    const verifyCourseUpdate = Math.abs(actualTime - lastCoursesUpdate);
    const coursesMinutesDifference = Math.floor(verifyCourseUpdate / 60000);

    if (coursesMinutesDifference > 60) {
      dispatch(fetchCourses());
    } else {
      const courses = JSON.parse(localStorage.getItem('courses'));
      dispatch(fetchCoursesFromLocalStorage(courses));
    }

    dispatch(fetchPosts());
    authUser();
  }, []);

  return (
    <ChakraProvider>
      {loadingAuth ? (
        <Loading />
      ) : (
        <>
          {!loadingAuth && user ? (
            user.admin ? (
              <AdminRoutes />
            ) : (
              <UserAuthenticated user={user} />
            )
          ) : (
            <UserUnAuthenticated />
          )}
        </>
      )}
    </ChakraProvider>
  );
}

export default App;
