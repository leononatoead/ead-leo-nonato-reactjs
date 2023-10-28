import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";

import ModalComponent from "../../../../components/ModalComponent";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import { ModalBody, ModalFooter, Text } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function ChangeProfileImage({ openModal, setOpenModal, user }) {
  const { changeImage, loading } = useAuth();

  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    changeImage(image, setSuccess, user);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSuccess(false);
  };

  return (
    <ModalComponent
      title={success ? "" : "Foto de Perfil"}
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
            <Text className="poppins w-full text-center text-large font-bold leading-6 text-primary-400 ">
              Imagem de perfil alterada!
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
              id="changeProfileImageForm"
              onSubmit={handleChange}
              className="px-4"
            >
              <label
                htmlFor={"videoFile"}
                className="mb-[3px] block text-base leading-5"
              >
                Selecionar imagem
              </label>

              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full text-base outline-none"
              />
            </form>
          </ModalBody>
          <ModalFooter p={0} className="flex flex-col" px={"10px"}>
            <ButtonSubmit
              form="changeProfileImageForm"
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
