import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Global/Home';
import Course from '../pages/Global/Course';
import Newsletter from '../pages/Global/Newsletter';
import Register from '../pages/Global/Register/';
import VerifyPhone from '../pages/Global/VerifyPhone';

import Dashboard from '../pages/Admin/Dashboard';
import Courses from '../pages/Admin/Courses';
import CourseDetails from '../pages/Admin/CourseDetails';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/course/:id' element={<Course />} />
      <Route path='/newsletter' element={<Newsletter />} />
      <Route path='/register' element={<Register />} />
      <Route path='/validate' element={<VerifyPhone />} />

      <Route path='/dashboard' element={<Dashboard />}>
        <Route path='courses' element={<Courses />} />
        <Route path='courses/:id' element={<CourseDetails />} />
      </Route>
    </Routes>
  );
}
