import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Global/Home';
import Course from '../pages/Global/Course';
import CourseWatch from '../pages/Global/CourseWatch';
import Newsletter from '../pages/Global/Newsletter';

import Dashboard from '../pages/Admin/Dashboard';
import Courses from '../pages/Admin/Courses';
import CourseDetails from '../pages/Admin/Courses/CourseDetails';
import NewCourse from '../pages/Admin/Courses/NewCourse';
import NewLesson from '../pages/Admin/Courses/NewLesson';
import EditLesson from '../pages/Admin/Courses/EditLesson';
import EditCourse from '../pages/Admin/Courses/EditCourse';
import DashboardFAQ from '../pages/Admin/FAQ';
import NewQuestion from '../pages/Admin/FAQ/NewQuestion';
import EditQuestion from '../pages/Admin/FAQ/EditQuestion';
import Profile from '../pages/Global/Profile';
import FAQ from '../pages/Global/FAQ';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/course/:id' element={<Course />} />
      <Route path='/course/:id/:id' element={<CourseWatch />} />
      <Route path='/newsletter' element={<Newsletter />} />
      <Route path='/faq' element={<FAQ />} />

      <Route path='/profile' element={<Profile />} />
      <Route path='/dashboard' element={<Dashboard />}>
        <Route path='/dashboard' element={<Courses />} />
        <Route path='courses' element={<Courses />} />
        <Route path='courses/new' element={<NewCourse />} />
        <Route path='courses/:id' element={<CourseDetails />} />
        <Route path='courses/:id/new' element={<NewLesson />} />
        <Route path='courses/:id/edit' element={<EditCourse />} />
        <Route path='courses/:id/edit/:id' element={<EditLesson />} />
        <Route path='faq' element={<DashboardFAQ />} />
        <Route path='faq/new' element={<NewQuestion />} />
        <Route path='faq/edit/:id' element={<EditQuestion />} />
      </Route>
    </Routes>
  );
}
