import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AssetsSchema } from './extraSchemas';

import Input from '../../Global/Input';
import { Box } from '@chakra-ui/react';

export default function Assets({ videoData, setVideoData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(AssetsSchema),
  });

  const handleInputFileChange = (e) => {
    setVideoData((prev) => ({
      ...prev,
      assets: { ...prev.assets, assetFile: e.target.files[0] },
    }));
  };

  const handleAddFile = (formData) => {
    if (formData.assetPath) {
      const data = {
        fileName: formData.assetName,
        fileURL: formData.assetPath,
      };

      setVideoData((prev) => ({
        ...prev,
        assets: {
          ...prev.assets,
          assetsList: [...prev.assets.assetsList, data],
        },
      }));
    } else if (videoData.assets.assetFile) {
      const data = {
        fileName: formData.assetName,
        file: videoData.assets.assetFile,
      };

      setVideoData((prev) => ({
        ...prev,
        assets: {
          ...prev.assets,
          assetsList: [...prev.assets.assetsList, data],
        },
      }));
    }

    reset({
      assetName: '',
      assetPath: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddFile)}
      id='AddAssetForm'
      className='flex flex-col gap-[10px] pb-4'
    >
      <Input
        theme={'light'}
        type={'text'}
        label={'Nome'}
        placeholder={'Digite aqui'}
        register={register}
        id={'assetName'}
        error={errors?.assetName?.message}
        watch={watch}
      />
      {videoData?.assets.assetType ? (
        <div className='flex flex-col gap-2'>
          <label
            htmlFor={'assetFile'}
            className='text-base leading-5 mb-[9px] block'
          >
            Arquivo
          </label>
          <input
            type='file'
            name='assetFile'
            onChange={handleInputFileChange}
            multiple={false}
            accept='.pdf,.docx,.doc,.xlsx,.xls,.xlsm'
            title='Selecione um arquivo PDF ou Word'
            className='w-full outline-none text-base'
            required
          />
        </div>
      ) : (
        <Input
          theme={'light'}
          type={'text'}
          label={'URL'}
          placeholder={'www.exemplo.com'}
          register={register}
          id={'assetPath'}
          error={errors?.assetPath?.message}
          watch={watch}
        />
      )}
      <Box className='flex items-center gap-4 justify-center'>
        <button
          className='w-[50%] bg-white rounded-[4px] px-3 py-[5px] text-primary-600 border-[1px] border-primary-600 text-base leading-5 mt-2'
          type='submit'
          form='AddAssetForm'
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