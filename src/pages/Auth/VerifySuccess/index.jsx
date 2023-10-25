import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingsFromLocalStorage,
  fetchWhatsAppSettings,
} from "../../../redux/modules/settings/actions";
import useCheckUpdate from "../../../hooks/useCheckUpdate";
import { Link } from "react-router-dom";

import AuthHeader from "../../../components/Auth/AuthHeader";
import {
  Box,
  Flex,
  Heading,
  Text,
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
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function VerifySucess() {
  const steps = [
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ];

  const { activeStep } = useSteps({
    index: 3,
    count: steps.length,
  });

  const settings = useSelector((state) => state.settings);
  const { verifySettingsUpdate } = useCheckUpdate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const fireStoreSettingsUpdate = await verifySettingsUpdate();
        const lastSettingsUpdate =
          new Date(JSON.parse(localStorage.getItem("lastSettingsUpdate"))) || 0;

        const calcCourse = fireStoreSettingsUpdate - lastSettingsUpdate;

        if (calcCourse !== 0 || !settings.whatsAppURL) {
          dispatch(fetchWhatsAppSettings());
        } else {
          const settings = JSON.parse(localStorage.getItem("settings"));
          dispatch(fetchSettingsFromLocalStorage(settings));
        }
      } catch (error) {
        console.error(
          "Erro ao buscar a última atualização dos banners:",
          error,
        );
      }
    };

    fetchSettingsData();
  }, []);

  return (
    <Flex
      flexDirection={"column"}
      className="min-h-[100dvh] bg-gray-200"
      p={{ lg: "5rem 30%" }}
    >
      <AuthHeader step={4} />

      <Box
        display={"flex"}
        flexDirection={"column"}
        flexGrow={"1"}
        p={{ lg: "32px 16px" }}
        borderRadius={{ lg: "8px" }}
        boxShadow={{ lg: "0px 8px 16px 0px rgba(0, 0, 0, 0.14)" }}
        background={{ lg: "white" }}
      >
        <Box px={4} mt={1}>
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
          <AiOutlineCheckCircle size={80} className="mb-6 text-[#89D185]" />
          <Heading
            className="!font-poppins !text-large !font-bold !leading-6 text-primary-600"
            mb={2}
          >
            Cadastro validado!
          </Heading>
          <Text
            className="!text-base !font-medium !leading-5 !text-black"
            mb={6}
          >
            Agora você já pode acessar a plataforma.
          </Text>
          <Text className="!text-base !font-medium !leading-5 !text-black">
            Não esqueça de entrar no grupo de WhatsApp para não perder novidades
            e avisos importantes.
          </Text>
        </Box>
        <Flex
          flexDirection={"column"}
          className="!flex-grow justify-end"
          px={"10px"}
          pb={6}
          gap={4}
        >
          {settings?.whatsAppURL && settings?.whatsAppURL[0].url && (
            <Link
              to={settings?.whatsAppURL[0]?.url}
              className="w-full rounded-[4px] border-[1px] border-green-300 bg-green-300 px-3 py-[5px] text-center text-base leading-5 text-white"
              target="_blank"
            >
              Ir para o WhatsApp
            </Link>
          )}
          <Link
            to="/"
            className="w-full rounded-[4px] border-[1px] border-primary-400 bg-white px-3 py-[5px] text-center text-base leading-5 text-primary-400"
          >
            Acessar plataforma
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}
