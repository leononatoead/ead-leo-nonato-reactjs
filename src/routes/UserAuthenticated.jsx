import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Global/Home';
// import Course from '../pages/Global/Course';
import Newsletter from '../pages/Global/Newsletter';
import VerifyPhone from '../pages/Auth/VerifyPhone';
import VerifyEmail from '../pages/Auth/VerifyEmail';
import VerifySuccess from '../pages/Auth/VerifySuccess';
import Profile from '../pages/Global/Profile';
import FAQ from '../pages/Global/FAQ';
import CourseWatch from '../pages/Global/CourseWatch';
import Course from '../pages/Global/Course';

export default function UserAuthenticatedRoutes({ user }) {
  return (
    <Routes>
      <Route
        path='/register'
        element={
          !user.phoneNumber ? (
            <Navigate to='/verify-phone' />
          ) : !user.emailVerified ? (
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
          ) : !user.emailVerified ? (
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
          ) : !user.emailVerified ? (
            <Navigate to='/verify-email' />
          ) : (
            <Navigate to='/' />
          )
        }
      />

      <Route
        path='/verify-email'
        element={
          !user.emailVerified ? (
            <VerifyEmail />
          ) : !user.phoneNumber ? (
            <Navigate to='/verify-phone' />
          ) : (
            <Navigate to='/' />
          )
        }
      />

      <Route
        path='/verify-success'
        element={
          !user.emailVerified ? (
            <Navigate to='/verify-email' />
          ) : !user.phoneNumber ? (
            <Navigate to='/verify-phone' />
          ) : (
            <VerifySuccess />
          )
        }
      />

      <Route path='/profile' element={<Profile />} />
      <Route path='/faq' element={<FAQ />} />
      <Route path='/course/:id' element={<Course />} />
      <Route path='/course/:id/:id' element={<CourseWatch />} />
      <Route path='/newsletter' element={<Newsletter />} />
    </Routes>
  );
}
