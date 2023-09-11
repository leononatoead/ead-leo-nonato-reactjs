import ModalComponent from './ModalComponent';

import premium from '../../assets/premium.png';
import { Image } from '@chakra-ui/image';
import { ModalBody } from '@chakra-ui/modal';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

export default function PremiumContent({
  open,
  close,
  title,
  text,
  btnText,
  closeBtn,
  checkoutUrl,
}) {
  const handleCloseModal = () => {
    close(false);
  };

  return (
    <ModalComponent
      openModal={open}
      setOpenModal={close}
      handleCloseModal={handleCloseModal}
      hasCloseButton={closeBtn}
    >
      <ModalBody>
        <Flex flexDirection={'column'} justify={'center'} align={'center'}>
          <Image src={premium} alt='locked' className='w-[80px]' mb={6} />
          <Heading
            className='!font-poppins !text-large !w-full !font-semibold !leading-6 !text-primary-500 !text-center'
            mb={2}
          >
            {title}
          </Heading>
          <Text className='font-medium leading-5 text-base text-center ' mb={8}>
            {text}
          </Text>

          <Link
            to={checkoutUrl}
            className='w-full text-center bg-primary-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-5'
          >
            {btnText}
          </Link>

          <Link to='/' className='w-full text-center mt-4'>
            Voltar
          </Link>
        </Flex>
      </ModalBody>
    </ModalComponent>
  );
}
