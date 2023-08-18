import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Global/Home';
import Course from '../pages/Global/Course';
import Newsletter from '../pages/Global/Newsletter';
import VerifyPhone from '../pages/Global/VerifyPhone';

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
