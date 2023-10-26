import { useEffect, useState } from "react";
import {
  fetchRegisterVideoSettings,
  fetchSettingsFromLocalStorage,
  fetchStudantClassesSettings,
} from "../../../redux/modules/settings/actions";
import { useDispatch, useSelector } from "react-redux";
import useCheckUpdate from "../../../hooks/useCheckUpdate";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./registerSchema";
import { cpf } from "cpf-cnpj-validator";
import { Link } from "react-router-dom";

import Input from "../../../components/Global/Input";
import ButtonSubmit from "../../../components/Global/ButtonSubmit";
import { Box, Heading, Image, Text, useMediaQuery } from "@chakra-ui/react";
import logo from "../../../assets/auth-logo-black.svg";

export default function Register() {
  const [cpfError, setCpfError] = useState();
  const [isLargerThanLg] = useMediaQuery("(min-width: 992px)");

  const { registerUser, loading } = useAuth();
  const { verifySettingsUpdate } = useCheckUpdate();

  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

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
        studantClass:
          settings?.studantClasses?.length > 0
            ? settings?.studantClasses[0]
            : null,
      };
      registerUser(data);
      setCpfError("");
    } else {
      setCpfError("CPF Inválido");
    }
  };

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const fireStoreSettingsUpdate = await verifySettingsUpdate();
        const lastSettingsUpdate =
          new Date(JSON.parse(localStorage.getItem("lastSettingsUpdate"))) || 0;

        const calcCourse = fireStoreSettingsUpdate - lastSettingsUpdate;
        const localSettings = JSON.parse(localStorage.getItem("settings"));

        if (calcCourse !== 0 && !localSettings) {
          dispatch(fetchRegisterVideoSettings());
          dispatch(fetchStudantClassesSettings());
        } else {
          dispatch(fetchSettingsFromLocalStorage(localSettings));

          if (!settings.studantClasses && !localSettings.studantClasses) {
            dispatch(fetchStudantClassesSettings());
          }

          if (!settings.registerVideoURL && !localSettings.registerVideoURL) {
            dispatch(fetchRegisterVideoSettings());
          }
        }
      } catch (error) {
        console.error(
          "Erro ao buscar a última atualização das configurações:",
          error,
        );
      }
    };

    fetchSettingsData();
  }, []);

  return (
    <Box
      w="100%"
      color="white"
      borderBottom={"1px"}
      borderBottomColor={"primary-400"}
      className="relative min-h-[100dvh] bg-gray-200"
      display={{ base: "block", lg: "flex" }}
    >
      {/* CONTAINER VIDEO */}
      <Box w={{ lg: "50%" }} p={{ lg: "5%" }}>
        <Box
          w="100%"
          h="160px"
          borderRadius={"0 0 16px 16px"}
          className={`${isLargerThanLg ? "" : "auth-bg"}`}
          overflow="hidden"
          position={`${isLargerThanLg ? "relative" : ""}`}
        >
          <Link
            to="/"
            className="absolute top-8 flex w-full justify-center pb-8 pt-4"
          >
            <Image src={logo} alt="logo" />
          </Link>
        </Box>

        <Box
          marginTop={"-40px"}
          px={4}
          h={{ lg: "60%" }}
          className=" overflow-hidden rounded-lg"
        >
          {settings?.registerVideoURL && (
            <>
              {settings?.registerVideoURL?.videoId ? (
                <iframe
                  className="h-full w-full overflow-hidden rounded-lg border-b-2 border-b-gray-900"
                  id={settings?.registerVideoURL?.videoId}
                  src={settings?.registerVideoURL?.url}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                  allowFullScreen={true}
                ></iframe>
              ) : (
                <iframe
                  className="h-full w-full overflow-hidden rounded-lg border-b-2 border-b-gray-900"
                  src={settings?.registerVideoURL?.url}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
            </>
          )}
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
            className="flex flex-col gap-4 px-5"
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
              <Link to={"/"} className="text-[14px] font-medium text-[#005FB8]">
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
