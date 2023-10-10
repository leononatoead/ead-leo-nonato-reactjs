import { Outlet } from 'react-router-dom';

import Navbar from '../../components/Global/Navbar';

export default function Dashboard() {
  return (
    <main className='min-h-[100dvh]'>
      <Navbar title={'Dashboard'} />
      <Outlet />
    </main>
  );
}
