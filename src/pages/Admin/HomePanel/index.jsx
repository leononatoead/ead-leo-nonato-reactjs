import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBanners,
  fetchBannersFromLocalStorage,
} from "../../../redux/modules/banners/actions";
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
import useCheckUpdate from "../../../hooks/useCheckUpdate";

export default function HomePanel() {
  const { banners } = useSelector((state) => state.banners);

  const { verifyBannersUpdate } = useCheckUpdate();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBannersData = async () => {
      try {
        const firestoreBannersUpdate = await verifyBannersUpdate();
        const lastBannersUpdate =
          new Date(JSON.parse(localStorage.getItem("lastBannersUpdate"))) || 0;

        const calcCourse = firestoreBannersUpdate - lastBannersUpdate;

        if (calcCourse !== 0) {
          dispatch(fetchBanners());
        } else {
          const banners = JSON.parse(localStorage.getItem("banners"));
          dispatch(fetchBannersFromLocalStorage(banners));
        }
      } catch (error) {
        console.error(
          "Erro ao buscar a última atualização dos banners:",
          error,
        );
      }
    };

    fetchBannersData();
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

        <AccordionPanel>
          <Box className="flex w-full justify-end">
            <Link to="/dashboard/home/banners/new" className="add-btn">
              <MdAddCircleOutline size={20} />
              <span className="font-bold">Novo banner</span>
            </Link>
          </Box>

          <ul className="flex flex-col gap-4 py-6 ">
            {banners
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
    </Accordion>
  );
}
