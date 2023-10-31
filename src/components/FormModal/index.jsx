import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms } from "../../redux/modules/forms/actions";
import { useForm } from "react-hook-form";

import Input from "../Input";
import ButtonSubmit from "../ButtonSubmit";
import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";

export default function FormModal({ open, close, formId }) {
  const { register, handleSubmit, watch } = useForm();
  const { forms } = useSelector((state) => state.forms);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (!forms) {
      dispatch(fetchForms());
    }
  }, []);

  const form = forms?.find((form) => form.id === formId);

  const submitForm = (formData) => {
    const keys = Object.keys(formData);

    const verify = keys.filter((field) => formData[field] === "");

    if (verify.length > 0) {
      toast({
        description: "Preencha todos os campos do formulário!",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      return;
    } else {
      console.log(formData);
    }
  };

  return (
    <Modal isOpen={open} onClose={() => close(false)}>
      <ModalOverlay />
      <ModalContent
        className="!w-[90%] !max-w-[600px] self-center !bg-gray-200"
        p={6}
      >
        <ModalHeader pb={6} mb={6}>
          <Heading className="w-full text-center !font-poppins !text-large font-bold text-primary-500">
            {form?.title}
          </Heading>
        </ModalHeader>
        <ModalBody p={0}>
          <form
            id="accessForm"
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-col gap-4 px-4"
          >
            {form?.fields?.map((field) => {
              if (field.type === "text") {
                return (
                  <Input
                    key={field.id}
                    theme={"light"}
                    type={"text"}
                    label={field.field}
                    placeholder={field.placeholder}
                    register={register}
                    id={field.id}
                    watch={watch}
                  />
                );
              } else if (field.type === "email") {
                return (
                  <Input
                    key={field.id}
                    theme={"light"}
                    type={"email"}
                    label={field.field}
                    placeholder={field.placeholder}
                    register={register}
                    id={field.id}
                    watch={watch}
                  />
                );
              } else if (field.type === "number") {
                return (
                  <Input
                    key={field.id}
                    theme={"light"}
                    type={"number"}
                    label={field.field}
                    placeholder={field.placeholder}
                    register={register}
                    id={field.id}
                    watch={watch}
                  />
                );
              }
            })}
          </form>
          <ModalFooter pt={6} px={"16px"}>
            <ButtonSubmit
              form="accessForm"
              disabled={false}
              text={"Enviar"}
              //   loading={loading}
            />
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
