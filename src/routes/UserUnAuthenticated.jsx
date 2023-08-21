import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Global/Home';
import Newsletter from '../pages/Global/Newsletter';
import Register from '../pages/Global/Register';

export default function UserUnAuthenticatedRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/newsletter' element={<Newsletter />} />
      <Route path='/register' element={<Register />} />
      {/* <Route path='/*' element={<Navigate to='/' />} /> */}
    </Routes>
  );
}
