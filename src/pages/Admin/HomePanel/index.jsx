import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBannerSettings,
  fetchSettingsFromLocalStorage,
} from "../../../redux/modules/settings/actions";
import useCheckUpdate from "../../../hooks/useCheckUpdate";
import { Link } from "react-router-dom";

import BannerCardAdmin from "../../../components/Admin/BannerCardAdmin";
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

export default function HomePanel() {
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

        if (calcCourse !== 0) {
          dispatch(fetchBannerSettings());
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

  console.log(settings);

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

        <AccordionPanel>
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
                <BannerCardAdmin key={banner.id} cardData={banner} />
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

        <AccordionPanel></AccordionPanel>
      </AccordionItem>
      <AccordionItem className="!border-b-[1px] !border-t-0 !border-gray-200 ">
        <AccordionButton px={0} py={4} className="hover:!bg-gray-200">
          <Box as="span" flex="1" textAlign="left">
            <Text className={`!text-base font-bold !leading-5`}>
              Whatsapp URL
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel></AccordionPanel>
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

        <AccordionPanel></AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
