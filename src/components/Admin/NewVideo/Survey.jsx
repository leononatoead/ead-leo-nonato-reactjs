import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SurveySchema } from './extraSchemas';

import Input from '../../Global/Input';
import { Box } from '@chakra-ui/react';

export default function Survey({ setVideoData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(SurveySchema),
  });

  const handleAddSurvey = (formData) => {
    setVideoData((prev) => ({
      ...prev,
      survey: {
        ...prev.survey,
        survey: formData,
      },
    }));

    reset({
      question: '',
      firstAnswer: '',
      secondAnswer: '',
      thirdAnswer: '',
      fourthAnswer: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddSurvey)}
      id='AddSurveyForm'
      className='flex flex-col gap-[10px] pb-4'
    >
      <Input
        theme={'light'}
        type={'text'}
        label={'Nome'}
        placeholder={'Digite aqui'}
        register={register}
        id={'question'}
        error={errors?.question?.message}
        watch={watch}
      />
      <Input
        theme={'light'}
        type={'text'}
        label={'Opção 1'}
        placeholder={'Digite aqui'}
        register={register}
        id={'firstAnswer'}
        error={errors?.firstAnswer?.message}
        watch={watch}
      />
      <Input
        theme={'light'}
        type={'text'}
        label={'Opção 2'}
        placeholder={'Digite aqui'}
        register={register}
        id={'secondAnswer'}
        error={errors?.secondAnswer?.message}
        watch={watch}
      />
      <Input
        theme={'light'}
        type={'text'}
        label={'Opção 3'}
        placeholder={'Digite aqui'}
        register={register}
        id={'thirdAnswer'}
        error={errors?.thirdAnswer?.message}
        watch={watch}
      />
      <Input
        theme={'light'}
        type={'text'}
        label={'Opção 4'}
        placeholder={'Digite aqui'}
        register={register}
        id={'fourthAnswer'}
        error={errors?.fourthAnswer?.message}
        watch={watch}
      />

      <Box className='flex items-center gap-4 justify-start'>
        <button
          className='w-full bg-white rounded-[4px] px-3 py-[5px] text-primary-600 border-[1px] border-primary-600 text-base leading-5 mt-2'
          type='submit'
          form='AddSurveyForm'
        >
          Incluir
        </button>
      </Box>
    </form>
  );
}
