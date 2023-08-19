import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useFetchDocuments from '../../hooks/useFetchDocuments';

import AddCourse from '../../components/AddCourseModal';
import ProductCard from '../../components/ProductCard';

export default function Courses() {
  const [openCourseModal, setOpenCourseModal] = useState(false);

  const { documents, loadDocuments, loading } = useFetchDocuments('courses');

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <main className='mainLayout'>
      <div className='w-full flex justify-end'>
        <AddCourse
          openCourseModal={openCourseModal}
          setOpenCourseModal={setOpenCourseModal}
        />
      </div>

      {documents && (
        <ul className='grid grid-cols-4 gap-6'>
          {documents.map((course) => (
            <Link to={`/courses/${course.id}`} key={course.id}>
              <ProductCard cardData={course} />
            </Link>
          ))}
        </ul>
      )}
    </main>
  );
}
