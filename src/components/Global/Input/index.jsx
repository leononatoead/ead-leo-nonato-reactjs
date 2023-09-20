import { useState } from 'react';

import { Box } from '@chakra-ui/react';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineWarning,
} from 'react-icons/ai';

export default function Input({
  theme,
  id,
  type,
  watch,
  register,
  placeholder,
  label,
  error,
  defaultValue,
}) {
  const value = watch(id);

  const [viewPassword, setViewPassword] = useState(false);

  const toggleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <Box
      className={`flex flex-col gap-[9px] ${
        theme === 'light' ? 'text-black' : 'text-white'
      }`}
    >
      <label htmlFor={id} className='text-base leading-5'>
        {label}
      </label>
      <Box
        className={`relative w-full rounded-[4px] overflow-hidden after:content-[''] after:absolute after:h-[2px] after:bg-cian  after:left-1/2 after:bottom-0 after:-translate-x-1/2 ${
          value ? 'after:w-full' : 'after:w-0'
        } hover:after:w-full animation ${
          error && 'after:bg-red-500 after:w-full'
        } ${theme === 'light' ? 'shadow-sm shadow-gray-900/50' : ''}`}
      >
        {type === 'textarea' ? (
          <textarea
            {...register(id)}
            placeholder={placeholder}
            id={id}
            className={`w-full rounded-[4px]  px-3 py-[5px] leading-5 text-base outline-none ${
              theme === 'light' ? 'bg-white' : 'bg-white/5'
            } placeholder:text-gray-900 resize-none`}
            rows={id === 'comment' ? 3 : 10}
            autoComplete='false'
            defaultValue={defaultValue}
          ></textarea>
        ) : type === 'number' ? (
          <input
            type={viewPassword ? 'text' : type}
            {...register(id, { valueAsNumber: true })}
            placeholder={placeholder}
            id={id}
            className={`w-full rounded-[4px]  px-3 py-[5px] leading-5 text-base outline-none ${
              theme === 'light' ? 'bg-white' : 'bg-white/5'
            } placeholder:text-gray-900`}
            autoComplete='false'
            defaultValue={defaultValue}
            step='any'
          />
        ) : (
          <input
            type={viewPassword ? 'text' : type}
            {...register(id)}
            placeholder={placeholder}
            id={id}
            className={`w-full rounded-[4px]  px-3 py-[5px] leading-5 text-base outline-none ${
              theme === 'light' ? 'bg-white' : 'bg-white/5'
            } placeholder:text-gray-900`}
            autoComplete='false'
            defaultValue={defaultValue}
          />
        )}

        {error && (
          <Box
            className={`absolute ${
              type === 'password' ? 'right-9' : 'right-1'
            } top-1 text-red-500`}
          >
            <AiOutlineWarning size={20} className='text-red-500' />
          </Box>
        )}

        {type === 'password' && (
          <button
            type='button'
            className={`absolute right-1 top-1 w-[26px] h-[22px] flex justify-center items-center rounded-[3px]
              
                 ${theme === 'light' ? 'bg-gray-150' : 'bg-white/5'}
              `}
            onClick={toggleViewPassword}
          >
            {viewPassword ? (
              <AiOutlineEye
                className={` ${
                  theme === 'light' ? 'text-black/60' : 'text-white/80'
                }`}
              />
            ) : (
              <AiOutlineEyeInvisible
                className={` ${
                  theme === 'light' ? 'text-black/60' : 'text-white/80'
                }`}
              />
            )}
          </button>
        )}
      </Box>
      <span className='text-small text-red-500 -mt-1'>{error && error}</span>
    </Box>
  );
}
