import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { IoIosSearch } from 'react-icons/io';
import { useSelector } from 'react-redux';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState('');

  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courses) {
      const filter = courses.filter((course) => course.name.includes(search));

      setResults(filter);
    }
  }, [search]);

  const handleSearch = (formData) => {};

  return (
    <Box className='w-full relative'>
      <form className='w-full relative' onSubmit={handleSearch}>
        <IoIosSearch
          className='absolute top-2 left-2 text-gray-800'
          size={20}
          onClick={handleSearch}
        />
        <input
          type='text'
          placeholder='Pesquisar'
          onChange={(e) => setSearch(e.target.value)}
          className='bg-gray-150 w-full pl-9 pr-4 h-9 rounded-xl outline-none placeholder:text-gray-700'
        />
      </form>
      {/* {search && results && (
        <Box className='absolute w-screen min-h-[400px] bg-gray-200 z-10 -left-4 mt-1 shadow-sm p-4'>
          {results.map((course) => course.name)}
        </Box>
      )} */}
    </Box>
  );
}
