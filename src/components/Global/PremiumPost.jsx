import { useState } from 'react';

import ModalComponent from './ModalComponent';
import { Image } from '@chakra-ui/image';
import { ModalBody } from '@chakra-ui/modal';
import { Flex, Box, Heading, Text } from '@chakra-ui/layout';
import locker from '../../assets/premium.png';
import LoginModal from '../Auth/LoginModal';
import { Link } from 'react-router-dom';

export default function PremiumPost({ open, close }) {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleCloseModal = () => {
    close(false);
  };

  return (
    <ModalComponent
      openModal={open}
      setOpenModal={close}
      handleCloseModal={handleCloseModal}
      hasCloseButton={false}
    >
      <ModalBody>
        <Flex flexDirection={'column'} justify={'center'} align={'center'}>
          <Image
            src={locker}
            alt='locked'
            className='w-20 h-20 object-cover rounded-2xl'
            mb={6}
          />
          <Heading
            className='!font-poppins !text-large !w-full !font-semibold !leading-6 !text-primary-500 !text-center'
            mb={2}
          >
            Conteúdo disponível para usuários
          </Heading>
          <Text className='font-medium leading-5 text-base text-center ' mb={8}>
            Desbloqueie esse e muitos outros conteúdos se cadastrando na nossa
            plataforma
          </Text>

          <Flex flexDirection={'column'} gap={4} className='w-full'>
            <button
              onClick={() => setOpenLoginModal(true)}
              className='w-full text-center bg-primary-400 rounded-[4px] px-4 py-[5px] text-white text-base leading-5  gap-2'
            >
              Entre ou cadastre-se
            </button>
            <Link to='/' className='w-full py-[5px] text-center'>
              Voltar
            </Link>
          </Flex>
        </Flex>
      </ModalBody>
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </ModalComponent>
  );
}
