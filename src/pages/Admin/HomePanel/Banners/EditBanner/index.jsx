import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBANNERSFromLocalStorage,
  fetchBanners,
} from '../../../../../redux/modules/banners/actions';
import useBanner from '../../../../../hooks/useBanner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BannerSchema } from '../NewBanner/BannerSchema';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Flex } from '@chakra-ui/react';
import Input from '../../../../../components/Global/Input';
import ButtonSubmit from '../../../../../components/Global/ButtonSubmit';
import ConfirmModal from '../../../../../components/Global/ConfirmModal';

export default function EditBanner() {
  const { id } = useParams();
  const { banners } = useSelector((state) => state.banners);
  const banner = banners?.find((banner) => banner.id === id);

  const [openConfirmModal, setOpenConfirmModal] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(BannerSchema),
  });

  const { updateBanner, deleteBanner, loading } = useBanner();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddBanner = (formData) => {
    updateBanner(id, formData);
  };

  const handleDeleteBanner = () => {
    deleteBanner(id);
    navigate('/dashboard/home');
  };

  useEffect(() => {
    const lastBannersUpdate = new Date(
      JSON.parse(localStorage.getItem('lastBannersUpdate')),
    );
    const actualBannerTime = new Date();
    const verifyBannerUpdate = Math.abs(actualBannerTime - lastBannersUpdate);
    const bannersMinutesDifference = Math.floor(verifyBannerUpdate / 60000);

    if (bannersMinutesDifference > 60) {
      dispatch(fetchBanners());
    } else {
      const courses = JSON.parse(localStorage.getItem('banners'));
      dispatch(fetchBANNERSFromLocalStorage(courses));
    }
  }, []);

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
          defaultValue={banner.order}
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
          defaultValue={banner.imageURL}
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
          defaultValue={banner.title}
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
          defaultValue={banner.subtitle}
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
          defaultValue={banner.url}
        />
      </form>

      <Flex flexDirection={'column'} gap={2}>
        <ButtonSubmit
          form='newBannerForm'
          disabled={false}
          text={'Editar'}
          loading={loading}
        />
        <ConfirmModal
          deleteFunction={handleDeleteBanner}
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
        />
      </Flex>
    </Box>
  );
}
