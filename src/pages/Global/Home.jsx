import { useEffect, useState } from 'react';

import LoginModal from '../../components/LoginModal';
import useFetchDocuments from '../../hooks/useFetchDocuments';
import ProductCard from '../../components/ProductCard';

export default function Home() {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const { documents, loadDocuments, loading } = useFetchDocuments('courses');

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <main className='mainLayout'>
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />

      {documents && (
        <ul className='grid grid-cols-4 gap-6'>
          {documents.map((course) => (
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
