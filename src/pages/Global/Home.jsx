import { useState } from 'react';
import { useSelector } from 'react-redux';

import LoginModal from '../../components/LoginModal';
import ProductCard from '../../components/ProductCard';

export default function Home() {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const courses = useSelector((state) => state.courses.courses);

  return (
    <main className='mainLayout'>
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />

      {courses && (
        <ul className='grid grid-cols-4 gap-6'>
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
