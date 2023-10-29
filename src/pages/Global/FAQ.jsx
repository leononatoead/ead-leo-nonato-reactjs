import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFAQFromLocalStorage,
  fetchQuestions,
} from "../../redux/modules/faq/actions";

import Navbar from "../../components/Navbar";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Image,
} from "@chakra-ui/react";
import background from "../../assets/auth-background.png";
import Footer from "../../components/Footer";

export default function FAQ() {
  const { questions } = useSelector((state) => state.faq);
  const dispatch = useDispatch();

  useEffect(() => {
    const lastFAQUpdate = new Date(
      JSON.parse(localStorage.getItem("lastFAQUpdate")),
    );
    const actualTime = new Date();
    const verifyFAQUpdate = Math.abs(actualTime - lastFAQUpdate);
    const FAQMinutesDifference = Math.floor(verifyFAQUpdate / 86400000);

    if (FAQMinutesDifference > 30) {
      dispatch(fetchQuestions());
    } else {
      const FAQ = JSON.parse(localStorage.getItem("FAQ"));
      dispatch(fetchFAQFromLocalStorage(FAQ));
    }
  }, []);

  return (
    <Box className="flex min-h-[100dvh] flex-col justify-between bg-gray-200 pb-6">
      <Box>
        <Navbar title={"FAQ"} />
        <Box>
          <Image
            src={background}
            alt="background"
            className="h-[120px] w-full rounded-bl-[16px] rounded-br-[16px] object-cover"
          />
        </Box>
        <Box className="-mt-4 px-4 lg:mt-6">
          <Accordion
            className="flex flex-col lg:mx-auto lg:max-w-5xl"
            gap={1}
            allowToggle
          >
            {questions
              ?.slice()
              .sort((a, b) => a.order - b.order)
              .map((question, i) => (
                <AccordionItem
                  key={i}
                  className="overflow-hidden !rounded-md !border-[1px] !shadow-sm"
                >
                  <AccordionButton px={4} py={3} className="!bg-white">
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      className="!text-base !leading-5 "
                    >
                      {question.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel
                    className="!bg-zinc-100 text-justify !text-base"
                    px={4}
                    py={"7px"}
                  >
                    {question.answer}
                  </AccordionPanel>
                </AccordionItem>
              ))}
          </Accordion>
        </Box>
      </Box>
      <Box className="hidden lg:block">
        <Footer />
      </Box>
    </Box>
  );
}
