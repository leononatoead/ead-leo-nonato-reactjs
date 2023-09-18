import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import { IoIosSearch } from 'react-icons/io';

export default function SearchBar() {
  const [search, setSearch] = useState('');

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
    </Box>
  );
}
