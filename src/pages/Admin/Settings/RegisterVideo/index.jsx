import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegisterVideoSettings,
  fetchSettingsFromLocalStorage,
} from "../../../../redux/modules/settings/actions";
import useSettings from "../../../../hooks/useSettings";
import useCheckUpdate from "../../../../hooks/useCheckUpdate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterVideoSchema } from "./RegisterVideoSchema";

import Input from "../../../../components/Input";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import { Box } from "@chakra-ui/react";

export default function RegisterVideo() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterVideoSchema) });

  const settings = useSelector((state) => state.settings);

  const { addRegisterVideoURL, loading } = useSettings();
  const { verifySettingsUpdate } = useCheckUpdate();
  const dispatch = useDispatch();

  const handleSubmitVideoURL = (formData) => {
    addRegisterVideoURL(formData.url);
  };

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const fireStoreSettingsUpdate = await verifySettingsUpdate();
        const lastSettingsUpdate =
          new Date(JSON.parse(localStorage.getItem("lastSettingsUpdate"))) || 0;

        const calcCourse = fireStoreSettingsUpdate - lastSettingsUpdate;

        if (calcCourse !== 0 || !settings.registerVideoURL) {
          dispatch(fetchRegisterVideoSettings());
        } else {
          const settings = JSON.parse(localStorage.getItem("settings"));
          dispatch(fetchSettingsFromLocalStorage(settings));
        }
      } catch (error) {
        console.error(
          "Erro ao buscar a última atualização do video de cadastro:",
          error,
        );
      }
    };

    fetchSettingsData();
  }, []);

  return (
    <Box className="main-container flex flex-col bg-gray-200">
      <form
        id="newRegisterVideoURLForm"
        className="flex flex-1 flex-col gap-[10px] pb-[10px]"
        onSubmit={handleSubmit(handleSubmitVideoURL)}
      >
        <Input
          theme={"light"}
          type={"code"}
          label={"IFrame Panda ou Youtube Embed URL"}
          placeholder={
            "<iframe id={...} src={...}></iframe> ou www.youtube.com/embed/"
          }
          register={register}
          id={"url"}
          error={errors?.url?.message}
          watch={watch}
        />
      </form>
      <ButtonSubmit
        form="newRegisterVideoURLForm"
        disabled={loading}
        text={settings?.registerVideoURL ? "Alterar vídeo" : "Adicionar vídeo"}
        loading={loading}
      />
    </Box>
  );
}
