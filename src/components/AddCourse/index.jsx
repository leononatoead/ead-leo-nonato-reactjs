import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddCourseSchema } from './addCourseSchema';

import useAddDocument from '../../hooks/useAddDocument';
import useUploadImage from '../../hooks/useUploadImage';

import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Select,
  ProgressBar,
  Field
} from '@fluentui/react-components';

export default function AddCourse() {
  const { addDocument } = useAddDocument('courses');
  const { uploadImage, loading: loadImage, progress } = useUploadImage();

  const [imageFile, setImageFile] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(AddCourseSchema)
  });

  const handlAddCourse = async (formData) => {
    if (imageFile) {
      uploadImage(formData, 'courses', imageFile);
    } else {
      addDocument(formData);
    }
  };

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Cadastrar curso</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Novo Curso</DialogTitle>
          <DialogContent>
            <form className='flex flex-col gap-2 my-6'>
              <label htmlFor={'name'}>Nome do curso</label>
              <input
                id='name'
                type='text'
                {...register('name')}
                className='w-full border-b-[1px] border-black p-2 outline-none'
              />
              {errors.name && (
                <span className='text-xs text-red-400 mt-[-12px]'>
                  {errors.name.message}
                </span>
              )}
              <label htmlFor={'description'}>Descrição</label>
              <input
                id='description'
                type='text'
                {...register('description')}
                className='w-full border-b-[1px] border-black p-2 outline-none'
              />
              {errors.description && (
                <span className='text-xs text-red-400 mt-[-12px]'>
                  {errors.description.message}
                </span>
              )}
              <label htmlFor={'isFree'}>Gratuido?</label>
              <Select
                id='isFree'
                appearance='underline'
                defaultValue={true}
                {...register('isFree', {
                  setValueAs: (v) => (v === 'true' ? true : false)
                })}
              >
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
              </Select>
              <label htmlFor={'needAuth'}>Precisa de cadastro?</label>
              <Select
                id='needAuth'
                appearance='underline'
                defaultValue={true}
                {...register('needAuth', {
                  setValueAs: (v) => (v === 'true' ? true : false)
                })}
              >
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
              </Select>
              <label htmlFor={'author'}>Autor</label>
              <input
                id='author'
                type='text'
                {...register('author')}
                className='w-full border-b-[1px] border-black p-2 outline-none'
              />
              {errors.Autor && (
                <span className='text-xs text-red-400 mt-[-12px]'>
                  {errors.Autor.message}
                </span>
              )}
              {progress > 0 && progress < 100 ? (
                <Field
                  validationMessage='Enviando arquivo'
                  validationState='none'
                >
                  <ProgressBar />
                </Field>
              ) : (
                <>
                  <label htmlFor={'image'}>Imagem</label>
                  <input
                    id='image'
                    type='file'
                    className='w-full border-b-[1px]p-2 outline-none'
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </>
              )}
            </form>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance='secondary'>Cancelar</Button>
            </DialogTrigger>
            {loadImage ? (
              ''
            ) : (
              <Button
                appearance='primary'
                onClick={handleSubmit(handlAddCourse)}
              >
                Confirmar
              </Button>
            )}
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
