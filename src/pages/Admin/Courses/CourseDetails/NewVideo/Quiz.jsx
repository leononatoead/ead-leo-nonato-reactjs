import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizSchema } from "./extraSchemas";

import Input from "../../../../../components/Input";
import { Box } from "@chakra-ui/react";
import QuizList from "./QuizList";

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
      question: "",
      firstAnswer: "",
      secondAnswer: "",
      thirdAnswer: "",
      fourthAnswer: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddQuestion)}
      id="AddQuestionForm"
      className="flex flex-col gap-[10px] pb-4"
    >
      <Input
        theme={"light"}
        type={"text"}
        label={"Nome"}
        placeholder={"Digite aqui"}
        register={register}
        id={"question"}
        error={errors?.question?.message}
        watch={watch}
      />
      <Input
        theme={"light"}
        type={"text"}
        label={"Opção 1"}
        placeholder={"Digite aqui"}
        register={register}
        id={"firstAnswer"}
        error={errors?.firstAnswer?.message}
        watch={watch}
      />
      <Input
        theme={"light"}
        type={"text"}
        label={"Opção 2"}
        placeholder={"Digite aqui"}
        register={register}
        id={"secondAnswer"}
        error={errors?.secondAnswer?.message}
        watch={watch}
      />
      <Input
        theme={"light"}
        type={"text"}
        label={"Opção 3"}
        placeholder={"Digite aqui"}
        register={register}
        id={"thirdAnswer"}
        error={errors?.thirdAnswer?.message}
        watch={watch}
      />
      <Input
        theme={"light"}
        type={"text"}
        label={"Opção 4"}
        placeholder={"Digite aqui"}
        register={register}
        id={"fourthAnswer"}
        error={errors?.fourthAnswer?.message}
        watch={watch}
      />

      <Box className="pb-[5px]">
        <label
          htmlFor={"rightAnswer"}
          className="mb-[9px] block text-base leading-5"
        >
          Resposta certa
        </label>
        <select
          id="rightAnswer"
          {...register("rightAnswer", { valueAsNumber: true })}
          className={`w-full rounded-[4px] bg-white px-3 py-[5px] text-base leading-5 shadow-sm shadow-gray-900/50 outline-none placeholder:text-gray-900`}
        >
          <option value="1">Opção 1</option>
          <option value="2">Opção 2</option>
          <option value="3">Opção 3</option>
          <option value="4">Opção 4</option>
        </select>
      </Box>

      <Box className="flex items-center justify-start gap-4">
        <button
          className="mt-2 w-[50%] rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
          type="submit"
          form="AddQuestionForm"
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
