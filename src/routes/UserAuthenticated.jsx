import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Global/Home';
import Course from '../pages/Global/Course';
import Newsletter from '../pages/Global/Newsletter';
import VerifyPhone from '../pages/Auth/VerifyPhone';
import VerifyEmail from '../pages/Auth/VerifyEmail';

export default function UserAuthenticatedRoutes({ user }) {
  return (
    <Routes>
      <Route
        path='/register'
        element={
          !user.phoneNumber ? (
            <Navigate to='/verify-phone' />
          ) : !user.emailVeried ? (
            <Navigate to='/verify-email' />
          ) : (
            <Navigate to='/' />
          )
        }
      />

      <Route
        path='/'
        element={
          !user.phoneNumber ? (
            <Navigate to='/verify-phone' />
          ) : !user.emailVeried ? (
            <Navigate to='/verify-email' />
          ) : (
            <Home />
          )
        }
      />

      <Route
        path='/verify-phone'
        element={
          !user.phoneNumber ? (
            <VerifyPhone />
          ) : !user.emailVeried ? (
            <Navigate to='/verify-email' />
          ) : (
            <Navigate to='/' />
          )
        }
      />

      <Route
        path='/verify-email'
        element={
          !user.emailVeried ? (
            <VerifyEmail />
          ) : !user.phoneNumber ? (
            <Navigate to='/verify-phone' />
          ) : (
            <Navigate to='/' />
          )
        }
      />

      <Route path='/course/:id' element={<Course />} />
      <Route path='/newsletter' element={<Newsletter />} />
    </Routes>
  );
}
