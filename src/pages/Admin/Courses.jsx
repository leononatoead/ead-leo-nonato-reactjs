import { useState } from 'react';
import { useSelector } from 'react-redux';

import AddCourse from '../../components/AddCourseModal';
import ProductCardAdmin from '../../components/ProductCardAdmin';

export default function Courses() {
  const [openCourseModal, setOpenCourseModal] = useState(false);

  const courses = useSelector((state) => state.courses.courses);

  return (
    <main className='mainLayout'>
      <div className='w-full flex justify-end'>
        <AddCourse
          openCourseModal={openCourseModal}
          setOpenCourseModal={setOpenCourseModal}
        />
      </div>

      {courses && (
        <ul className='grid grid-cols-4 gap-6 mt-6'>
          {courses?.map((course) => (
            <ProductCardAdmin cardData={course} key={course.id} />
          ))}
        </ul>
      )}
    </main>
  );
}
