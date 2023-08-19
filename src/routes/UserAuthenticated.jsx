import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Global/Home';
import Course from '../pages/Global/Course';
import Newsletter from '../pages/Global/Newsletter';
import VerifyPhone from '../pages/Global/VerifyPhone';
import VerifyEmail from '../pages/Global/VerifyEmail';

export default function UserAuthenticatedRoutes({ user }) {
  return (
    <Routes>
      {user.emailVerified && user.phoneNumber ? (
        <Route path='/' element={<Home />} />
      ) : !user.phoneNumber ? (
        <Route path='/' element={<VerifyPhone />} />
      ) : (
        !user.emailVerified && <Route path='/' element={<VerifyEmail />} />
      )}
      <Route path='/course/:id' element={<Course />} />
      <Route path='/newsletter' element={<Newsletter />} />
    </Routes>
  );
}
