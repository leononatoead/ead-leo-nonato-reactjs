import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Global/Home';
import Newsletter from '../pages/Global/Newsletter';
import Register from '../pages/Auth/Register';
import ChangePasswordSuccess from '../pages/Auth/ChangePasswordSuccess';

export default function UserUnAuthenticatedRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/newsletter' element={<Newsletter />} />
      <Route path='/register' element={<Register />} />

      <Route
        path='/change-password-success'
        element={<ChangePasswordSuccess />}
      />
    </Routes>
  );
}
