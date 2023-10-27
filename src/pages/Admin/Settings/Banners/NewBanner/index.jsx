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

import Input from "../../../../../components/Global/Input";
import ButtonSubmit from "../../../../../components/Global/ButtonSubmit";
import { Box } from "@chakra-ui/react";

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
        <Box className={`flex flex-col gap-[9px]`}>
          <label htmlFor={"order"} className="text-base leading-5">
            Ordem
          </label>
          <Box
            className={`relative w-full overflow-hidden rounded-[4px] after:absolute after:bottom-0 after:left-1/2 after:h-[2px]  after:-translate-x-1/2 after:bg-cian after:content-[''] ${
              watch("order") ? "after:w-full" : "after:w-0"
            } animation hover:after:w-full ${
              errors?.order?.message && "after:w-full after:bg-red-500"
            } shadow-sm shadow-gray-900/50 `}
          >
            <input
              id={"order"}
              type="number"
              placeholder={"0"}
              {...register("order", { valueAsNumber: true })}
              className={`w-full rounded-[4px] bg-white px-3 py-[5px] text-base leading-5 outline-none placeholder:text-gray-900`}
              autoComplete="false"
              min={0}
              max={999}
              step={1}
            />
            {errors?.order?.message && (
              <Box className={`absolute right-1 top-1 text-red-500`}>
                <AiOutlineWarning size={20} className="text-red-500" />
              </Box>
            )}
          </Box>
          <span className="-mt-1 text-small text-red-500">
            {errors?.order?.message}
          </span>
        </Box>
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
