import { useEffect } from 'react';
import ModalLogin from '../components/ModalLogin';
import ProductList from '../components/ProductList';
import {
  logoutUser,
  verifyAuthentication
} from '../redux/modules/auth/actions';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAuthentication());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <button
        className='text-3xl border-2 bg-red-600 text-white p-4'
        onClick={handleLogout}
      >
        Logout
      </button>
      Home
      <ProductList />
      <ModalLogin />
    </div>
  );
}
