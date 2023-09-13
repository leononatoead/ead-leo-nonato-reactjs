import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./registerSchema";

import { cpf } from "cpf-cnpj-validator";

import useAuth from "../../../hooks/useAuth";
import Input from "../../../components/Global/Input";

import ButtonSubmit from "../../../components/Global/ButtonSubmit";

import { useState } from "react";
import { Link } from "react-router-dom";

import { Box, Heading, Image, Text, useMediaQuery } from "@chakra-ui/react";

import logo from "../../../assets/auth-logo-black.svg";
import background from "../../../assets/auth-bg.jpeg";

export default function Register() {
  const { registerUser } = useAuth();
  // TODO: fazer a logica do loading, só botei pra não dar erro
  const [loading, setLoading] = useState(false);

  const [cpfError, setCpfError] = useState();
  const [isLargerThanLg] = useMediaQuery("(min-width: 992px)");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const handleRegister = (formData) => {
    const verifyCPF = cpf.isValid(formData.cpf);

    if (verifyCPF) {
      const data = {
        name: formData.name,
        cpf: formData.cpf,
        email: formData.email,
        password: formData.password,
      };
      registerUser(data);
      setCpfError("");
    } else {
      setCpfError("CPF Inválido");
    }
  };

  return (
    <Box
      w="100%"
      color="white"
      borderBottom={"1px"}
      borderBottomColor={"primary-400"}
      className="relative bg-gray-200 min-h-screen"
      display={{ base: "block", lg: "flex" }}
    >
      {/* CONTAINER VIDEO */}
      <Box w={{ lg: "50%" }} p={{ lg: "5%" }}>
        <Box
          w="100%"
          h="160px"
          borderRadius={"0 0 16px 16px"}
          className={isLargerThanLg ? "" : "auth-bg"}
          overflow="hidden"
          position="relative"
        >
          <Link
            to="/"
            className="absolute top-8 w-full flex justify-center pt-4 pb-8"
          >
            <Image src={logo} alt="logo" />
          </Link>
        </Box>

        <Box
          marginTop={"-40px"}
          px={4}
          h={{ lg: "60%" }}
          className="rounded-lg  overflow-hidden"
        >
          <video
            src="https://www.youtube.com/watch?v=paNdkV9RcSs"
            autoPlay
            controls
            className="rounded-lg w-full h-full border-b-gray-900 border-b-2 overflow-hidden"
          />
        </Box>
      </Box>

      {/* CONTAINER DO FORM */}
      <Box
        w={{ lg: "50%" }}
        className={isLargerThanLg ? "auth-bg flex-column-center" : ""}
        p={{ lg: "5% 10%" }}
      >
        <Box
          borderRadius={{ lg: "0.5rem" }}
          backgroundColor={{ lg: "white" }}
          p={{ lg: "2rem 1rem" }}
          boxShadow={{ lg: "0px 8px 16px 0px rgba(0, 0, 0, 0.14)" }}
        >
          <Box px={4} mt={{ base: "24px", lg: "0" }} mb={"16px"}>
            <Heading
              fontSize={"18px"}
              fontWeight={"bold"}
              lineHeight={"24px"}
              className="!font-poppins text-primary-600"
              mb="2px"
            >
              Preparado para fazer um salário mínimo por dia?
            </Heading>

            <Text
              fontSize={"14px"}
              fontWeight={"500"}
              lineHeight={"20px"}
              className="!font-inter text-primary-600"
            >
              Cadastre para obter acesso aos conteúdos que mudarão sua vida.
            </Text>
          </Box>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col px-5 gap-4"
            id="registerForm"
          >
            <Input
              theme={"light"}
              type={"text"}
              label={"Nome completo"}
              placeholder={"Digite aqui"}
              register={register}
              id={"name"}
              error={errors?.name?.message}
              watch={watch}
            />
            <Input
              theme={"light"}
              type={"text"}
              label={"CPF"}
              placeholder={"Digite aqui"}
              register={register}
              id={"cpf"}
              error={errors?.cpf?.message || cpfError}
              watch={watch}
            />
            <Input
              theme={"light"}
              type={"email"}
              label={"E-mail"}
              placeholder={"Digite aqui"}
              register={register}
              id={"email"}
              error={errors?.email?.message}
              watch={watch}
            />
            <Input
              theme={"light"}
              type={"password"}
              label={"Senha"}
              placeholder={"********"}
              register={register}
              id={"password"}
              error={errors?.password?.message}
              watch={watch}
            />
            <Input
              theme={"light"}
              type={"password"}
              label={"Confirme sua senha"}
              placeholder={"********"}
              register={register}
              id={"confirmPassword"}
              error={errors?.confirmPassword?.message}
              watch={watch}
            />

            <Text
              color={"#000000E4"}
              fontSize={"14px"}
              lineHeight={"20px"}
              fontWeight={"500"}
              mb={"14px"}
            >
              Já tem uma conta?{" "}
              <Link to={"/"} className="text-[#005FB8] text-[14px] font-medium">
                Fazer login
              </Link>{" "}
            </Text>
          </form>
          <Box p={"10px"}>
            <ButtonSubmit
              theme={"light"}
              form="registerForm"
              disabled={Object.keys(dirtyFields).length !== 5 || loading}
              text={"Cadastrar"}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
