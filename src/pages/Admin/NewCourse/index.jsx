import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddCourseSchema } from './addCourseSchema';

import useCourse from '../../../hooks/useCourse';

import Input from '../../../components/Global/Input';
import ButtonSubmit from '../../../components/Global/ButtonSubmit';

import { Box, Switch } from '@chakra-ui/react';

export default function NewCourse({ openCourseModal, setOpenCourseModal }) {
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
      addNewCourse(data, 'courses', imageFile, setOpenCourseModal);
    } else {
      setError('Envie uma imagem!');
    }
  };

  return (
    <Box className='min-h-[calc(100vh-40px)] px-4 py-6 flex flex-col'>
      <form
        id='addCourseForm'
        className='flex flex-col gap-[6px] flex-grow'
        onSubmit={handleSubmit(handlAddCourse)}
      >
        <label htmlFor={'image'} className='text-base leading-5 mb-[3px] block'>
          Imagem
        </label>
        <input
          id='image'
          type='file'
          className='w-full outline-none text-base'
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <span className='errorText'>{error}</span>
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

        <Box className='flex justify-start items-center gap-4'>
          <label
            htmlFor={'isFree'}
            className='text-base leading-5 mb-[3px] block'
          >
            Grátis
          </label>

          <Switch id='isFree' onChange={() => handleSwitch('isFree')} />
        </Box>
        <Box className='flex justify-start items-center gap-4'>
          <label
            htmlFor={'needAuth'}
            className='text-base leading-5 mb-[3px] block'
          >
            Requer cadastro
          </label>

          <Switch
            id='needAuth'
            defaultChecked
            onChange={() => handleSwitch('needAuth')}
          />
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
