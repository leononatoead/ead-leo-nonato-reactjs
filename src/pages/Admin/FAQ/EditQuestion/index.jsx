import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../../../redux/modules/faq/actions";
import useFAQ from "../../../../hooks/useFAQ";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionsSchema } from "../NewQuestion/QuestionsSchema";
import { Link, useNavigate, useParams } from "react-router-dom";

import Input from "../../../../components/Input";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import ConfirmModal from "../../../../components/ConfirmModal";
import OrderInput from "../../../../components/OrderInput";
import { Box, Flex, useToast } from "@chakra-ui/react";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function EditQuestion() {
  const [openConfirmModal, setOpenConfirmModal] = useState();

  const { id } = useParams();
  const { questions } = useSelector((state) => state.faq);
  const question = questions?.find((question) => question.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

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
    const verifyOrder = questions.find(
      (question) => question.order === formData.order,
    );

    if (verifyOrder && question.order !== formData.order) {
      toast({
        description: "Já existe uma pergunta com essa ordem.",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      return;
    } else {
      updateQuestion(id, formData);
    }
  };

  const handleDeleteQuestion = () => {
    deleteQuestion(id);
    navigate("/dashboard/faq");
  };

  useEffect(() => {
    if (!questions) {
      dispatch(fetchQuestions());
    }
  }, []);

  return (
    <Box className="main-container !flex !flex-col">
      <Box className="mx-auto hidden w-full max-w-5xl items-center justify-start gap-2 lg:flex">
        <RiArrowLeftSLine size={20} className="text-primary-600" />
        <Link
          className="font-poppins text-normal font-medium text-primary-600"
          to={-1}
        >
          Voltar
        </Link>
      </Box>
      <form
        id="editQuestionForm"
        onSubmit={handleSubmit(handleEditQuestion)}
        className="flex w-full flex-grow flex-col  gap-4 lg:mx-auto lg:mt-6 lg:max-w-5xl"
      >
        <OrderInput
          register={register}
          watch={watch}
          error={errors?.order?.message}
          defaultValue={question?.order}
        />
        <Input
          theme={"light"}
          type={"text"}
          label={"Pergunta"}
          placeholder={"Digite aqui"}
          register={register}
          id={"question"}
          error={errors?.question?.message}
          watch={watch}
          defaultValue={question?.question}
        />
        <Input
          theme={"light"}
          type={"textarea"}
          label={"Resposta"}
          placeholder={"Digite aqui"}
          register={register}
          id={"answer"}
          error={errors?.answer?.message}
          watch={watch}
          defaultValue={question?.answer}
        />
      </form>
      <Flex
        flexDirection={"column"}
        gap={2}
        className="w-full lg:mx-auto lg:max-w-5xl"
      >
        <ButtonSubmit
          form="editQuestionForm"
          disabled={loading ? true : false}
          text={"Editar"}
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
