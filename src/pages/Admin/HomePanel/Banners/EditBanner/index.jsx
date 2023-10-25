import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingsFromLocalStorage,
  fetchBannerSettings,
} from "../../../../../redux/modules/settings/actions";
import useSettings from "../../../../../hooks/useSettings";
import useCheckUpdate from "../../../../../hooks/useCheckUpdate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BannerSchema } from "../NewBanner/BannerSchema";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Flex } from "@chakra-ui/react";
import Input from "../../../../../components/Global/Input";
import ButtonSubmit from "../../../../../components/Global/ButtonSubmit";
import ConfirmModal from "../../../../../components/Global/ConfirmModal";

export default function EditBanner() {
  const { id } = useParams();
  const { banners } = useSelector((state) => state.settings);
  const banner = banners?.find((banner) => banner.id === id);

  const [openConfirmModal, setOpenConfirmModal] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(BannerSchema),
  });

  const { updateBanner, deleteBanner, loading } = useSettings();
  const { verifySettingsUpdate } = useCheckUpdate();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddBanner = (formData) => {
    updateBanner(id, formData);
  };

  const handleDeleteBanner = () => {
    deleteBanner(id);
    navigate("/dashboard/settings");
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
        <Input
          theme={"light"}
          type={"number"}
          label={"Ordem"}
          placeholder={"0"}
          register={register}
          id={"order"}
          error={errors?.order?.message}
          watch={watch}
          defaultValue={banner?.order}
        />
        <Input
          theme={"light"}
          type={"text"}
          label={"Imagem"}
          placeholder={"www.exemplo.com"}
          register={register}
          id={"imageURL"}
          error={errors?.imageURL?.message}
          watch={watch}
          defaultValue={banner?.imageURL}
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
          defaultValue={banner?.title}
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
          defaultValue={banner?.subtitle}
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
          defaultValue={banner?.url}
        />
      </form>

      <Flex flexDirection={"column"} gap={2}>
        <ButtonSubmit
          form="newBannerForm"
          disabled={false}
          text={"Editar"}
          loading={loading}
        />
        <ConfirmModal
          deleteFunction={handleDeleteBanner}
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
        />
      </Flex>
    </Box>
  );
}
