import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFAQFromLocalStorage,
  fetchQuestions,
} from '../../redux/modules/faq/actions';

import Navbar from '../../components/Global/Navbar';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Image,
} from '@chakra-ui/react';
import background from '../../assets/auth-background.png';

export default function FAQ() {
  const { questions } = useSelector((state) => state.faq);
  const dispatch = useDispatch();

  useEffect(() => {
    const lastFAQUpdate = new Date(
      JSON.parse(localStorage.getItem('lastFAQUpdate')),
    );
    const actualTime = new Date();
    const verifyFAQUpdate = Math.abs(actualTime - lastFAQUpdate);
    const FAQMinutesDifference = Math.floor(verifyFAQUpdate / 86400000);

    if (FAQMinutesDifference > 30) {
      dispatch(fetchQuestions());
    } else {
      const FAQ = JSON.parse(localStorage.getItem('FAQ'));
      dispatch(fetchFAQFromLocalStorage(FAQ));
    }
  }, []);

  return (
    <Box className='min-h-screen bg-gray-200'>
      <Navbar title={'FAQ'} />
      <Box>
        <Image
          src={background}
          alt='background'
          className='rounded-br-[16px] rounded-bl-[16px] h-[120px] w-full object-cover'
        />
      </Box>
      <Box className='px-4' mt={-4}>
        <Accordion className='flex flex-col' gap={1} allowToggle>
          {questions?.map((question, i) => (
            <AccordionItem
              key={i}
              className='!border-[1px] !rounded-md !shadow-sm overflow-hidden'
            >
              <AccordionButton px={4} py={3} className='!bg-white'>
                <Box
                  as='span'
                  flex='1'
                  textAlign='left'
                  className='!text-base !leading-5 '
                >
                  {question.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel
                className='!bg-zinc-100 !text-base text-justify'
                px={4}
                py={'7px'}
              >
                {question.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
}
