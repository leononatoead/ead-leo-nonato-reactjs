import { Link } from 'react-router-dom';

import AuthHeader from '../../../components/Auth/AuthHeader';
import { AiOutlineCheckCircle } from 'react-icons/ai';
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
} from '@chakra-ui/react';

export default function VerifySucess() {
  const steps = [
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
  ];

  const { activeStep } = useSteps({
    index: 3,
    count: steps.length,
  });

  return (
    <Flex
      flexDirection={'column'}
      className='min-h-[100dvh] bg-gray-200'
      p={{ lg: '5rem 30%' }}
    >
      <AuthHeader step={4} />

      <Box
        display={'flex'}
        flexDirection={'column'}
        flexGrow={'1'}
        p={{ lg: '32px 16px' }}
        borderRadius={{ lg: '8px' }}
        boxShadow={{ lg: '0px 8px 16px 0px rgba(0, 0, 0, 0.14)' }}
        background={{ lg: 'white' }}
      >
        <Box px={4} mt={1}>
          <Stepper
            index={activeStep}
            mb={'1rem'}
            display={{ base: 'none', lg: 'flex' }}
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

                <Box flexShrink='0'>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          <AiOutlineCheckCircle size={80} className='text-[#89D185] mb-6' />
          <Heading
            className='!font-bold !font-poppins !text-large !leading-6 text-primary-600'
            mb={2}
          >
            Cadastro validado!
          </Heading>
          <Text
            className='!font-medium !text-base !text-black !leading-5'
            mb={6}
          >
            Agora você já pode acessar a plataforma.
          </Text>
          <Text className='!font-medium !text-base !text-black !leading-5'>
            Não esqueça de entrar no grupo de WhatsApp para não perder novidades
            e avisos importantes.
          </Text>
        </Box>
        <Flex
          flexDirection={'column'}
          className='!flex-grow justify-end'
          px={'10px'}
          pb={6}
          gap={4}
        >
          <button className='w-full bg-green-300 rounded-[4px] px-3 py-[5px] text-white text-base leading-5 text-center border-[1px] border-green-300 '>
            Ir para o WhatsApp
          </button>
          <Link
            to='/'
            className='w-full bg-white rounded-[4px] px-3 py-[5px] text-primary-400 text-base leading-5 text-center border-[1px] border-primary-400'
          >
            Acessar plataforma
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}
