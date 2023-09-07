import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditCourseSchema } from './editCourseSchema';

import useCourse from '../../../hooks/useCourse';

import ButtonSubmit from '../../../components/Global/ButtonSubmit';
import Input from '../../../components/Global/Input';

import { Box, Flex, Switch } from '@chakra-ui/react';
import ConfirmModal from '../../../components/Global/ConfirmModal';

export default function EditCourse() {
  const { pathname } = useLocation();
  const pathParams = pathname.split('/');
  const id = pathParams[3];
  const { courses } = useSelector((state) => state.courses);

  const course = courses.find((course) => course.id === id);

  const [imageFile, setImageFile] = useState();
  const [isFree, setIsFree] = useState(course.isFree);
  const [needAuth, setNeedAuth] = useState(course.needAuth);
  const [openConfirmModal, setOpenConfirmModal] = useState();

  const { editCourseWithImage, editCourseWithoutImage, deleteCourse, loading } =
    useCourse();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditCourseSchema),
  });

  const handleSwitch = (type) => {
    if (type === 'isFree') {
      setIsFree((prev) => !prev);
    } else setNeedAuth((prev) => !prev);
  };

  const handleEditCourse = async (formData) => {
    const data = { ...formData, isFree, needAuth };

    if (imageFile) {
      editCourseWithImage(course, data, 'courses', imageFile);
    } else {
      editCourseWithoutImage(course, formData);
    }
  };

  const handleDeleteCourse = () => {
    deleteCourse(course);
    navigate('/dashboard/courses');
  };

  return (
    <Box className='min-h-[calc(100vh-40px)] px-4 py-6 flex flex-col'>
      <form
        id='editCourseForm'
        onSubmit={handleSubmit(handleEditCourse)}
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
        </Box>
        <Input
          theme={'light'}
          type={'text'}
          label={'Nome do curso'}
          placeholder={'Digite aqui'}
          register={register}
          id={'name'}
          error={errors?.name?.message}
          watch={watch}
          defaultValue={course.name}
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
          defaultValue={course.description}
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
          defaultValue={course.author}
        />
        <Box className='flex justify-start items-center gap-4 mb-[5px]'>
          <Switch id='isFree' onChange={() => handleSwitch('isFree')} />
          <label htmlFor={'isFree'} className='text-base leading-5'>
            Grátis
          </label>
        </Box>
        <Box className='flex justify-start items-center gap-4 '>
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
      <Flex flexDirection={'column'} gap={2}>
        <ButtonSubmit
          form='editCourseForm'
          disabled={false}
          text={'Alterar'}
          loading={loading}
        />
        <ConfirmModal
          deleteFunction={handleDeleteCourse}
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
        />
      </Flex>
    </Box>
  );
}
