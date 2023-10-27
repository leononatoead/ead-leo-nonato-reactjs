import { useState } from "react";
import { Link } from "react-router-dom";

import ModalComponent from "./ModalComponent";
import LoginModal from "./LoginModal";

import { Image, ModalBody, Flex, Heading, Text } from "@chakra-ui/react";
// import { Image } from "@chakra-ui/image";
// import { ModalBody } from "@chakra-ui/modal";
// import { Flex, Heading, Text } from "@chakra-ui/layout";
import locker from "../assets/premium.png";

export default function PremiumPost({ open, close }) {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleCloseModal = () => {
    close(false);
  };

  return (
    <ModalComponent
      openModal={open}
      setOpenModal={close}
      handleCloseModal={handleCloseModal}
      hasCloseButton={false}
    >
      <ModalBody>
        <Flex flexDirection={"column"} justify={"center"} align={"center"}>
          <Image
            src={locker}
            alt="locked"
            className="h-20 w-20 rounded-2xl object-cover"
            mb={6}
          />
          <Heading
            className="!w-full !text-center !font-poppins !text-large !font-semibold !leading-6 !text-primary-500"
            mb={2}
          >
            Conteúdo disponível para usuários
          </Heading>
          <Text className="text-center text-base font-medium leading-5 " mb={8}>
            Desbloqueie esse e muitos outros conteúdos se cadastrando na nossa
            plataforma
          </Text>

          <Flex flexDirection={"column"} gap={4} className="w-full">
            <button
              onClick={() => setOpenLoginModal(true)}
              className="w-full gap-2 rounded-[4px] bg-primary-400 px-4 py-[5px] text-center text-base leading-5  text-white"
            >
              Entre ou cadastre-se
            </button>
            <Link to="/" className="w-full py-[5px] text-center">
              Voltar
            </Link>
          </Flex>
        </Flex>
      </ModalBody>
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </ModalComponent>
  );
}
