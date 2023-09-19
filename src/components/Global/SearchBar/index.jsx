import { useState } from 'react';

import { IoIosSearch } from 'react-icons/io';

import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ type }) {
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const searchURL = search
      .toLowerCase()
      .replace(/[áàãâä]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòõôö]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/ç/g, 'c')
      .replace(' ', '-');

    if (type === 'course') {
      navigate(`/courses/search/${searchURL}`);
    } else if (type === 'post') {
      navigate(`/newsletter/search/${searchURL}`);
    }
  };

  return (
    <Box className='w-full bg-white flex px-4 pb-[6px]'>
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
    </Box>
  );
}
