import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Course from '../pages/Course';
import Newsletter from '../pages/Newsletter';
import VerifyPhone from '../pages/VerifyPhone';

export default function UserAuthenticatedRoutes({ user }) {
  return (
    <Routes>
      {user.emailVerified && user.phoneNumber ? (
        <Route path='/' element={<Home />} />
      ) : (
        <Route path='/' element={<VerifyPhone />} />
      )}
      <Route path='/course' element={<Course />} />
      <Route path='/newsletter' element={<Newsletter />} />
    </Routes>
  );
}
