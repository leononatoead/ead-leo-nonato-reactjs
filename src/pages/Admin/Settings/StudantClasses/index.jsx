import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingsFromLocalStorage,
  fetchStudantClassesSettings,
} from "../../../../redux/modules/settings/actions";
import useSettings from "../../../../hooks/useSettings";
import useCheckUpdate from "../../../../hooks/useCheckUpdate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewClassSchema } from "./NewClassSchema";
import { Link } from "react-router-dom";

import Input from "../../../../components/Input";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import { Box } from "@chakra-ui/react";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function ActualClass() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(NewClassSchema) });

  const settings = useSelector((state) => state.settings);

  const { addNewClass, loading } = useSettings();
  const { verifySettingsUpdate } = useCheckUpdate();
  const dispatch = useDispatch();

  const handleSubmitClass = (formData) => {
    addNewClass(formData.title);
  };

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const fireStoreSettingsUpdate = await verifySettingsUpdate();
        const lastSettingsUpdate =
          new Date(JSON.parse(localStorage.getItem("lastSettingsUpdate"))) || 0;

        const calcCourse = fireStoreSettingsUpdate - lastSettingsUpdate;

        if (calcCourse !== 0 || !settings.studantClasses) {
          const localSettings = JSON.parse(localStorage.getItem("settings"));

          if (localSettings && localSettings.studantClasses) {
            dispatch(fetchSettingsFromLocalStorage(localSettings));
          } else {
            dispatch(fetchStudantClassesSettings());
          }
        } else {
          const localSettings = JSON.parse(localStorage.getItem("settings"));
          dispatch(fetchSettingsFromLocalStorage(localSettings));
        }
      } catch (error) {
        console.error("Erro ao buscar a última atualização de turmas:", error);
      }
    };

    fetchSettingsData();
  }, []);

  return (
    <Box className="main-container flex flex-col bg-gray-200">
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
        id="newStudantClassForm"
        className="flex w-full flex-grow flex-col gap-4 lg:mx-auto lg:mt-20 lg:max-w-5xl"
        onSubmit={handleSubmit(handleSubmitClass)}
      >
        <Input
          theme={"light"}
          type={"text"}
          label={"Título da turma"}
          placeholder={"Turma X"}
          register={register}
          id={"title"}
          error={errors?.title?.message}
          watch={watch}
        />
      </form>
      <Box className="flex w-full flex-col gap-4 lg:mx-auto lg:max-w-5xl">
        <ButtonSubmit
          form="newStudantClassForm"
          disabled={loading}
          text={"Adicionar turma"}
          loading={loading}
        />
      </Box>
    </Box>
  );
}
