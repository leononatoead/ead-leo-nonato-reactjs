import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCourseSchema } from './addCourseSchema';

import useCourse from '../../../../hooks/useCourse';

import Input from '../../../../components/Global/Input';
import ButtonSubmit from '../../../../components/Global/ButtonSubmit';

import { Box, Switch, Text } from '@chakra-ui/react';

export default function NewCourse() {
  const [isPremium, setIsPremium] = useState(false);
  const [needAuth, setNeedAuth] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
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

  const handleSwitch = (type) => {
    if (type === 'isPremium') {
      setIsPremium((prev) => !prev);
    } else if (type === 'needAuth') {
      setNeedAuth((prev) => !prev);
    } else if (type === 'isHidden') {
      setIsHidden((prev) => !prev);
    }
  };

  const handlAddCourse = async (formData) => {
    setError(null);

    const data = { ...formData, isPremium, needAuth, isHidden };

    if (imageFile) {
      addNewCourse(data, 'courses', imageFile);
    } else {
      setError('Envie uma imagem!');
    }
  };

  return (
    <Box className='main-container flex flex-col'>
      <form
        id='addCourseForm'
        onSubmit={handleSubmit(handlAddCourse)}
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
        {isPremium && (
          <>
            <Input
              theme={'light'}
              type={'number'}
              label={'Preço'}
              placeholder={'R$ 0,00'}
              register={register}
              id={'price'}
              error={errors?.price?.message}
              watch={watch}
            />
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
              placeholder={'https://exemplo.com/'}
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
      <ButtonSubmit
        form='addCourseForm'
        disabled={loading ? true : false}
        text={'Adicionar'}
        loading={loading}
      />
    </Box>
  );
}
