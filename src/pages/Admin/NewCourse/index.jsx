import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddCourseSchema } from './addCourseSchema';

import useCourse from '../../../hooks/useCourse';

import Input from '../../../components/Global/Input';
import ButtonSubmit from '../../../components/Global/ButtonSubmit';

import { Box, Switch } from '@chakra-ui/react';

export default function NewCourse() {
  const [isFree, setIsFree] = useState(false);
  const [needAuth, setNeedAuth] = useState(true);
  const [imageFile, setImageFile] = useState();
  const [error, setError] = useState();

  const { addNewCourse, loading } = useCourse();

  const handleSwitch = (type) => {
    if (type === 'isFree') {
      setIsFree((prev) => !prev);
    } else setNeedAuth((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddCourseSchema),
  });

  const handlAddCourse = async (formData) => {
    setError(null);

    const data = { ...formData, isFree, needAuth };

    if (imageFile) {
      addNewCourse(data, 'courses', imageFile);
    } else {
      setError('Envie uma imagem!');
    }
  };

  return (
    <Box className='min-h-[calc(100vh-40px)] px-4 py-6 flex flex-col'>
      <form
        id='addCourseForm'
        onSubmit={handleSubmit(handlAddCourse)}
        className='flex flex-col gap-[10px] flex-grow'
      >
        <Box className='mb-4'>
          <label
            htmlFor={'image'}
            className='text-base leading-5 !mb-[9px] block'
          >
            Imagem
          </label>
          <input
            id='image'
            type='file'
            className='w-full outline-none text-base'
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <span className='errorText'>{error}</span>
        </Box>
        <Input
          theme={'light'}
          type={'text'}
          label={'Nome'}
          placeholder={'Digite aqui'}
          register={register}
          id={'name'}
          error={errors?.name?.message}
          watch={watch}
        />
        <Input
          theme={'light'}
          type={'text'}
          label={'Descrição'}
          placeholder={'Digite aqui'}
          register={register}
          id={'description'}
          error={errors?.description?.message}
          watch={watch}
        />
        <Input
          theme={'light'}
          type={'text'}
          label={'Autor'}
          placeholder={'Digite aqui'}
          register={register}
          id={'author'}
          error={errors?.author?.message}
          watch={watch}
        />
        <Box className='flex justify-start items-center gap-4 mb-[5px]'>
          <Switch id='isFree' onChange={() => handleSwitch('isFree')} />
          <label htmlFor={'isFree'} className='text-base leading-5'>
            Grátis
          </label>
        </Box>
        <Box className='flex justify-start items-center gap-4'>
          <Switch
            id='needAuth'
            defaultChecked
            onChange={() => handleSwitch('needAuth')}
          />
          <label htmlFor={'needAuth'} className='text-base leading-5'>
            Requer cadastro
          </label>
        </Box>
      </form>
      <ButtonSubmit
        form='addCourseForm'
        disabled={false}
        text={'Adicionar'}
        loading={loading}
      />
    </Box>
  );
}
