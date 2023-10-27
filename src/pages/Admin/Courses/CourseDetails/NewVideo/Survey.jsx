import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SurveySchema } from "./extraSchemas";

import Input from "../../../../../components/Input";
import { Box } from "@chakra-ui/react";
import SurveyList from "./SurveyList";

export default function Survey({ videoData, setVideoData }) {
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
      question: "",
      firstAnswer: "",
      secondAnswer: "",
      thirdAnswer: "",
      fourthAnswer: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddSurvey)}
      id="AddSurveyForm"
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

      <Box className="flex items-center justify-start gap-4">
        <button
          className="mt-2 w-[50%] rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
          type="submit"
          form="AddSurveyForm"
        >
          Incluir
        </button>

        {videoData.survey.survey && (
          <SurveyList videoData={videoData} setVideoData={setVideoData} />
        )}
      </Box>
    </form>
  );
}
