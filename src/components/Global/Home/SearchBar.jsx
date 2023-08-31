import React from 'react';
import { useForm } from 'react-hook-form';

import { Search20Regular } from '@fluentui/react-icons';

export default function SearchBar() {
  const { register, handleSubmit } = useForm();

  const handleSearch = (formData) => {
    console.log(formData);
  };

  return (
    <form className='w-full relative' onSubmit={handleSubmit(handleSearch)}>
      <Search20Regular
        color='#808080'
        className='absolute top-2 left-2'
        onClick={handleSubmit(handleSearch)}
      />
      <input
        type='text'
        {...register('search')}
        placeholder='Pesquise aqui'
        className='bg-[#f0f0f0] w-full pl-9 pr-4 h-9 rounded-xl outline-none'
      />
    </form>
  );
}
