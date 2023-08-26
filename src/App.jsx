import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from './redux/modules/courses/actions';
import { verifyAuthentication } from './redux/modules/auth/actions';

import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-components';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import AdminRoutes from './routes/Admin';

import UserAuthenticated from './routes/UserAuthenticated';
import UserUnAuthenticated from './routes/UserUnAuthenticated';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(verifyAuthentication());
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      {/* <Navbar /> */}
      {user && user.admin && <AdminRoutes />}
      {user && !user.admin && <UserAuthenticated user={user} />}
      {!user && <UserUnAuthenticated />}

      <Toaster toastOptions={{ duration: 4000 }} />
    </FluentProvider>
  );
}

export default App;
