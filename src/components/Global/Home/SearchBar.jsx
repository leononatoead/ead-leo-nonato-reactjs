import React from 'react';
import { useForm } from 'react-hook-form';

import { IoIosSearch } from 'react-icons/io';

export default function SearchBar() {
  const { register, handleSubmit } = useForm();

  const handleSearch = (formData) => {
    console.log(formData);
  };

  return (
    <form className='w-full relative' onSubmit={handleSubmit(handleSearch)}>
      <IoIosSearch
        className='absolute top-2 left-2 text-gray-800'
        size={20}
        onClick={handleSubmit(handleSearch)}
      />
      <input
        type='text'
        {...register('search')}
        placeholder='Pesquisar'
        className='bg-gray-150 w-full pl-9 pr-4 h-9 rounded-xl outline-none placeholder:text-gray-700'
      />
    </form>
  );
}
