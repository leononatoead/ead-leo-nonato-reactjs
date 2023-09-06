import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { EditCourseSchema } from './editCourseSchema';

import useCourse from '../../../hooks/useCourse';

import {
  Box,
  ModalBody,
  ModalFooter,
  Progress,
  Select,
} from '@chakra-ui/react';

import ModalComponent from '../../Global/ModalComponent';
import ButtonSubmit from '../../Global/ButtonSubmit';
import Input from '../../Global/Input';

export default function EditCourse({
  course,
  openEditModal,
  setOpenEditModal,
}) {
  const [imageFile, setImageFile] = useState();

  const { editCourseWithImage, editCourseWithoutImage, loading } = useCourse();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditCourseSchema),
  });

  const handlAddCourse = async (formData) => {
    if (imageFile) {
      editCourseWithImage(
        course,
        formData,
        'courses',
        imageFile,
        setOpenEditModal,
      );
    } else {
      editCourseWithoutImage(course, formData, setOpenEditModal);
    }
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  return (
    <ModalComponent
      title={'Editar curso'}
      openModal={openEditModal}
      setOpenModal={setOpenEditModal}
      handleCloseModal={handleCloseModal}
    >
      <ModalBody py={0} px={4}>
        {loading ? (
          <Box className='w-full'>
            <Progress size='xs' isIndeterminate />
          </Box>
        ) : (
          <>
            <form
              id='editCourseForm'
              onSubmit={handleSubmit(handlAddCourse)}
              className='flex flex-col gap-[6px]'
            >
              <label
                htmlFor={'image'}
                className='text-base leading-5 mb-[3px] block'
              >
                Imagem
              </label>
              <input
                id='image'
                type='file'
                className='w-full outline-none text-base'
                onChange={(e) => setImageFile(e.target.files[0])}
              />

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

              <label
                htmlFor={'isFree'}
                className='text-base leading-5 mb-[3px] block'
              >
                Grátis
              </label>
              <Select
                id='isFree'
                defaultValue={course?.isFree}
                {...register('isFree', {
                  setValueAs: (v) => (v === 'true' ? true : false),
                })}
                bg='white'
                borderColor='transparent'
                className='!outline-none shadow-sm shadow-gray-900/50 !h-[30px] !text-base !px-3 !text-black'
              >
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
              </Select>
              <label
                htmlFor={'needAuth'}
                className='text-base leading-5 mb-[3px] block'
              >
                Requer Cadastro
              </label>
              <Select
                id='needAuth'
                defaultValue={course?.needAuth}
                {...register('needAuth', {
                  setValueAs: (v) => (v === 'true' ? true : false),
                })}
                bg='white'
                borderColor='transparent'
                className='!outline-none shadow-sm shadow-gray-900/50 !h-[30px] !text-base !px-3 !text-black'
              >
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
              </Select>
            </form>

            <ModalFooter p={0} mt={4}>
              <ButtonSubmit
                form='editCourseForm'
                disabled={false}
                text={'Alterar'}
                loading={loading}
              />
            </ModalFooter>
          </>
        )}
      </ModalBody>
    </ModalComponent>
  );
}
