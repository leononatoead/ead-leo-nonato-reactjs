import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../../../redux/modules/faq/actions';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

import { MdAddCircleOutline } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';

export default function DashboardFAQ() {
  const { questions } = useSelector((state) => state.faq);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!questions) {
      dispatch(fetchQuestions());
    }
  }, []);

  return (
    <Box className='main-container'>
      <Box className='w-full flex justify-end'>
        <Link to='/dashboard/faq/new' className='add-btn'>
          <MdAddCircleOutline size={20} />
          <span className='font-bold'>Nova pergunta</span>
        </Link>
      </Box>

      <Accordion allowToggle mt={6}>
        {questions &&
          questions.map((question, i) => (
            <AccordionItem
              key={i}
              className='!border-t-0 !border-b-[1px] !border-gray-200 '
            >
              <AccordionButton px={0} py={4} className='hover:!bg-white'>
                <Box
                  as='span'
                  flex='1'
                  textAlign='left'
                  className='!text-base !font-medium !leading-5'
                >
                  {question.order} - {question.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Link
                  to={`/dashboard/faq/edit/${question.id}`}
                  className='flex items-center justify-center gap-3 '
                >
                  <span className='font-semibold text-small leading-4 flex-1 text-justify'>
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
