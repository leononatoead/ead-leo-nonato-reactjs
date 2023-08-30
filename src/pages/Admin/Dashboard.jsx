import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import DashboardNavbar from '../../components/Admin/DashboardNavbar';

export default function Dashboard() {
  return (
    <main className='min-h-screen'>
      <DashboardNavbar />
      <Outlet />
    </main>
  );
}
