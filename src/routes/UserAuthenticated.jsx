import { Routes, Route, Navigate } from 'react-router-dom';

import VerifyPhone from '../pages/Auth/VerifyPhone';
import VerifyEmail from '../pages/Auth/VerifyEmail';
import VerifySuccess from '../pages/Auth/VerifySuccess';
import Home from '../pages/Global/Home';
import HomeCourses from '../pages/Global/Courses';
import Course from '../pages/Global/Course';
import CourseWatch from '../pages/Global/CourseWatch';
import Newsletter from '../pages/Global/Newsletter';
import NewsletterPost from '../pages/Global/Newsletter/NewsletterPost';
import FAQ from '../pages/Global/FAQ';
import Profile from '../pages/Global/Profile';

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
      <Route path='/courses/:id' element={<HomeCourses />} />
      <Route path='/course/:id' element={<Course />} />
      <Route path='/course/:id/:id' element={<CourseWatch />} />
      {/* <Route path='/my-courses' element={<MyCourses />} /> */}
      <Route path='/newsletter' element={<Newsletter />} />
      <Route path='/newsletter/post/:id' element={<NewsletterPost />} />
      <Route path='/faq' element={<FAQ />} />

      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
}
