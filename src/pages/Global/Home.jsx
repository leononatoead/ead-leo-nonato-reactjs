import { useState } from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import LoginModal from '../../components/LoginModal';
import ProductCard from '../../components/ProductCard';

export default function Home() {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const courses = useSelector((state) => state.courses.courses);

  return (
    <main className='h-screen'>
      <Navbar />
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />

      {courses && (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6  px-6'>
          {courses.map((course) => (
            <li key={course.id}>
              <ProductCard
                cardData={course}
                setOpenLoginModal={setOpenLoginModal}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
