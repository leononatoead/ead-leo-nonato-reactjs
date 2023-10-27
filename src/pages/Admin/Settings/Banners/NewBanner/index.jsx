import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchBannerSettings,
  fetchSettingsFromLocalStorage,
} from "../../../../../redux/modules/settings/actions";
import useSettings from "../../../../../hooks/useSettings";
import useCheckUpdate from "../../../../../hooks/useCheckUpdate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BannerSchema } from "./BannerSchema";

import Input from "../../../../../components/Input";
import ButtonSubmit from "../../../../../components/ButtonSubmit";
import { Box } from "@chakra-ui/react";
import OrderInput from "../../../../../components/OrderInput";

export default function NewBanner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(BannerSchema),
  });

  const { addBanner, loading } = useSettings();
  const { verifySettingsUpdate } = useCheckUpdate();

  const dispatch = useDispatch();

  const handleAddBanner = (formData) => {
    addBanner(formData);
    reset({ order: "", imageURL: "", title: "", subtitle: "", url: "" });
  };

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const fireStoreSettingsUpdate = await verifySettingsUpdate();
        const lastSettingsUpdate =
          new Date(JSON.parse(localStorage.getItem("lastSettingsUpdate"))) || 0;

        const calcCourse = fireStoreSettingsUpdate - lastSettingsUpdate;

        if (calcCourse !== 0) {
          dispatch(fetchBannerSettings());
        } else {
          const settings = JSON.parse(localStorage.getItem("settings"));
          dispatch(fetchSettingsFromLocalStorage(settings));
        }
      } catch (error) {
        console.error(
          "Erro ao buscar a última atualização dos banners:",
          error,
        );
      }
    };

    fetchSettingsData();
  }, []);

  return (
    <Box className="main-container !flex !flex-col">
      <form
        id="newBannerForm"
        className="flex flex-grow flex-col gap-4"
        onSubmit={handleSubmit(handleAddBanner)}
      >
        <OrderInput register={register} watch={watch} />
        <Input
          theme={"light"}
          type={"text"}
          label={"Imagem"}
          placeholder={"www.exemplo.com"}
          register={register}
          id={"imageURL"}
          error={errors?.imageURL?.message}
          watch={watch}
        />
        <Input
          theme={"light"}
          type={"text"}
          label={"Título"}
          placeholder={"Digite o título aqui"}
          register={register}
          id={"title"}
          error={errors?.title?.message}
          watch={watch}
        />
        <Input
          theme={"light"}
          type={"text"}
          label={"Subtítulo"}
          placeholder={"Digite o subtítulo aqui"}
          register={register}
          id={"subtitle"}
          error={errors?.subtitle?.message}
          watch={watch}
        />
        <Input
          theme={"light"}
          type={"text"}
          label={"URL"}
          placeholder={"www.exemplo.com"}
          register={register}
          id={"url"}
          error={errors?.url?.message}
          watch={watch}
        />
      </form>
      <ButtonSubmit
        form="newBannerForm"
        disabled={false}
        text={"Confirmar"}
        loading={loading}
      />
    </Box>
  );
}
