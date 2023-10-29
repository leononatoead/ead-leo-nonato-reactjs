import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingsFromLocalStorage,
  fetchWhatsAppSettings,
} from "../../../../redux/modules/settings/actions";
import useSettings from "../../../../hooks/useSettings";
import useCheckUpdate from "../../../../hooks/useCheckUpdate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WhatsAppSchema } from "./WhatsAppSchema";

import Input from "../../../../components/Input";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import { Box } from "@chakra-ui/react";

export default function WhatsAppURL() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(WhatsAppSchema) });

  const settings = useSelector((state) => state.settings);

  const { addWhatsAppURL, loading } = useSettings();
  const { verifySettingsUpdate } = useCheckUpdate();
  const dispatch = useDispatch();

  const handleSubmitWhatsApp = (formData) => {
    addWhatsAppURL(formData.url);
  };

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const fireStoreSettingsUpdate = await verifySettingsUpdate();
        const lastSettingsUpdate =
          new Date(JSON.parse(localStorage.getItem("lastSettingsUpdate"))) || 0;

        const calcCourse = fireStoreSettingsUpdate - lastSettingsUpdate;

        if (calcCourse !== 0 || !settings.whatsAppURL) {
          const localSettings = JSON.parse(localStorage.getItem("settings"));

          if (localSettings && localSettings.whatsAppURL) {
            dispatch(fetchSettingsFromLocalStorage(localSettings));
          } else {
            dispatch(fetchWhatsAppSettings());
          }
        } else {
          const localSettings = JSON.parse(localStorage.getItem("settings"));
          dispatch(fetchSettingsFromLocalStorage(localSettings));
        }
      } catch (error) {
        console.error(
          "Erro ao buscar a última atualização do URL de WhatsApp:",
          error,
        );
      }
    };

    fetchSettingsData();
  }, []);

  return (
    <Box className="main-container flex flex-col bg-gray-200">
      <form
        id="newWhatsAppURLForm"
        className="flex w-full flex-grow flex-col gap-4 lg:mx-auto lg:mt-20 lg:max-w-5xl"
        onSubmit={handleSubmit(handleSubmitWhatsApp)}
      >
        <Input
          theme={"light"}
          type={"text"}
          label={"URL"}
          placeholder={"www.whatsapp.com/"}
          register={register}
          id={"url"}
          error={errors?.url?.message}
          watch={watch}
          defaultValue={settings?.whatsAppURL?.url}
        />
      </form>
      <Box className="flex w-full flex-col gap-4 lg:mx-auto lg:max-w-5xl">
        <ButtonSubmit
          form="newWhatsAppURLForm"
          disabled={loading}
          text={settings?.whatsAppURL ? "Alterar URL" : "Adicionar URL"}
          loading={loading}
        />
      </Box>
    </Box>
  );
}
