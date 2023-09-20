import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../../../../redux/modules/faq/actions';
import useFAQ from '../../../../hooks/useFAQ';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionsSchema } from '../NewQuestion/QuestionsSchema';
import { useNavigate, useParams } from 'react-router-dom';

import Input from '../../../../components/Global/Input';
import ButtonSubmit from '../../../../components/Global/ButtonSubmit';
import ConfirmModal from '../../../../components/Global/ConfirmModal';
import { Box, Flex } from '@chakra-ui/react';

export default function EditQuestion() {
  const [openConfirmModal, setOpenConfirmModal] = useState();

  const { id } = useParams();
  const { questions } = useSelector((state) => state.faq);
  const question = questions?.find((question) => question.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(QuestionsSchema),
  });

  const { updateQuestion, deleteQuestion, loading } = useFAQ();

  const handleEditQuestion = (formData) => {
    updateQuestion(id, formData);
  };

  const handleDeleteQuestion = () => {
    deleteQuestion(id);
    navigate('/dashboard/faq');
  };

  useEffect(() => {
    if (!questions) {
      dispatch(fetchQuestions());
    }
  }, []);

  return (
    <Box className='main-container !flex !flex-col'>
      <form
        id='editQuestionForm'
        onSubmit={handleSubmit(handleEditQuestion)}
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
          defaultValue={question?.order}
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
          defaultValue={question?.question}
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
          defaultValue={question?.answer}
        />
      </form>
      <Flex flexDirection={'column'} gap={2}>
        <ButtonSubmit
          form='editQuestionForm'
          disabled={loading ? true : false}
          text={'Editar'}
          loading={loading}
        />
        <ConfirmModal
          deleteFunction={handleDeleteQuestion}
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
        />
      </Flex>
    </Box>
  );
}
