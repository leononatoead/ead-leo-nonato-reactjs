import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { searchCourse } from '../../redux/modules/courses/actions';

import Navbar from '../../components/Global/Navbar';
import CourseCard from '../../components/Global/Courses/CourseCard';
import SearchBar from '../../components/Global/SearchBar';

import { Box, Text } from '@chakra-ui/react';

export default function SearchCourses() {
  const { id } = useParams();
  const { searchResults } = useSelector((state) => state.courses);
  console.log(searchResults);

  const dispatch = useDispatch();

  useEffect(() => {
    const search = id
      .replace(/[áàãâä]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòõôö]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/ç/g, 'c')
      .replace(/[^\w\s]/gi, '')
      .replace('-', ' ');

    dispatch(searchCourse(search));
  }, [id]);

  return (
    <Box className='min-h-screen bg-gray-200 flex flex-col'>
      <Navbar title={'Pesquisa'} />

      <SearchBar type='course' />

      {searchResults && searchResults?.length > 0 ? (
        <ul className='px-4 py-6 flex flex-col gap-4'>
          {searchResults?.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </ul>
      ) : (
        <Box className='px-4 py-6 flex flex-col items-center justify-center gap-4 flex-1'>
          <Text>Nenhum curso encontrado.</Text>
        </Box>
      )}
    </Box>
  );
}
