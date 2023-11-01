import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../../../redux/modules/faq/actions";
import useFAQ from "../../../../hooks/useFAQ";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionsSchema } from "./QuestionsSchema";

import Input from "../../../../components/Input";
import OrderInput from "../../../../components/OrderInput";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import { Box, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";

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

  const { questions } = useSelector((state) => state.faq);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (!questions) {
      dispatch(fetchQuestions());
    }
  }, []);

  const handleAddQuestion = (formData) => {
    const verifyOrder = questions.find(
      (question) => question.order === formData.order,
    );

    if (verifyOrder) {
      toast({
        description: "Já existe uma pergunta com essa ordem.",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      return;
    } else {
      addQuestion(formData);
      reset({ question: "", answer: "", order: "" });
    }
  };

  return (
    <Box className="main-container !flex !flex-col">
      <Box className="mx-auto hidden w-full max-w-5xl items-center justify-start gap-2 lg:flex">
        <RiArrowLeftSLine size={20} className="text-primary-600" />
        <Link
          className="font-poppins text-normal font-medium text-primary-600 "
          to={-1}
        >
          Voltar
        </Link>
      </Box>
      <form
        id="addQuestionForm"
        onSubmit={handleSubmit(handleAddQuestion)}
        className="flex w-full flex-grow flex-col  gap-4 lg:mx-auto lg:mt-6 lg:max-w-5xl"
      >
        <OrderInput
          register={register}
          watch={watch}
          error={errors?.order?.message}
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
        />
      </form>
      <Box className="w-full lg:mx-auto lg:max-w-5xl">
        <ButtonSubmit
          form="addQuestionForm"
          disabled={loading ? true : false}
          text={"Adicionar"}
          loading={loading}
        />
      </Box>
    </Box>
  );
}
