import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Course from '../pages/Course';
import Newsletter from '../pages/Newsletter';
import VerifyPhone from '../pages/VerifyPhone';

export default function UserAuthenticatedRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/course' element={<Course />} />
      <Route path='/newsletter' element={<Newsletter />} />
      <Route path='/validate' element={<VerifyPhone />} />
    </Routes>
  );
}
