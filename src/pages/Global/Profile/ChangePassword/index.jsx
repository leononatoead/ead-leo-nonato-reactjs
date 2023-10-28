import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "./changePasswordSchema";

import ModalComponent from "../../../../components/ModalComponent";
import Input from "../../../../components/Input";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import { ModalBody, ModalFooter, Text } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function ChangePassword({ openModal, setOpenModal }) {
  const { changePassword, loading } = useAuth();

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleChange = (formData) => {
    changePassword(formData.newPassword, setSuccess);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSuccess(false);
    reset({ newPassword: "", confirmNewPassword: "" });
  };

  return (
    <ModalComponent
      title={success ? "" : "Alterar Senha"}
      openModal={openModal}
      setOpenModal={setOpenModal}
      handleCloseModal={handleCloseModal}
    >
      {success ? (
        <>
          <ModalBody p={0} mb={8} className="flex flex-col items-center">
            <IoIosCheckmarkCircleOutline
              className="mb-6 text-green-200"
              size={80}
            />

            <Text
              className="poppins w-full text-center text-large font-bold leading-6 text-primary-400 "
              mb={2}
            >
              Senha alterada!
            </Text>
            <Text className="text-base font-medium leading-5">
              No seu próximo acesso, utilize a nova senha.
            </Text>
          </ModalBody>

          <ModalFooter p={0} className="flex flex-col" px={"10px"}>
            <button
              className="w-full rounded-[4px] bg-primary-400 px-3 py-[5px] text-base leading-5 text-white disabled:bg-gray-900/30"
              onClick={handleCloseModal}
            >
              Voltar
            </button>
          </ModalFooter>
        </>
      ) : (
        <>
          <ModalBody p={0} mb={9}>
            <form
              id="changePasswordForm"
              onSubmit={handleSubmit(handleChange)}
              className="px-4"
            >
              <Input
                theme={"light"}
                type={"password"}
                label={"Nova senha"}
                placeholder={"********"}
                register={register}
                id={"newPassword"}
                error={errors?.newPassword?.message}
                watch={watch}
              />
              <Text className="!text-small text-gray-900" mb={4}>
                A senha deve ter pelo menos 8 caracteres e incluir um número ou
                caracter especial.
              </Text>
              <Input
                theme={"light"}
                type={"password"}
                label={"Confirmar nova senha"}
                placeholder={"********"}
                register={register}
                id={"confirmNewPassword"}
                error={errors?.confirmNewPassword?.message}
                watch={watch}
              />
            </form>
          </ModalBody>
          <ModalFooter p={0} className="flex flex-col" px={"10px"}>
            <ButtonSubmit
              form="changePasswordForm"
              disabled={false}
              text={"Alterar"}
              loading={loading}
            />
          </ModalFooter>
        </>
      )}
    </ModalComponent>
  );
}
