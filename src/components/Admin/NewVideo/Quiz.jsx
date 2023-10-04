import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuizSchema } from './extraSchemas';

import Input from '../../Global/Input';
import { Box } from '@chakra-ui/react';
import QuizList from './QuizList';

export default function Quiz({ videoData, setVideoData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(QuizSchema),
  });

  const handleAddQuestion = (formData) => {
    setVideoData((prev) => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        questionsList: [...prev.quiz.questionsList, formData],
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
      onSubmit={handleSubmit(handleAddQuestion)}
      id='AddQuestionForm'
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

      <Box className='pb-[5px]'>
        <label
          htmlFor={'rightAnswer'}
          className='text-base leading-5 mb-[9px] block'
        >
          Resposta certa
        </label>
        <select
          id='rightAnswer'
          {...register('rightAnswer', { valueAsNumber: true })}
          className={`w-full rounded-[4px] px-3 py-[5px] leading-5 text-base outline-none bg-white placeholder:text-gray-900 shadow-sm shadow-gray-900/50`}
        >
          <option value='1'>Opção 1</option>
          <option value='2'>Opção 2</option>
          <option value='3'>Opção 3</option>
          <option value='4'>Opção 4</option>
        </select>
      </Box>

      <Box className='flex items-center gap-4 justify-start'>
        <button
          className='w-[50%] bg-white rounded-[4px] px-3 py-[5px] text-primary-600 border-[1px] border-primary-600 text-base leading-5 mt-2'
          type='submit'
          form='AddQuestionForm'
        >
          Incluir
        </button>
        {videoData.quiz.questionsList.length > 0 && (
          <QuizList videoData={videoData} setVideoData={setVideoData} />
        )}
      </Box>
    </form>
  );
}
