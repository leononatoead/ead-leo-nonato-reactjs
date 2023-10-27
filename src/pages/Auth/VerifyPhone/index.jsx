import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/modules/auth/actions";
import { auth } from "../../../firebase/config";
import {
  RecaptchaVerifier,
  updatePhoneNumber,
  PhoneAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import AuthHeader from "../AuthHeader";
import {
  Flex,
  Heading,
  Text,
  Box,
  useMediaQuery,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export default function VerifyPhone() {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [isLargerThanLg] = useMediaQuery("(min-width: 992px)");

  const steps = [
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ];

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignInSubmit();
          },
          "expired-callback": () => {},
        },
      );
    }
  };

  useEffect(() => {
    onCaptchaVerify();
  }, [phone]);

  const verifyPhone = async () => {
    setLoading(true);

    try {
      const formatPhone = `+${phone}`;
      const appVerifier = window.recaptchaVerifier;
      const phoneProvider = new PhoneAuthProvider(auth);
      const id = await phoneProvider.verifyPhoneNumber(
        formatPhone,
        appVerifier,
      );
      setVerificationId(id);
      setLoading(false);

      toast({
        description: "Código enviado por SMS",
        status: "success",
        duration: "3000",
        isClosable: true,
      });
    } catch (error) {
      if (error.message === "auth/account-exists-with-different-credential") {
        toast({
          description: "Telefone já cadastrado por outro usuário",
          status: "error",
          duration: "3000",
          isClosable: true,
        });
      } else {
        toast({
          description: "Erro ao enviar código de verificação, tente novamente.",
          status: "error",
          duration: "3000",
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePhoneNumber = async () => {
    setLoading(true);
    try {
      const user = auth._currentUser;

      const phoneCredential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode,
      );

      await updatePhoneNumber(user, phoneCredential);

      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      if (error.message === "auth/account-exists-with-different-credential") {
        toast({
          description: "Telefone já cadastrado por outro usuário",
          status: "error",
          duration: "3000",
          isClosable: true,
        });
      } else {
        toast({
          description: "Ocorreu um erro, tente novamente",
          status: "error",
          duration: "3000",
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReSendCode = () => {
    setVerificationId("");
    setVerificationCode("");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  useEffect(() => {
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [verificationId]);

  return (
    <Flex
      flexDirection={"column"}
      className={
        isLargerThanLg
          ? "auth-bg min-h-[100dvh] bg-gray-200"
          : "min-h-[100dvh] bg-gray-200"
      }
      p={{ lg: "10rem 35%" }}
    >
      <div id="recaptcha-container"></div>

      {verificationId ? (
        <Flex flexDirection="column" pb={10} className="!flex-grow">
          <AuthHeader step={2} />
          <Box
            display={"flex"}
            flexDirection={"column"}
            flexGrow={"1"}
            p={{ lg: "32px 16px" }}
            borderRadius={{ lg: "8px" }}
            boxShadow={{ lg: "0px 8px 16px 0px rgba(0, 0, 0, 0.14)" }}
            background={{ lg: "white" }}
          >
            <Flex flexDirection="column" px={4} py={1} gap={2}>
              <Stepper
                index={activeStep}
                mb={"1rem"}
                display={{ base: "none", lg: "flex" }}
              >
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
              <Heading className="poppins !font-poppins !text-large !font-bold !leading-6 text-primary-600">
                Informe o código
              </Heading>
              <Text className="!text-base !font-medium !leading-5 !text-black">
                Digite o código de 6 dígitos enviado para seu telefone.
              </Text>
            </Flex>

            <Box px={4} className="!flex-grow" pt={6}>
              <Flex justify={"center"} mb={"28px"}>
                <OtpInput
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container flex justify-between gap-2 font-poppins"
                  value={verificationCode}
                  onChange={setVerificationCode}
                />
              </Flex>
              <Text className="!text-base !font-medium !leading-5 !text-black">
                Não recebeu?{" "}
                <button
                  className="text-[#60CDFF]"
                  onClick={handleReSendCode}
                  disabled={timer > 0}
                >
                  {timer > 0 ? `Reenviar em ${timer}s` : "Reenviar código"}
                </button>
              </Text>
            </Box>

            <Box px={"10px"}>
              <button
                className="w-full rounded-[4px] bg-primary-400 px-3 py-[5px] text-base leading-5 text-white disabled:bg-gray-400"
                onClick={handleUpdatePhoneNumber}
                disabled={verificationCode.length === 6 ? false : true}
              >
                {loading ? "Carregando" : "Validar"}
              </button>
              <button
                className="mt-2 w-full text-center"
                onClick={handleLogout}
              >
                Sair
              </button>
            </Box>
          </Box>
        </Flex>
      ) : (
        <Flex flexDirection="column" pb={6} className="!flex-grow">
          <AuthHeader step={1} />
          <Box
            display={"flex"}
            flexDirection={"column"}
            flexGrow={"1"}
            p={{ lg: "32px 16px" }}
            borderRadius={{ lg: "8px" }}
            boxShadow={{ lg: "0px 8px 16px 0px rgba(0, 0, 0, 0.14)" }}
            background={{ lg: "white" }}
          >
            <Flex flexDirection="column" px={4} py={1} gap={2}>
              <Stepper
                index={activeStep}
                mb={"1rem"}
                display={{ base: "none", lg: "flex" }}
              >
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>

              <Heading className="poppins !font-poppins !text-large !font-bold !leading-6 text-primary-600">
                Verificação necessária
              </Heading>
              <Text className="!text-base !font-medium !leading-5 !text-black">
                Precisamos verificar seus dados pessoais. Informe seu celular
                para receber o código.
              </Text>
            </Flex>

            <Box px={4} className="!flex-grow" pt={6}>
              <Box
                className={`relative w-full overflow-hidden rounded-[4px] after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:-translate-x-1/2 after:bg-[#60cdff] after:content-[''] ${
                  phone ? "after:w-full" : "after:w-0"
                } animation hover:after:w-full`}
              >
                <PhoneInput
                  country={"br"}
                  value={phone}
                  onChange={setPhone}
                  className="phoneInput [&>*:first-child]:hidden"
                />
              </Box>
            </Box>

            <Box px={"10px"}>
              <button
                className="w-full rounded-[4px] bg-primary-400 px-3 py-[5px] text-base leading-5 text-white disabled:bg-gray-400"
                onClick={verifyPhone}
                disabled={phone ? false : true}
              >
                {loading ? "Carregando" : "Enviar código"}
              </button>
              <button
                className="mt-2 w-full text-center"
                onClick={handleLogout}
              >
                Sair
              </button>
            </Box>
          </Box>
        </Flex>
      )}
    </Flex>
  );
}
