import { useForm } from 'react-hook-form';
import useFAQ from '../../../../hooks/useFAQ';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionsSchema } from './QuestionsSchema';

import Input from '../../../../components/Global/Input';
import ButtonSubmit from '../../../../components/Global/ButtonSubmit';
import { Box } from '@chakra-ui/react';

export default function NewQuestion() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(QuestionsSchema),
  });

  const { addQuestion, loading } = useFAQ();

  const handleAddQuestion = (formData) => {
    addQuestion(formData);
    reset({ question: '', answer: '' });
  };

  return (
    <Box className='main-container !flex !flex-col'>
      <form
        id='addQuestionForm'
        onSubmit={handleSubmit(handleAddQuestion)}
        className='flex flex-col gap-4 flex-grow'
      >
        <Input
          theme={'light'}
          type={'number'}
          label={'Ordem'}
          placeholder={'Digite aqui'}
          register={register}
          id={'order'}
          error={errors?.order?.message}
          watch={watch}
        />
        <Input
          theme={'light'}
          type={'text'}
          label={'Pergunta'}
          placeholder={'Digite aqui'}
          register={register}
          id={'question'}
          error={errors?.question?.message}
          watch={watch}
        />
        <Input
          theme={'light'}
          type={'textarea'}
          label={'Resposta'}
          placeholder={'Digite aqui'}
          register={register}
          id={'answer'}
          error={errors?.answer?.message}
          watch={watch}
        />
      </form>
      <ButtonSubmit
        form='addQuestionForm'
        disabled={loading ? true : false}
        text={'Adicionar'}
        loading={loading}
      />
    </Box>
  );
}
