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

import Input from "../../../../components/Global/Input";
import ButtonSubmit from "../../../../components/Global/ButtonSubmit";
import { Box } from "@chakra-ui/react";

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
      <form
        id="newStudantClassForm"
        className="flex flex-1 flex-col gap-[10px] pb-[10px]"
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
      <ButtonSubmit
        form="newStudantClassForm"
        disabled={loading}
        text={"Adicionar turma"}
        loading={loading}
      />
    </Box>
  );
}
