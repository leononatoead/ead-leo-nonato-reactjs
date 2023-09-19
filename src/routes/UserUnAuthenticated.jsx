import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Global/Home';
import Register from '../pages/Auth/Register';
import ChangePasswordSuccess from '../pages/Auth/ChangePasswordSuccess';
import FAQ from '../pages/Global/FAQ';
import HomeCourses from '../pages/Global/Courses';
import Course from '../pages/Global/Course';
import CourseWatch from '../pages/Global/CourseWatch';
import Newsletter from '../pages/Global/Newsletter';
import NewsletterPost from '../pages/Global/Newsletter/NewsletterPost';

export default function UserUnAuthenticatedRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route
        path='/change-password-success'
        element={<ChangePasswordSuccess />}
      />

      <Route path='/courses/:id' element={<HomeCourses />} />
      <Route path='/course/:id' element={<Course />} />
      <Route path='/course/:id/:id' element={<CourseWatch />} />
      <Route path='/newsletter' element={<Newsletter />} />
      <Route path='/newsletter/post/:id' element={<NewsletterPost />} />
      <Route path='/faq' element={<FAQ />} />

      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
}
