import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationsSettings,
  fetchSettingsFromLocalStorage,
} from "../../../../../redux/modules/settings/actions";
import useSettings from "../../../../../hooks/useSettings";
import useCheckUpdate from "../../../../../hooks/useCheckUpdate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotificationSchema } from "../NewNotification/NotificationSchema";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../../../../components/Input";
import ButtonSubmit from "../../../../../components/ButtonSubmit";
import ConfirmModal from "../../../../../components/ConfirmModal";
import { Box, Flex } from "@chakra-ui/react";

export default function EditNotification() {
  const { id } = useParams();
  const { notifications } = useSelector((state) => state.settings);
  const notification = notifications?.find(
    (notification) => notification.id === id,
  );

  console.log(notification);

  const [openConfirmModal, setOpenConfirmModal] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(NotificationSchema),
  });

  const { updateNotification, deleteNotification, loading } = useSettings();
  const { verifySettingsUpdate } = useCheckUpdate();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditNotification = (formData) => {
    updateNotification(id, formData);
  };

  const handleDeleteNotification = () => {
    deleteNotification(id);
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
          dispatch(fetchNotificationsSettings());
        } else {
          const settings = JSON.parse(localStorage.getItem("settings"));
          dispatch(fetchSettingsFromLocalStorage(settings));
        }
      } catch (error) {
        console.error(
          "Erro ao buscar a última atualização dos notificações:",
          error,
        );
      }
    };

    fetchSettingsData();
  }, []);

  return (
    <Box className="main-container !flex !flex-col">
      <form
        id="editNotificationForm"
        className="flex w-full flex-grow flex-col gap-4 lg:mx-auto lg:mt-6 lg:max-w-5xl"
        onSubmit={handleSubmit(handleEditNotification)}
      >
        <Input
          theme={"light"}
          type={"text"}
          label={"Imagem"}
          placeholder={"www.exemplo.com"}
          register={register}
          id={"imageURL"}
          error={errors?.imageURL?.message}
          watch={watch}
          defaultValue={notification?.imageURL}
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
          defaultValue={notification?.title}
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
          defaultValue={notification?.subtitle}
        />
        <Input
          theme={"light"}
          type={"textarea"}
          label={"Conteúdo"}
          placeholder={"Digite o texto aqui"}
          register={register}
          id={"text"}
          error={errors?.text?.message}
          watch={watch}
          defaultValue={notification?.text}
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
          defaultValue={notification?.url}
        />
      </form>

      <Flex
        flexDirection={"column"}
        gap={2}
        className="mt-6 w-full lg:mx-auto lg:max-w-5xl"
      >
        <ButtonSubmit
          form="editNotificationForm"
          disabled={false}
          text={"Editar"}
          loading={loading}
        />
        <ConfirmModal
          deleteFunction={handleDeleteNotification}
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
        />
      </Flex>
    </Box>
  );
}
