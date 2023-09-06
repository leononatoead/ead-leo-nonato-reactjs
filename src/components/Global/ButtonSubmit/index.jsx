import { Spinner } from '@chakra-ui/react';

export default function ButtonSubmit({ disabled, form, text, loading }) {
  return (
    <button
      type='submit'
      className='w-full disabled:bg-gray-900/30 bg-primary-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-5'
      form={form}
      disabled={disabled}
    >
      {loading ? <Spinner color='white' size='sm' /> : text}
    </button>
  );
}
