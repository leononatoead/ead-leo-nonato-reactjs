import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Newsletter from '../pages/Newsletter';
import Register from '../pages/Register';

export default function UserUnAuthenticatedRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/newsletter' element={<Newsletter />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}
