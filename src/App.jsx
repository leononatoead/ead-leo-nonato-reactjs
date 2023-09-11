import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from './redux/modules/courses/actions';

import { ChakraProvider } from '@chakra-ui/react';

import AdminRoutes from './routes/Admin';

import UserAuthenticated from './routes/UserAuthenticated';
import UserUnAuthenticated from './routes/UserUnAuthenticated';
import useAuth from './hooks/useAuth';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { authUser, loadingAuth } = useAuth();

  useEffect(() => {
    dispatch(fetchCourses());
    authUser();
  }, []);

  return (
    <ChakraProvider>
      {loadingAuth ? (
        'loadingAuth'
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
