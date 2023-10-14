import { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";
import {
  RecaptchaVerifier,
  updatePhoneNumber,
  PhoneAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import AuthHeader from "../../../components/Auth/AuthHeader";
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
        }
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
        appVerifier
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
      toast({
        description: "Erro ao enviar código de verificação, tente novamente.",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleUpdatePhoneNumber = async () => {
    setLoading(true);
    try {
      const user = auth._currentUser;

      const phoneCredential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );

      await updatePhoneNumber(user, phoneCredential);

      navigate("/verify-email");
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
          ? "auth-bg min-h-screen bg-gray-200"
          : "min-h-screen bg-gray-200"
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
              <Heading className="!font-bold !font-poppins !text-large !leading-6 text-primary-600 poppins">
                Informe o código
              </Heading>
              <Text className="!font-medium !text-base !text-black !leading-5">
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
                  className="flex justify-between gap-2 opt-container font-poppins"
                  value={verificationCode}
                  onChange={setVerificationCode}
                />
              </Flex>
              <Text
                className="!font-medium !text-base !text-black !leading-5"
                mb={"20px"}
              >
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
                className="w-full bg-primary-400 disabled:bg-gray-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-5"
                onClick={handleUpdatePhoneNumber}
                disabled={verificationCode.length === 6 ? false : true}
              >
                {loading ? "Carregando" : "Validar"}
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

              <Heading className="!font-bold !font-poppins !text-large !leading-6 text-primary-600 poppins">
                Verificação necessária
              </Heading>
              <Text className="!font-medium !text-base !text-black !leading-5">
                Precisamos verificar seus dados pessoais. Informe seu celular
                para receber o código.
              </Text>
            </Flex>

            <Box px={4} className="!flex-grow" pt={6}>
              <Box
                mb={"20px"}
                className={`relative w-full rounded-[4px] overflow-hidden after:content-[''] after:absolute after:h-[2px] after:bg-[#60cdff] after:left-1/2 after:bottom-0 after:-translate-x-1/2 ${
                  phone ? "after:w-full" : "after:w-0"
                } hover:after:w-full animation`}
              >
                <PhoneInput
                  country={"br"}
                  value={phone}
                  onChange={setPhone}
                  className="[&>*:first-child]:hidden phoneInput"
                />
              </Box>
            </Box>

            <Box px={"10px"}>
              <button
                className="w-full bg-primary-400 disabled:bg-gray-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-5"
                onClick={verifyPhone}
                disabled={phone ? false : true}
              >
                {loading ? "Carregando" : "Enviar código"}
              </button>
            </Box>
          </Box>
        </Flex>
      )}
    </Flex>
  );
}
