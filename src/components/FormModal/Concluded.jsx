import { ModalBody, ModalContent, Text } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function Concluded() {
  return (
    <ModalContent
      className="!w-[90%] !max-w-[600px] self-center !bg-gray-200"
      p={6}
    >
      <ModalBody p={0} className="flex flex-col items-center justify-center">
        <IoIosCheckmarkCircleOutline
          className="mb-6 text-green-200"
          size={80}
        />

        <Text
          className="poppins w-full text-center text-large font-bold leading-6 text-primary-400 "
          mb={2}
        >
          Resposta enviada!
        </Text>
        <Text className="text-base font-medium leading-5">
          Em breve de nossos colaboradores entrará em contato com você.
        </Text>
      </ModalBody>
    </ModalContent>
  );
}
