import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdvertisementSchema } from "./extraSchemas";

import Input from "../../../../../components/Input";
import { Box } from "@chakra-ui/react";
import AdvertisementList from "./AdvertisementList";

export default function Advertisement({ videoData, setVideoData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(AdvertisementSchema),
  });

  const handleAddAdvertisement = (formData) => {
    setVideoData((prev) => ({
      ...prev,
      advertisement: {
        ...prev.advertisement,
        advertisementList: [formData],
      },
    }));

    reset({
      advertisementName: "",
      // advertisementTime: "",
      advertisementPath: "",
      advertisementImage: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddAdvertisement)}
      id="AddAdvertisementForm"
      className="flex flex-col gap-[10px] pb-4"
    >
      <Input
        theme={"light"}
        type={"text"}
        label={"URL da imagem"}
        placeholder={"www.exemplo.com"}
        register={register}
        id={"advertisementImage"}
        error={errors?.advertisementImage?.message}
        watch={watch}
      />
      <Input
        theme={"light"}
        type={"text"}
        label={"Nome"}
        placeholder={"Digite aqui"}
        register={register}
        id={"advertisementName"}
        error={errors?.advertisementName?.message}
        watch={watch}
      />
      {/* <Input
        theme={"light"}
        type={"text"}
        label={"Tempo do Vídeo"}
        placeholder={"Digite aqui"}
        register={register}
        id={"advertisementTime"}
        error={errors?.advertisementTime?.message}
        watch={watch}
      /> */}

      <Input
        theme={"light"}
        type={"text"}
        label={"URL de redirecionamento"}
        placeholder={"www.exemplo.com"}
        register={register}
        id={"advertisementPath"}
        error={errors?.advertisementPath?.message}
        watch={watch}
      />

      <Box className="flex items-center justify-start gap-4">
        {videoData.advertisement.advertisementList.length === 0 ? (
          <button
            className="mt-2 w-[50%] rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
            type="submit"
            form="AddAdvertisementForm"
          >
            Incluir
          </button>
        ) : (
          <button
            className="mt-2 w-[50%] rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
            type="submit"
            form="AddAdvertisementForm"
          >
            Editar
          </button>
        )}

        {videoData.advertisement.advertisementList.length > 0 && (
          <AdvertisementList
            videoData={videoData}
            setVideoData={setVideoData}
          />
        )}
      </Box>
    </form>
  );
}
