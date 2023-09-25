import useBanner from '../../../../../hooks/useBanner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BannerSchema } from './BannerSchema';

import { Box } from '@chakra-ui/react';
import Input from '../../../../../components/Global/Input';
import ButtonSubmit from '../../../../../components/Global/ButtonSubmit';

export default function NewBanner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(BannerSchema),
  });

  const { addBanner, loading } = useBanner();

  const handleAddBanner = (formData) => {
    addBanner(formData);
    reset({ order: '', imageURL: '', title: '', subtitle: '', url: '' });
  };

  return (
    <Box className='main-container !flex !flex-col'>
      <form
        id='newBannerForm'
        className='flex flex-col gap-4 flex-grow'
        onSubmit={handleSubmit(handleAddBanner)}
      >
        <Input
          theme={'light'}
          type={'number'}
          label={'Ordem'}
          placeholder={'0'}
          register={register}
          id={'order'}
          error={errors?.order?.message}
          watch={watch}
        />
        <Input
          theme={'light'}
          type={'text'}
          label={'Imagem'}
          placeholder={'www.exemplo.com'}
          register={register}
          id={'imageURL'}
          error={errors?.imageURL?.message}
          watch={watch}
        />
        <Input
          theme={'light'}
          type={'text'}
          label={'Título'}
          placeholder={'Digite o título aqui'}
          register={register}
          id={'title'}
          error={errors?.title?.message}
          watch={watch}
        />
        <Input
          theme={'light'}
          type={'text'}
          label={'Subtítulo'}
          placeholder={'Digite o subtítulo aqui'}
          register={register}
          id={'subtitle'}
          error={errors?.subtitle?.message}
          watch={watch}
        />
        <Input
          theme={'light'}
          type={'text'}
          label={'URL'}
          placeholder={'www.exemplo.com'}
          register={register}
          id={'url'}
          error={errors?.url?.message}
          watch={watch}
        />
      </form>
      <ButtonSubmit
        form='newBannerForm'
        disabled={false}
        text={'Confirmar'}
        loading={loading}
      />
    </Box>
  );
}
