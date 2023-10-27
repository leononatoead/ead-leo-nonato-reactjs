import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssetsSchema } from "./extraSchemas";

import Input from "../../../../../components/Input";
import AssetsList from "./AssetsList";
import { Box, useToast } from "@chakra-ui/react";

export default function Assets({ videoData, setVideoData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(AssetsSchema),
  });

  const toast = useToast();

  const handleInputFileChange = (e) => {
    setVideoData((prev) => ({
      ...prev,
      assets: { ...prev.assets, assetFile: e.target.files[0] },
    }));
  };

  const handleAddFile = (formData) => {
    if (videoData.assets.assetType && videoData.assets.assetFile === null) {
      return toast({
        description: "Adicione um arquivo vídeo",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
    } else if (!videoData.assets.assetType && !formData.assetPath) {
      return toast({
        description: "Adicione uma URL válida",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
    }

    if (formData.assetPath) {
      try {
        const urlObj = new URL(formData.assetPath);

        const check =
          urlObj.protocol === "http:" || urlObj.protocol === "https:";

        if (!check) {
          return;
        }
      } catch {
        return toast({
          description: "Adicione uma URL válida",
          status: "error",
          duration: "3000",
          isClosable: true,
        });
      }
    }

    if (formData.assetPath) {
      const data = {
        fileName: formData.assetName,
        fileURL: formData.assetPath,
      };

      setVideoData((prev) => ({
        ...prev,
        assets: {
          ...prev.assets,
          assetsList: [...prev.assets.assetsList, data],
        },
      }));
    } else if (videoData.assets.assetFile) {
      const data = {
        fileName: formData.assetName,
        file: videoData.assets.assetFile,
      };

      setVideoData((prev) => ({
        ...prev,
        assets: {
          ...prev.assets,
          assetsList: [...prev.assets.assetsList, data],
        },
      }));
    }

    reset({
      assetName: "",
      assetPath: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddFile)}
      id="AddAssetForm"
      className="flex flex-col gap-[10px] pb-4"
    >
      <Input
        theme={"light"}
        type={"text"}
        label={"Nome"}
        placeholder={"Digite aqui"}
        register={register}
        id={"assetName"}
        error={errors?.assetName?.message}
        watch={watch}
      />
      {videoData?.assets.assetType ? (
        <div className="flex flex-col gap-2">
          <label
            htmlFor={"assetFile"}
            className="mb-[9px] block text-base leading-5"
          >
            Arquivo
          </label>
          <input
            type="file"
            name="assetFile"
            onChange={handleInputFileChange}
            multiple={false}
            accept=".pdf,.docx,.doc,.xlsx,.xls,.xlsm,.zip,.rar"
            title="Selecione um arquivo"
            className="w-full text-base outline-none"
            required
          />
        </div>
      ) : (
        <Input
          theme={"light"}
          type={"text"}
          label={"URL"}
          placeholder={"www.exemplo.com"}
          register={register}
          id={"assetPath"}
          error={errors?.assetPath?.message}
          watch={watch}
        />
      )}
      <Box className="flex items-center justify-start gap-4">
        <button
          className="mt-2 w-[50%] rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
          type="submit"
          form="AddAssetForm"
        >
          Incluir
        </button>

        {videoData.assets.assetsList.length > 0 && (
          <AssetsList videoData={videoData} setVideoData={setVideoData} />
        )}
      </Box>
    </form>
  );
}
