import { Spinner } from '@fluentui/react-components';

export default function ButtonSubmit({ disabled, form, text, loading }) {
  return (
    <button
      type='submit'
      className='w-full disabled:bg-white/30 bg-[#005FB8] rounded-[4px] px-3 py-[5px] text-white text-[14px] leading-[20px]'
      form={form}
      disabled={disabled}
    >
      {loading ? <Spinner appearance='inverted' size='tiny' /> : text}
    </button>
  );
}
