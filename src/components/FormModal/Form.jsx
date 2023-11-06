import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms } from "../../redux/modules/forms/actions";
import useForms from "../../hooks/useForms";
import { useForm } from "react-hook-form";

import Input from "../Input";
import ButtonSubmit from "../ButtonSubmit";
import {
  Heading,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";

export default function Form({ formId, courseId, setSubmited }) {
  const { register, handleSubmit, watch } = useForm();
  const { user } = useSelector((state) => state.auth);
  const { forms } = useSelector((state) => state.forms);
  const dispatch = useDispatch();
  const toast = useToast();

  const { submitForm: submitFormDB } = useForms();

  useEffect(() => {
    if (!forms) {
      dispatch(fetchForms());
    }
  }, []);

  const form = forms?.find((form) => form.id === formId);

  const submitForm = (formData) => {
    const keys = Object.keys(formData);

    const verify = keys.filter((field) => formData[field] === "");

    console.log(form);

    if (verify.length > 0) {
      toast({
        description: "Preencha todos os campos do formulário!",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      return;
    } else {
      const userData = {
        name: user.name,
        email: user.email,
        id: user.uid,
        phone: user.phoneNumber,
        cpf: user.cpf,
      };

      let answers = [];

      form.fields.forEach((item) => {
        const findId = formData[item.id];

        const field = {
          question: item.field,
          answer: findId,
        };

        answers.push(field);
      });

      const data = { user: userData, answers };

      const submitedCourseForms = localStorage.getItem("submitedCourseForms");

      if (submitedCourseForms) {
        const submited = JSON.parse(submitedCourseForms);
        const data = JSON.stringify([...submited, formId]);
        localStorage.setItem("submitedCourseForms", data);
      } else {
        const data = JSON.stringify([formId]);
        localStorage.setItem("submitedCourseForms", data);
      }

      submitFormDB(data, courseId);
      setSubmited(true);
    }
  };

  return (
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
  );
}
