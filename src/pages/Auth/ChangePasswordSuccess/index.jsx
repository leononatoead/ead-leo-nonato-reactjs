import { Link } from "react-router-dom";

import AuthHeader from "../AuthHeader";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function ChangePasswordSuccess() {
  return (
    <Flex flexDirection={"column"} className="min-h-[100dvh] bg-gray-200">
      <AuthHeader />

      <Box px={4} mt={1}>
        <AiOutlineCheckCircle size={80} className="mb-6 text-[#89D185]" />
        <Heading
          className="!font-poppins !text-large !font-bold !leading-6 text-primary-600"
          mb={2}
        >
          Senha alterada!
        </Heading>
        <Text className="!text-base !font-medium !leading-5 !text-black" mb={6}>
          Agora você já pode retornar à plataforma e fazer o login com sua nova
          senha.
        </Text>
      </Box>
      <Flex
        flexDirection={"column"}
        className="!flex-grow justify-end"
        px={"10px"}
        pb={6}
        gap={4}
      >
        <Link
          to="/"
          className="w-full rounded-[4px] bg-primary-400 px-3 py-[5px] text-center text-base leading-5 text-white"
        >
          Retornar à plataforma
        </Link>
      </Flex>
    </Flex>
  );
}
