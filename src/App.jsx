import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCourses,
  fetchCoursesFromLocalStorage,
} from './redux/modules/courses/actions';
import {
  fetchPosts,
  fetchPostsFromLocalStorage,
} from './redux/modules/posts/actions';

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
    const actualCourseTime = new Date();
    const verifyCourseUpdate = Math.abs(actualCourseTime - lastCoursesUpdate);
    const coursesMinutesDifference = Math.floor(verifyCourseUpdate / 60000);

    if (coursesMinutesDifference > 60) {
      dispatch(fetchCourses());
    } else {
      const courses = JSON.parse(localStorage.getItem('courses'));
      dispatch(fetchCoursesFromLocalStorage(courses));
    }

    const lastPostsUpdate = new Date(
      JSON.parse(localStorage.getItem('lastPostsUpdate')),
    );
    const actualPostTime = new Date();
    const verifyPostUpdate = Math.abs(actualPostTime - lastPostsUpdate);
    const postsMinutesDifference = Math.floor(verifyPostUpdate / 60000);

    if (postsMinutesDifference > 10) {
      dispatch(fetchPosts());
    } else {
      const posts = JSON.parse(localStorage.getItem('posts'));
      const pages = JSON.parse(localStorage.getItem('pages'));
      const currentPage = JSON.parse(localStorage.getItem('currentPage'));

      const data = { posts, pages, currentPage };
      dispatch(fetchPostsFromLocalStorage(data));
    }

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
