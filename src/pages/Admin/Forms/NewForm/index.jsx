import { useState } from 'react';
import useForms from '../../../../hooks/useForms';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from './FormSchema';

import Input from '../../../../components/Global/Input';

import { Box, Heading, Spinner } from '@chakra-ui/react';

import { IoTrashBinSharp } from 'react-icons/io5';
import { AiOutlineWarning } from 'react-icons/ai';

export default function NewForm() {
  const [formData, setFormData] = useState({
    title: '',
    fields: [],
  });
  const [error, setError] = useState({
    title: '',
    fields: '',
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const { addForm, loading } = useForms();

  const handleAddField = (formData) => {
    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, formData],
    }));
    reset({ field: '', type: 'text', placeholder: '' });
  };

  const handleRemoveField = (index) => {
    const removeSelected = formData.fields.filter((field, i) => i !== index);

    setFormData((prev) => ({ ...prev, fields: removeSelected }));
  };

  const handleAddForm = () => {
    if (formData.title === '') {
      return setError((prev) => ({
        ...prev,
        title: 'Digite um título válido',
      }));
    } else setError({ title: '' });
    if (formData.fields.length === 0) {
      return setError((prev) => ({
        ...prev,
        fields: 'Digite pelo menos um campo para o seu formulário',
      }));
    } else {
      setError({ fields: '' });
    }

    addForm(formData);
    setFormData({
      title: '',
      fields: [],
    });
  };

  return (
    <Box className='main-container !flex !flex-col'>
      <Box className='flex-grow'>
        <Box className='flex flex-col gap-4'>
          <label htmlFor={'field'} className='text-base leading-5'>
            Título
          </label>
          <Box
            className={`relative w-full rounded-[4px] overflow-hidden after:content-[''] after:absolute after:h-[2px] after:bg-cian  after:left-1/2 after:bottom-0 after:-translate-x-1/2 hover:after:w-full animation shadow-sm shadow-gray-900/50  ${
              error.title && 'after:bg-red-500 after:w-full'
            }`}
          >
            <input
              id='field'
              type={'text'}
              placeholder={'Digite aqui'}
              className={`w-full rounded-[4px] px-3 py-[5px] leading-5 text-base outline-none bg-white placeholder:text-gray-900`}
              autoComplete='false'
              value={formData?.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            {error.title && (
              <Box
                className={`absolute right-1
                 top-1 text-red-500`}
              >
                <AiOutlineWarning size={20} className='text-red-500' />
              </Box>
            )}
          </Box>
          <span className='text-small text-red-500 -mt-[10px]'>
            {error?.title && error.title}
          </span>

          <Heading
            pt={2}
            className='!text-normal !leading-5 !font-bold !font-inter !text-primary-400'
          >
            Campos do formulário
          </Heading>
          <form
            id='addFieldsForm'
            className='flex flex-col gap-4'
            onSubmit={handleSubmit(handleAddField)}
          >
            <Input
              theme={'light'}
              type={'text'}
              label={'Campo'}
              placeholder={'Digite aqui'}
              register={register}
              id={'field'}
              error={errors?.field?.message}
              watch={watch}
            />
            <Box className='flex items-center justify-center gap-4'>
              <Box>
                <label
                  htmlFor={'type'}
                  className='text-base leading-5 mb-[9px] block'
                >
                  Tipo
                </label>
                <select
                  id='type'
                  {...register('type')}
                  className={`w-full rounded-[4px] px-3 py-[5px] leading-5 text-base outline-none bg-white placeholder:text-gray-900 shadow-sm shadow-gray-900/50`}
                >
                  <option value='text'>Texto</option>
                  <option value='number'>Número</option>
                  <option value='email'>E-mail</option>
                </select>
                {errors?.type?.message ? (
                  <span className='text-small text-red-500 -mt-1'>
                    {errors?.type?.message}
                  </span>
                ) : (
                  errors?.placeholder?.message && (
                    <span className='text-small text-transparent -mt-1'>a</span>
                  )
                )}
              </Box>
              <Input
                theme={'light'}
                type={'text'}
                label={'Placeholder'}
                placeholder={'Digite aqui'}
                register={register}
                id={'placeholder'}
                error={errors?.placeholder?.message}
                watch={watch}
              />
            </Box>
            <button
              type='submit'
              form='addFieldsForm'
              className='w-full bg-white rounded-[4px] px-3 py-[5px] text-primary-400 border-[1px] border-primary-400 text-base leading-5 mt-2 font-medium'
            >
              Adicionar Campo
            </button>
            <span className='text-small text-red-500 -mt-1'>
              {error?.fields && error.fields}
            </span>
          </form>
          {formData.fields?.length > 0 && (
            <ul>
              {formData.fields?.map((question, index) => (
                <li key={index} className='flex justify-between'>
                  <span className='font-medium text-primary-600'>
                    {question.field}
                  </span>
                  <button
                    className='font-medium text-red-500'
                    onClick={() => handleRemoveField(index)}
                  >
                    <IoTrashBinSharp />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Box>
      <button
        type='button'
        className='w-full disabled:bg-gray-900/30 bg-primary-400 rounded-[4px] px-3 py-[5px] text-white text-base leading-5'
        onClick={handleAddForm}
        disabled={loading}
      >
        {loading ? <Spinner color='white' size='sm' /> : 'Adicionar Formulário'}
      </button>
    </Box>
  );
}
