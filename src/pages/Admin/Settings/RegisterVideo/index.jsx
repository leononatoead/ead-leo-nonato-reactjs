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
import { Link } from "react-router-dom";

import Input from "../../../../components/Input";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import { Box, useToast } from "@chakra-ui/react";
import { RiArrowLeftSLine } from "react-icons/ri";

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
  const toast = useToast();

  const handleSubmitVideoURL = (formData) => {
    let data;
    if (formData.url?.includes("pandavideo")) {
      const idMatch = formData.url.match(/id="([^"]+)"/);
      const srcMatch = formData.url.match(/src="([^"]+)"/);

      const id = idMatch ? idMatch[1] : "Nenhum ID encontrado";
      const src = srcMatch ? srcMatch[1] : "Nenhum SRC encontrado";

      data = { id, src };
    }

    if (formData.url?.includes("youtube")) {
      try {
        const urlObj = new URL(formData.url);
        const check =
          urlObj.protocol === "http:" || urlObj.protocol === "https:";
        if (!check) {
          return;
        }

        data = { id: null, src: formData.url };
      } catch {
        return toast({
          description: "Adicione uma URL válida",
          status: "error",
          duration: "3000",
          isClosable: true,
        });
      }
    }

    addRegisterVideoURL(data);
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
        id="newRegisterVideoURLForm"
        className="flex w-full flex-grow flex-col gap-4 lg:mx-auto lg:mt-20 lg:max-w-5xl"
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
      <Box className="flex w-full flex-col gap-4 lg:mx-auto lg:max-w-5xl">
        <ButtonSubmit
          form="newRegisterVideoURLForm"
          disabled={loading}
          text={
            settings?.registerVideoURL ? "Alterar vídeo" : "Adicionar vídeo"
          }
          loading={loading}
        />
      </Box>
    </Box>
  );
}
