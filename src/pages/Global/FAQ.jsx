import Navbar from '../../components/Global/Navbar';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from '@chakra-ui/react';

import background from '../../assets/auth-background.png';

export default function FAQ() {
  const questions = [
    {
      id: 1,
      question: 'Pegunta 1',
      answer:
        'When I press the power button on batteryWhen I press the power button on battery When I press the power button on batteryWhen I press the power button on batteryWhen I press the power button on batteryWhen I press the power button on battery',
    },
    {
      id: 2,
      question: 'Pegunta 2',
      answer:
        'When I press the power button on batteryWhen I press the power button on battery When I press the power button on batteryWhen I press the power button on batteryWhen I press the power button on batteryWhen I press the power button on battery',
    },
    {
      id: 3,
      question: 'Pegunta 3',
      answer:
        'When I press the power button on batteryWhen I press the power button on battery When I press the power button on batteryWhen I press the power button on batteryWhen I press the power button on batteryWhen I press the power button on battery',
    },
  ];

  return (
    <Box className='min-h-screen bg-gray-200'>
      <Navbar title={'FAQ'} />
      <Box>
        <img
          src={background}
          alt='background'
          className='rounded-br-[16px] rounded-bl-[16px] h-[120px] w-full object-cover'
        />
      </Box>
      <Box className='px-4' mt={-4}>
        <Accordion className='flex flex-col' gap={1}>
          {questions.map((question, i) => (
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

              <AccordionPanel className='!bg-zinc-100' px={4} py={'7px'}>
                {question.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
}
