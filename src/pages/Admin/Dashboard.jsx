import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <main className='mainLayout !p-0 flex items-start'>
      <aside className='w-[150px] bg-sky-500 min-h-[calc(100vh-52px)] flex flex-col'>
        <Link
          to='/dashboard/courses'
          className='text-white font-bold min-w-full text-center hover:text-sky-400 hover:bg-white p-4 mt-4'
        >
          Cursos
        </Link>
      </aside>
      <Outlet />
    </main>
  );
}
