import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Course from '../pages/Course';
import Dashboard from '../pages/Dashboard';
import Newsletter from '../pages/Newsletter';
import Register from '../pages/Register/';
import VerifyPhone from '../pages/VerifyPhone';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/course' element={<Course />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/newsletter' element={<Newsletter />} />
      <Route path='/register' element={<Register />} />
      <Route path='/validate' element={<VerifyPhone />} />
    </Routes>
  );
}
