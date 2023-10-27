import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "./loginSchema";

import Input from "../Input";
import ButtonSubmit from "../ButtonSubmit";
import {
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";

export default function ResetPasswordForm({ show }) {
  const { resetPassword, loading } = useAuth();

  const [timer, setTimer] = useState(60);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetSchema),
  });

  const handleReset = (formData) => {
    resetPassword(formData.email, setSuccess);
  };

  const handleSendAgain = () => {
    setSuccess(false);
    setTimer(60);
  };

  useEffect(() => {
    if (success) {
      if (timer > 0) {
        const timerInterval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => {
          clearInterval(timerInterval);
        };
      }
    }
  }, [success]);

  return (
    <>
      {!success ? (
        <>
          <ModalHeader p={0} mb={6}>
            <Heading className="w-full text-center !font-poppins !text-large font-bold text-primary-500">
              Esqueci minha senha
            </Heading>

            <Text className="mt-4 text-center text-base font-medium leading-5">
              Digite o e-mail que você utiliza na plataforma e enviaremos um
              link para redefinir sua senha
            </Text>
          </ModalHeader>
          <ModalBody p={0}>
            <form
              id="resetForm"
              onSubmit={handleSubmit(handleReset)}
              className="p-4"
            >
              <Input
                theme={"light"}
                type={"email"}
                label={"E-mail"}
                placeholder={"exemplo@exemplo.com"}
                register={register}
                id={"email"}
                error={errors?.email?.message}
                watch={watch}
              />
            </form>
          </ModalBody>
          <ModalFooter p={0} className="flex flex-col" px={"10px"}>
            <ButtonSubmit
              form="resetForm"
              disabled={false}
              text={"Enviar"}
              loading={loading}
            />
            <button className="mt-2 h-8" onClick={() => show(false)}>
              Voltar
            </button>
          </ModalFooter>
        </>
      ) : (
        <>
          <ModalHeader p={0} mb={6} px={4}>
            <Heading className="w-full text-center !font-poppins !text-large font-bold text-primary-500">
              E-mail enviado!
            </Heading>

            <Text className="mt-4 text-center text-base font-medium leading-5">
              Verifique sua caixa de entrada no e-mail para redefinir sua senha
            </Text>
          </ModalHeader>

          <ModalBody p={0} px={4} mb={8}>
            <Text className="text-base font-medium leading-5">
              Não recebeu?{" "}
              <button
                className="text-primary-400"
                onClick={handleSendAgain}
                disabled={timer > 0}
              >
                {timer > 0 ? `Reenviar em ${timer}s` : "Reenviar código"}
              </button>
            </Text>
          </ModalBody>
          <ModalFooter p={0} px={"10px"}>
            <button
              className="w-full rounded-[4px] bg-primary-400 px-3 py-[5px] text-base leading-5 text-white disabled:bg-white/30"
              onClick={() => show(false)}
            >
              OK
            </button>
          </ModalFooter>
        </>
      )}
    </>
  );
}
