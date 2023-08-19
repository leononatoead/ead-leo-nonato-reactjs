import React, { useEffect } from 'react';

import useFetchDocuments from '../../hooks/useFetchDocuments';

import AddCourse from '../../components/AddCourse';
import { Link } from 'react-router-dom';

export default function Courses() {
  const { documents, loadDocuments, loading } = useFetchDocuments('courses');

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <main className='mainHeight p-8'>
      <div className='w-full flex justify-end'>
        <AddCourse />
      </div>

      {documents && (
        <ul className='flex flex-col gap-2'>
          {documents.map((course) => (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              className='bg-sky-300 p-2 text-white font-bold '
            >
              {course.name}
            </Link>
          ))}
        </ul>
      )}
    </main>
  );
}
