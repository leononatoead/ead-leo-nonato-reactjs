import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBannerSettings,
  fetchRegisterVideoSettings,
  fetchSettingsFromLocalStorage,
  fetchWhatsAppSettings,
} from "../../../redux/modules/settings/actions";
import useCheckUpdate from "../../../hooks/useCheckUpdate";
import { Link } from "react-router-dom";

import BannerCard from "./Cards/BannerCard";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { MdAddCircleOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { PiTelevisionSimpleBold } from "react-icons/pi";

export default function Settings() {
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
        const localSettings = JSON.parse(localStorage.getItem("settings"));

        if (calcCourse !== 0 && !localSettings) {
          dispatch(fetchBannerSettings());
          dispatch(fetchWhatsAppSettings());
          dispatch(fetchRegisterVideoSettings());
        } else {
          dispatch(fetchSettingsFromLocalStorage(localSettings));

          if (!settings.banners && !localSettings.banners) {
            dispatch(fetchBannerSettings());
          }

          if (!settings.whatsAppURL && !localSettings.whatsAppURL) {
            dispatch(fetchWhatsAppSettings());
          }

          if (!settings.registerVideoURL && !localSettings.registerVideoURL) {
            dispatch(fetchRegisterVideoSettings());
          }
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
    <Accordion
      allowToggle
      className={`main-container flex flex-col gap-4 bg-gray-200 p-4`}
    >
      <AccordionItem className="!border-b-[1px] !border-t-0 !border-gray-200 ">
        <AccordionButton px={0} py={4} className="hover:!bg-gray-200">
          <Box as="span" flex="1" textAlign="left">
            <Text className={`!text-base font-bold !leading-5`}>
              Home Banners
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={0}>
          <Box className="flex w-full justify-end">
            <Link to="/dashboard/settings/banners/new" className="add-btn">
              <MdAddCircleOutline size={20} />
              <span className="font-bold">Novo banner</span>
            </Link>
          </Box>

          <ul className="flex flex-col gap-4 py-6 ">
            {settings?.banners
              ?.slice()
              .sort((a, b) => a.order - b.order)
              .map((banner) => (
                <BannerCard key={banner.id} cardData={banner} />
              ))}
          </ul>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem className="!border-b-[1px] !border-t-0 !border-gray-200 ">
        <AccordionButton px={0} py={4} className="hover:!bg-gray-200">
          <Box as="span" flex="1" textAlign="left">
            <Text className={`!text-base font-bold !leading-5`}>
              Notificações
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={0}></AccordionPanel>
      </AccordionItem>
      <AccordionItem className="!border-b-[1px] !border-t-0 !border-gray-200 ">
        <AccordionButton px={0} py={4} className="hover:!bg-gray-200">
          <Box as="span" flex="1" textAlign="left">
            <Text className={`!text-base font-bold !leading-5`}>Turmas</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={0}></AccordionPanel>
      </AccordionItem>
      <AccordionItem className="!border-b-[1px] !border-t-0 !border-gray-200 ">
        <AccordionButton px={0} py={4} className="hover:!bg-gray-200">
          <Box as="span" flex="1" textAlign="left">
            <Text className={`!text-base font-bold !leading-5`}>
              WhatsApp URL
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={0}>
          {!settings?.whatsAppURL?.url && (
            <Box className="flex w-full justify-end">
              <Link to="/dashboard/settings/whatsapp/edit" className="add-btn">
                <MdAddCircleOutline size={20} />
                <span className="font-bold">Novo URL</span>
              </Link>
            </Box>
          )}
          {settings?.whatsAppURL?.url && (
            <Box className="flex flex-col gap-4 py-6 ">
              <Link
                to={`/dashboard/settings/whatsapp/edit/`}
                className="flex w-full items-center gap-3 rounded-lg bg-white p-3 shadow-md"
              >
                <BsWhatsapp size={15} />
                <Text>Alterar WhatsApp URL</Text>
                <Box className="flex flex-1 items-center justify-end">
                  <BiEdit size={18} className="text-primary-600" />
                </Box>
              </Link>
            </Box>
          )}
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem className="!border-b-[1px] !border-t-0 !border-gray-200 ">
        <AccordionButton px={0} py={4} className="hover:!bg-gray-200">
          <Box as="span" flex="1" textAlign="left">
            <Text className={`!text-base font-bold !leading-5`}>
              Vídeo de cadastro
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={0}>
          {!settings?.registerVideoURL?.url && (
            <Box className="flex w-full justify-end">
              <Link
                to="/dashboard/settings/registervideo/edit"
                className="add-btn"
              >
                <MdAddCircleOutline size={20} />
                <span className="font-bold">Novo vídeo</span>
              </Link>
            </Box>
          )}
          {settings?.registerVideoURL?.url && (
            <Box className="flex flex-col gap-4 py-6 ">
              <Link
                to={`/dashboard/settings/registervideo/edit/`}
                className="flex w-full items-center gap-3 rounded-lg bg-white p-3 shadow-md"
              >
                <PiTelevisionSimpleBold size={15} />
                <Text>Alterar vídeo de cadastro</Text>
                <Box className="flex flex-1 items-center justify-end">
                  <BiEdit size={18} className="text-primary-600" />
                </Box>
              </Link>
            </Box>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
