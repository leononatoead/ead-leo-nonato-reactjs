import { Link } from 'react-router-dom';

import ModalComponent from './ModalComponent';

import { Image } from '@chakra-ui/image';
import { ModalBody } from '@chakra-ui/modal';
import { Flex, Heading, Text } from '@chakra-ui/layout';

import { BiCartAdd } from 'react-icons/bi';

export default function PremiumCourse({ open, close, courseData }) {
  const handleCloseModal = () => {
    close(false);
  };

  return (
    <ModalComponent
      openModal={open}
      setOpenModal={close}
      handleCloseModal={handleCloseModal}
      hasCloseButton={true}
    >
      <ModalBody>
        <Flex flexDirection={'column'} justify={'center'} align={'center'}>
          <Image
            src={courseData?.imagePath}
            alt='locked'
            className='w-20 h-20 object-cover rounded-2xl'
            mb={6}
          />
          <Heading
            className='!font-poppins !text-large !w-full !font-semibold !leading-6 !text-primary-500 !text-center'
            mb={2}
          >
            {courseData?.name}
          </Heading>
          <Text className='font-medium leading-5 text-base text-center ' mb={8}>
            {courseData?.description}
          </Text>

          <Flex className='w-full' justifyContent={'space-between'}>
            <Flex flexDirection={'column'}>
              <Text className='text-[#FF8E00] text-normal font-medium leading-[18px]'>
                {courseData?.price?.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Text>
              <Text className='text-gray-800 text-small leading-[18px]'>
                ou 12x{' '}
                {((courseData?.price * 1.05) / 12)?.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Text>
            </Flex>
            <Link
              to={courseData?.paymentURL}
              target='_blank'
              className='text-center bg-primary-400 rounded-[4px] px-4 py-[5px] text-white text-base leading-5 flex items-center gap-2'
            >
              Comprar agora
              <BiCartAdd size={20} className='text-white' />
            </Link>
          </Flex>
        </Flex>
      </ModalBody>
    </ModalComponent>
  );
}
