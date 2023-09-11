import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditCourseSchema } from './editCourseSchema';

import useCourse from '../../../hooks/useCourse';

import Input from '../../../components/Global/Input';
import ButtonSubmit from '../../../components/Global/ButtonSubmit';
import ConfirmModal from '../../../components/Global/ConfirmModal';

import { Box, Flex, Switch, Text } from '@chakra-ui/react';

export default function EditCourse() {
  const { pathname } = useLocation();
  const pathParams = pathname.split('/');
  const id = pathParams[3];
  const { courses } = useSelector((state) => state.courses);
  const course = courses.find((course) => course.id === id);
  const { editCourseWithImage, editCourseWithoutImage, deleteCourse, loading } =
    useCourse();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState();

  const [isPremium, setIsPremium] = useState(course?.isPremium);
  const [isHidden, setIsHidden] = useState(course?.isHidden);
  const [needAuth, setNeedAuth] = useState(course?.needAuth);
  const [openConfirmModal, setOpenConfirmModal] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditCourseSchema),
  });

  const handleSwitch = (type) => {
    if (type === 'isPremium') {
      setIsPremium((prev) => !prev);
    } else if (type === 'needAuth') {
      setNeedAuth((prev) => !prev);
    } else if (type === 'isHidden') {
      setIsHidden((prev) => !prev);
    }
  };

  const handleEditCourse = async (formData) => {
    const data = { ...formData, isPremium, needAuth, isHidden };

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
    <Box className='main-container flex flex-col'>
      <form
        id='editCourseForm'
        onSubmit={handleSubmit(handleEditCourse)}
        className='flex flex-col gap-[10px] flex-grow'
      >
        <Box className='mb-[6px]'>
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
        {isPremium && (
          <>
            <Input
              theme={'light'}
              type={'text'}
              label={'Referência de pagamento'}
              placeholder={'Digite aqui'}
              register={register}
              id={'paymentRef'}
              error={errors?.paymentRef?.message}
              watch={watch}
            />
            <Input
              theme={'light'}
              type={'text'}
              label={'Checkout de pagamento (URL)'}
              placeholder={'Digite aqui'}
              register={register}
              id={'paymentURL'}
              error={errors?.paymentURL?.message}
              watch={watch}
            />
          </>
        )}
        <Box className='flex justify-start items-center gap-4' mb={'5px'}>
          <Text className='font-bold text-primary-600 text-base'>
            Curso pago:
          </Text>
          <Box className='flex justify-start items-center gap-4'>
            <Switch id='isPremium' onChange={() => handleSwitch('isPremium')} />
            <label htmlFor={'isPremium'} className='text-base leading-5'>
              {isPremium ? 'Sim' : 'Não'}
            </label>
          </Box>
        </Box>
        <Box className='flex justify-start items-center gap-4' mb={'5px'}>
          <Text className='font-bold text-primary-600 text-base'>
            Requer Cadastro:
          </Text>
          <Box className='flex justify-start items-center gap-4'>
            <Switch
              id='needAuth'
              defaultChecked
              onChange={() => handleSwitch('needAuth')}
            />
            <label htmlFor={'needAuth'} className='text-base leading-5'>
              {needAuth ? 'Sim' : 'Não'}
            </label>
          </Box>
        </Box>
        <Box className='flex justify-start items-center gap-4' mb={4}>
          <Text className='font-bold text-primary-600 text-base'>
            Visibilidade:
          </Text>
          <Box className='flex justify-start items-center gap-4'>
            <Switch
              id='isHidden'
              defaultChecked
              onChange={() => handleSwitch('isHidden')}
            />
            <label htmlFor={'isHidden'} className='text-base leading-5'>
              {isHidden ? 'Privado' : 'Público'}
            </label>
          </Box>
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
