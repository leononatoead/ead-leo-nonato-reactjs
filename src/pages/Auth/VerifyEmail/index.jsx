import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/modules/auth/actions";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import AuthHeader from "../AuthHeader";
import {
  Box,
  Flex,
  Heading,
  Text,
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

export default function VerifyEmail() {
  const [timer, setTimer] = useState(60);

  const user = useSelector((state) => state.auth.user);

  const [isLargerThanLg] = useMediaQuery("(min-width: 992px)");

  const steps = [
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ];

  const { activeStep } = useSteps({
    index: 2,
    count: steps.length,
  });

  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVerify = () => {
    verifyEmail();
    setTimer(60);
  };

  const handleContinue = () => {
    navigate("/verify-success");
    window.location.reload();
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
  }, [timer]);

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
      <AuthHeader step={3} />

      <Box
        display={"flex"}
        flexDirection={"column"}
        flexGrow={"1"}
        p={{ lg: "32px 16px" }}
        borderRadius={{ lg: "8px" }}
        boxShadow={{ lg: "0px 8px 16px 0px rgba(0, 0, 0, 0.14)" }}
        background={{ lg: "white" }}
      >
        <Box className="mb-8 mt-6 flex flex-grow flex-col gap-2 px-4">
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
          <Heading className="!font-poppins !text-large !font-bold !leading-6 text-primary-600">
            Verifique seu e-mail
          </Heading>
          <Text className="!text-base !font-medium !leading-5 !text-black">
            Clique no link enviado para seu e-mail de cadastro {user?.email}
          </Text>
          <Text className="mt-4 !text-base !font-medium !leading-5 text-black">
            Não recebeu?{" "}
            <button
              className="cursor-pointer text-primary-400/80"
              onClick={handleVerify}
              disabled={timer > 0}
            >
              {timer > 0 ? `Reenviar em ${timer}s` : "Reenviar código"}
            </button>
          </Text>
        </Box>

        <Box className="flex flex-col items-center" px={"10px"} py={6}>
          <button
            onClick={handleContinue}
            className="w-full rounded-[4px] bg-primary-400 px-3 py-[5px] text-center text-base leading-5 text-white"
          >
            Continuar
          </button>
          <button className="mt-2 w-full text-center" onClick={handleLogout}>
            Sair
          </button>
        </Box>
      </Box>
    </Flex>
  );
}
