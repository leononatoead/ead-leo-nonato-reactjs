import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionSchema } from "./extraSchemas";

import Input from "../../../../components/Input";
import { Box, Flex, Heading, useToast } from "@chakra-ui/react";
import SectionList from "./SectionList";

import OrderInput from "../../../../components/OrderInput";

export default function Sections({ sections, setSections }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(SectionSchema),
  });

  const toast = useToast();

  const handleAddFile = (formData) => {
    const filterOrder = sections.find(
      (section) => section.order === formData.order,
    );

    if (filterOrder) {
      toast({
        description: "Já existe uma ordem com este valor!",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      return;
    }

    const filterName = sections.filter(
      (section) => section.sectionName === formData.sectionName,
    );

    if (filterName.length > 0) {
      toast({
        description: "Já existe uma seção com este nome!",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      return;
    }

    setSections((prev) => [...prev, formData]);

    reset({
      order: "",
      sectionName: "",
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleAddFile)}
        id="addSectionForm"
        className="flex flex-col gap-2"
      >
        <Heading className="!font-poppins !text-large !font-bold !text-primary-600">
          Módulos
        </Heading>

        <Flex
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          className="w-full"
          gap={4}
        >
          <OrderInput
            register={register}
            watch={watch}
            error={errors?.order?.message}
          />
          <Input
            theme={"light"}
            type={"text"}
            label={"Nome do módulo"}
            placeholder={"Digite aqui"}
            register={register}
            id={"sectionName"}
            error={errors?.sectionName?.message}
            watch={watch}
          />
        </Flex>
      </form>
      <Box className="flex items-start justify-start gap-4">
        <button
          className="w-[50%] rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
          type="submit"
          form="addSectionForm"
        >
          Incluir
        </button>

        {sections.length > 0 && (
          <SectionList sections={sections} setSections={setSections} />
        )}
      </Box>
    </>
  );
}
