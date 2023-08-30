import { useState } from 'react';
import { useSelector } from 'react-redux';

import AddCourse from '../../components/Admin/AddCourseModal';
import VideoCardAdmin from '../../components/Admin/VideoCardAdmin';

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
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
          {courses?.map((course) => (
            <VideoCardAdmin cardData={course} key={course.id} />
          ))}
        </ul>
      )}
    </main>
  );
}
