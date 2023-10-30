import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  fetchCoursesFromLocalStorage,
} from "./redux/modules/courses/actions";
import {
  fetchPosts,
  fetchPostsFromLocalStorage,
} from "./redux/modules/posts/actions";

import { ChakraProvider } from "@chakra-ui/react";

import AdminRoutes from "./routes/Admin";

import UserAuthenticated from "./routes/UserAuthenticated";
import UserUnAuthenticated from "./routes/UserUnAuthenticated";
import useAuth from "./hooks/useAuth";
import Loading from "./pages/Loading";
import useCheckUpdate from "./hooks/useCheckUpdate";

function App() {
  const { authUser, loadingAuth } = useAuth();
  const { verifyCourseUpdate, verifyPostsUpdate } = useCheckUpdate();
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const firestoreCoursesUpdate = await verifyCourseUpdate();
        const lastCoursesUpdate =
          new Date(JSON.parse(localStorage.getItem("lastCoursesUpdate"))) || 0;

        const calcCourse = firestoreCoursesUpdate - lastCoursesUpdate;

        if (calcCourse !== 0) {
          dispatch(fetchCourses());
        } else {
          const courses = JSON.parse(localStorage.getItem("courses"));
          dispatch(fetchCoursesFromLocalStorage(courses));
        }
      } catch (error) {
        console.error("Erro ao buscar a última atualização do curso:", error);
      }
    };

    const fetchPostData = async () => {
      try {
        const firestorePostsUpdate = await verifyPostsUpdate();
        const lastPostsUpdate =
          new Date(JSON.parse(localStorage.getItem("lastPostsUpdate"))) || 0;

        const calcPosts = firestorePostsUpdate - lastPostsUpdate;

        if (calcPosts !== 0) {
          dispatch(fetchPosts());
        } else {
          const posts = JSON.parse(localStorage.getItem("posts"));
          const pages = JSON.parse(localStorage.getItem("pages"));
          const currentPage = JSON.parse(localStorage.getItem("currentPage"));

          const data = { posts, pages, currentPage };
          dispatch(fetchPostsFromLocalStorage(data));
        }
      } catch (error) {
        console.error("Erro ao buscar a última atualização dos posts:", error);
      }
    };

    fetchCoursesData();
    fetchPostData();

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
