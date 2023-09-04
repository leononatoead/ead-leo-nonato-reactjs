import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddCourseSchema } from './addCourseSchema';

import useCourse from '../../../hooks/useCourse';

import ModalComponent from '../../Global/ModalComponent';
import {
  Box,
  ModalBody,
  ModalFooter,
  Progress,
  Select,
} from '@chakra-ui/react';
import Input from '../../Global/Input';
import ButtonSubmit from '../../Global/ButtonSubmit';

export default function AddCourse({ openCourseModal, setOpenCourseModal }) {
  const [imageFile, setImageFile] = useState();
  const [error, setError] = useState();

  const { addNewCourse, loading } = useCourse();

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
    if (imageFile) {
      addNewCourse(formData, 'courses', imageFile, setOpenCourseModal);
    } else {
      setError('Envie uma imagem!');
    }
  };

  const handleCloseModal = () => {
    setOpenCourseModal(false);
  };

  return (
    <ModalComponent
      title={'Novo curso'}
      openModal={openCourseModal}
      setOpenModal={setOpenCourseModal}
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
              id='addCourseForm'
              className='flex flex-col gap-[6px]'
              onSubmit={handleSubmit(handlAddCourse)}
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

              <label
                htmlFor={'isFree'}
                className='text-base leading-5 mb-[3px] block'
              >
                Grátis
              </label>
              <Select
                id='isFree'
                defaultValue={true}
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
                Requer cadastro
              </label>
              <Select
                id='needAuth'
                defaultValue={true}
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
                form='addCourseForm'
                disabled={false}
                text={'Adicionar'}
                loading={loading}
              />
            </ModalFooter>
          </>
        )}
      </ModalBody>
    </ModalComponent>
  );
}
