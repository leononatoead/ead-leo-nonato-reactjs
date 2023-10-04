import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SectionSchema } from './extraSchemas';

import Input from '../../Global/Input';
import { Box, Heading, useToast } from '@chakra-ui/react';
import SectionList from './SectionList';

export default function Sections({ sections, setSections }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(SectionSchema),
  });

  const toast = useToast();

  const handleAddFile = (formData) => {
    const filter = sections.filter(
      (section) => section.sectionName === formData.sectionName,
    );

    if (filter.length > 0) {
      toast({
        description: 'Já existe uma seção com este nome!',
        status: 'error',
        duration: '3000',
        isClosable: true,
      });
      return;
    }

    setSections((prev) => [...prev, formData]);

    reset({
      order: '',
      sectionName: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddFile)}
      id='AddAssetForm'
      className='flex flex-col gap-[10px] pb-4'
    >
      <Heading className='!font-bold !text-primary-600 !text-large !font-poppins'>
        Seções
      </Heading>
      <Input
        theme={'light'}
        type={'number'}
        label={'Ordem'}
        placeholder={'Digite aqui'}
        register={register}
        id={'order'}
        error={errors?.order?.message}
        watch={watch}
      />

      <Input
        theme={'light'}
        type={'text'}
        label={'Nome da seção'}
        placeholder={'Digite aqui'}
        register={register}
        id={'sectionName'}
        error={errors?.sectionName?.message}
        watch={watch}
      />

      <Box className='flex items-center gap-4 justify-start'>
        <button
          className='w-[50%] bg-white rounded-[4px] px-3 py-[5px] text-primary-600 border-[1px] border-primary-600 text-base leading-5 mt-2'
          type='submit'
          form='AddAssetForm'
        >
          Incluir
        </button>

        {sections.length > 0 && (
          <SectionList sections={sections} setSections={setSections} />
        )}
      </Box>
    </form>
  );
}
