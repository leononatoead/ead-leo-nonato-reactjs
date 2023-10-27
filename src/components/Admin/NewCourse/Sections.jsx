import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionSchema } from "./extraSchemas";

import Input from "../../Global/Input";
import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import SectionList from "./SectionList";
import { AiOutlineWarning } from "react-icons/ai";

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
    const filter = sections.filter(
      (section) => section.sectionName === formData.sectionName,
    );

    if (filter.length > 0) {
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
        className="flex flex-col gap-4 pb-4"
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
          <Box className={`flex flex-col gap-[9px]`}>
            <label htmlFor={"order"} className="text-base leading-5">
              Ordem
            </label>
            <Box
              className={`relative w-28 overflow-hidden rounded-[4px] after:absolute after:bottom-0 after:left-1/2 after:h-[2px]  after:-translate-x-1/2 after:bg-cian after:content-[''] ${
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
            label={"Nome do módulo"}
            placeholder={"Digite aqui"}
            register={register}
            id={"sectionName"}
            error={errors?.sectionName?.message}
            watch={watch}
          />
        </Flex>
      </form>
      <Box className="flex items-center justify-start gap-4">
        <button
          className="mt-2 w-[50%] rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
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
