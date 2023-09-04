import { Box, Image } from '@chakra-ui/react';
import logo from '../../assets/auth-logo-black.svg';

export default function AuthHeader({ step = null }) {
  return (
    <Box className='auth-bg rounded-b-2xl overflow-hidden'>
      <Box className='w-full flex justify-center pt-12 pb-8 '>
        <Image src={logo} alt='logo' />
      </Box>

      {step && (
        <Box className='flex justify-center gap-2 w-full p-4'>
          <span className='h-[2px] bg-primary-400 w-1/4' />
          <span
            className={`h-[2px] ${
              step >= 2 ? 'bg-primary-400' : 'bg-gray-900'
            }  w-1/4`}
          />
          <span
            className={`h-[2px] ${
              step >= 3 ? ' bg-primary-400' : 'bg-gray-900'
            }  w-1/4`}
          />
          <span
            className={`h-[2px] ${
              step >= 4 ? ' bg-primary-400' : 'bg-gray-900'
            }  w-1/4`}
          />
        </Box>
      )}
    </Box>
  );
}
