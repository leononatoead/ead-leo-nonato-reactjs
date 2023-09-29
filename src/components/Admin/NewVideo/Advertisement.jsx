import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdvertisementSchema } from './extraSchemas';

import Input from '../../Global/Input';
import { Box } from '@chakra-ui/react';

export default function Advertisement({ setVideoData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(AdvertisementSchema),
  });

  const handleAddAdvertisement = (formData) => {
    setVideoData((prev) => ({
      ...prev,
      advertisement: {
        ...prev.advertisement,
        advertisementList: [...prev.advertisement.advertisementList, formData],
      },
    }));

    reset({
      advertisementName: '',
      advertisementTime: '',
      advertisementPath: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddAdvertisement)}
      id='AddAdvertisementForm'
      className='flex flex-col gap-[10px] pb-4'
    >
      <Input
        theme={'light'}
        type={'text'}
        label={'Nome'}
        placeholder={'Digite aqui'}
        register={register}
        id={'advertisementName'}
        error={errors?.advertisementName?.message}
        watch={watch}
      />
      <Input
        theme={'light'}
        type={'text'}
        label={'Tempo do Vídeo'}
        placeholder={'Digite aqui'}
        register={register}
        id={'advertisementTime'}
        error={errors?.advertisementTime?.message}
        watch={watch}
      />

      <Input
        theme={'light'}
        type={'text'}
        label={'URL'}
        placeholder={'www.exemplo.com'}
        register={register}
        id={'advertisementPath'}
        error={errors?.advertisementPath?.message}
        watch={watch}
      />

      <Box className='flex items-center gap-4 justify-center'>
        <button
          className='w-[50%] bg-white rounded-[4px] px-3 py-[5px] text-primary-600 border-[1px] border-primary-600 text-base leading-5 mt-2'
          type='submit'
          form='AddAdvertisementForm'
        >
          Incluir
        </button>

        <button className='w-[50%] bg-white rounded-[4px] px-3 py-[5px] text-primary-600 border-[1px] border-primary-600 text-base leading-5 mt-2'>
          Ver inclusos
        </button>
      </Box>
    </form>
  );
}