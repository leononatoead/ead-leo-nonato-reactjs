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

export default function AddCourse({ openCourseModal, setOpenCourseModal }) {
  const [imageFile, setImageFile] = useState();
  const [error, setError] = useState();

  const { addDocument } = useAddDocument('courses');
  const { uploadImage, loading: loadImage, progress } = useUploadImage();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(AddCourseSchema)
  });

  const handlAddCourse = async (formData) => {
    setError(null);
    if (imageFile) {
      uploadImage(formData, 'courses', imageFile, setOpenCourseModal);
    } else {
      setError('Envie uma imagem!');
    }
  };

  return (
    <Dialog modalType='modal' open={openCourseModal}>
      <DialogTrigger disableButtonEnhancement>
        <Button onClick={() => setOpenCourseModal(true)}>
          Cadastrar curso
        </Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Novo Curso</DialogTitle>
          <DialogContent>
            <form className='formLayout'>
              <label htmlFor={'name'}>Nome do curso</label>
              <input
                id='name'
                type='text'
                {...register('name')}
                className='inputLayout'
              />
              {errors.name && (
                <span className='errorText'>{errors.name.message}</span>
              )}
              <label htmlFor={'description'}>Descrição</label>
              <input
                id='description'
                type='text'
                {...register('description')}
                className='inputLayout'
              />
              {errors.description && (
                <span className='errorText'>{errors.description.message}</span>
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
                className='inputLayout'
              />
              {errors.Autor && (
                <span className='errorText'>{errors.Autor.message}</span>
              )}
              {progress > 0 && progress < 100 ? (
                <Field
                  validationMessage='carregando ...'
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
                  <span className='errorText'>{error}</span>
                </>
              )}
            </form>
          </DialogContent>
          {loadImage ? (
            ''
          ) : (
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  appearance='secondary'
                  onClick={() => setOpenCourseModal(false)}
                >
                  Cancelar
                </Button>
              </DialogTrigger>

              <Button
                appearance='primary'
                onClick={handleSubmit(handlAddCourse)}
              >
                Adicionar
              </Button>
            </DialogActions>
          )}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
