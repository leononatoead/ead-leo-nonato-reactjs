import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../../redux/modules/faq/actions";
import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { MdAddCircleOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

export default function DashboardFAQ() {
  const { questions } = useSelector((state) => state.faq);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!questions) {
      dispatch(fetchQuestions());
    }
  }, []);

  return (
    <Box className="main-container">
      <Box className="flex w-full w-full  justify-end lg:mx-auto lg:max-w-5xl">
        <Link to="/dashboard/faq/new" className="add-btn">
          <MdAddCircleOutline size={20} />
          <span className="font-bold">Nova pergunta</span>
        </Link>
      </Box>

      <Accordion allowToggle mt={6} className=" w-full lg:mx-auto lg:max-w-5xl">
        {questions &&
          questions
            ?.slice()
            .sort((a, b) => a.order - b.order)
            .map((question, i) => (
              <AccordionItem
                key={i}
                className="mb-1 rounded-md !border-b-[1px] !border-t-0 !border-gray-200 bg-white px-4"
              >
                <AccordionButton px={0} py={4} className="hover:!bg-white">
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="!text-base !font-medium !leading-5"
                  >
                    {question.order} - {question.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Link
                    to={`/dashboard/faq/edit/${question.id}`}
                    className="flex items-center justify-center gap-3 "
                  >
                    <span className="flex-1 text-justify text-small font-semibold leading-4">
                      {question.answer}
                    </span>
                    <BiEdit size={18} />
                  </Link>
                </AccordionPanel>
              </AccordionItem>
            ))}
      </Accordion>
    </Box>
  );
}
