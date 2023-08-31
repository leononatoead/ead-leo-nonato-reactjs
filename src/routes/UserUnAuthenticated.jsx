import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Global/Home';
import Register from '../pages/Auth/Register';
import ChangePasswordSuccess from '../pages/Auth/ChangePasswordSuccess';
import FAQ from '../pages/Global/FAQ';

export default function UserUnAuthenticatedRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/faq' element={<FAQ />} />

      <Route
        path='/change-password-success'
        element={<ChangePasswordSuccess />}
      />
    </Routes>
  );
}
