import { Box, Text } from '@chakra-ui/react';
import { AiFillInstagram } from 'react-icons/ai';
import { FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Box className='!flex !flex-col !items-center !justify-center pt-24 pb-8 gap-[40px]'>
      <Box className='!text-gray-300 !flex !items-center !justify-center gap-7 !text-normal'>
        <Link to='https://twitter.com/leononatotrade'>
          <FaTwitter size={16} />
        </Link>
        <Link to='https://www.instagram.com/leononatotrader/'>
          <AiFillInstagram size={18} />
        </Link>
        <Link to=''>
          <FaLinkedinIn size={16} />
        </Link>
        <Link to='https://www.youtube.com/@LeoNonatoTraderOficial'>
          <FaYoutube size={16} />
        </Link>
      </Box>

      <Box className='!flex !flex-col !items-center !justify-center !text-gray-350'>
        <Text className='!text-normal !font-inter !leading-4' mb={'10px'}>
          Copyright © 2023 Léo Nonato
        </Text>
        <Text className='!text-large !font-inter !leading-[18px]' mb={'10px'}>
          All Rights Reserved
        </Text>
        <Text className=''>
          <Link className='underline !text-normal !font-inter !leading-[18px]'>
            Terms and Conditions
          </Link>
          {' | '}
          <Link className='underline !text-normal !font-inter !leading-[18px]'>
            Privacy Policy
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
