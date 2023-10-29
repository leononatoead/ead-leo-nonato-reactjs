import { useState } from "react";
import { useSelector } from "react-redux";
import useFormatPhone from "../../../hooks/useFormat";
import { Link } from "react-router-dom";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ChangePassword from "./ChangePassword";
import ChangeProfileImage from "./ChangeProfileImage";
import {
  Box,
  Image,
  Avatar,
  Heading,
  Flex,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { BiPencil } from "react-icons/bi";
import background from "../../../assets/auth-background.png";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);

  const [openEditPhotoModal, setOpenEditPhotoModal] = useState(false);
  const [openEditPasswordModal, setOpenEditPasswordModal] = useState(false);

  const { formatPhone } = useFormatPhone();

  return (
    <Box className="flex min-h-[100dvh] flex-col justify-between bg-gray-200 pb-6">
      <Box>
        <Navbar title={"Perfil"} />
        <Box>
          <Image
            src={background}
            alt="background"
            className="h-[120px] w-full rounded-bl-[16px] rounded-br-[16px] object-cover"
          />

          <Box className="-mt-12 mb-4 flex justify-center lg:mb-6 lg:mt-12">
            <Box className="relative">
              <Avatar
                name={user?.name}
                src={user?.photoURL}
                className="!h-24 !w-24 border-4 !border-primary-600 !bg-primary-600 !text-white lg:!h-32 lg:!w-32"
              />

              <button
                className="absolute right-0 top-16 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white shadow-md shadow-black/40 lg:right-2 lg:top-24 "
                onClick={() => setOpenEditPhotoModal(true)}
              >
                <BiPencil />
              </button>
            </Box>
          </Box>

          <Heading className="mb-1 w-full text-center !font-poppins !text-large !font-bold leading-6 lg:!text-[24px] lg:!leading-6">
            {user.name}
          </Heading>

          <Link
            to="/courses/my-courses"
            className="mb-5 block w-full text-center text-small leading-4 text-primary-400 lg:mb-14 lg:text-base lg:leading-6"
          >
            Ver meus cursos
          </Link>
        </Box>

        <Flex
          flexDirection="column"
          gap={4}
          px={5}
          className="mx-auto max-w-7xl lg:max-w-3xl"
        >
          <Heading className="!font-poppins !text-normal !font-semibold !leading-6 lg:!text-xlarge lg:!leading-9">
            Dados pessoais
          </Heading>
          <Box className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
            <Flex
              flexDirection="column"
              gap={1}
              className="w-full lg:max-w-[370px]"
            >
              <Text className="text-base">CPF</Text>
              <Text
                className="w-full rounded-[4px]  bg-white text-base leading-5 text-gray-400 shadow-sm  shadow-gray-900/50 outline-none"
                px={3}
                py={"5px"}
              >
                {user.cpf}
              </Text>
            </Flex>
            <Flex
              flexDirection="column"
              gap={1}
              className="w-full lg:max-w-[370px]"
            >
              <Text className="text-base leading-5">E-mail</Text>
              <Text
                className="w-full rounded-[4px]  bg-white text-base leading-5 text-gray-400 shadow-sm  shadow-gray-900/50 outline-none"
                px={3}
                py={"5px"}
              >
                {user.email}
              </Text>
            </Flex>
          </Box>
          <Box className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
            <Flex
              flexDirection="column"
              gap={1}
              className="w-full lg:max-w-[370px]"
            >
              <Text className="text-base ">Celular</Text>
              <Text
                className="w-full rounded-[4px]  bg-white text-base leading-5 text-gray-400 shadow-sm  shadow-gray-900/50 outline-none"
                px={3}
                py={"5px"}
              >
                {formatPhone(user?.phoneNumber)}
              </Text>
            </Flex>
            <Flex
              flexDirection="column"
              gap={1}
              className="relative w-full lg:max-w-[370px]"
            >
              <Text className="text-base leading-5">Senha</Text>
              <Text
                className="w-full rounded-[4px]  bg-white text-base leading-5 text-gray-400 shadow-sm  shadow-gray-900/50 outline-none"
                px={3}
                py={"5px"}
              >
                ********
                <button
                  className="absolute right-0 top-6 h-[28px] w-[32px] rounded-sm outline-none "
                  onClick={() => setOpenEditPasswordModal(true)}
                >
                  <BiPencil className="text-gray-700" />
                </button>
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Box className="hidden lg:block">
        <Footer />
      </Box>

      <ChangeProfileImage
        openModal={openEditPhotoModal}
        setOpenModal={setOpenEditPhotoModal}
        user={user}
      />

      <ChangePassword
        openModal={openEditPasswordModal}
        setOpenModal={setOpenEditPasswordModal}
      />
    </Box>
  );
}
