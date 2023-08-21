import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { EditCourseSchema } from './editCourseSchema';

import useCourse from '../../hooks/useCourse';

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

export default function EditCourse({
  course,
  openEditModal,
  setOpenEditModal
}) {
  const [imageFile, setImageFile] = useState();

  const {
    editCourseWithImage,
    editCourseWithoutImage,
    loading: loadImage,
    progress
  } = useCourse();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(EditCourseSchema)
  });

  const handlAddCourse = async (formData) => {
    if (imageFile) {
      editCourseWithImage(
        course,
        formData,
        'courses',
        imageFile,
        setOpenEditModal
      );
    } else {
      editCourseWithoutImage(course, formData, setOpenEditModal);
    }
  };

  return (
    <Dialog modalType='modal' open={openEditModal}>
      <DialogTrigger disableButtonEnhancement>
        <Button onClick={() => setOpenEditModal(true)}>Editar</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Editar Curso</DialogTitle>
          <DialogContent>
            <form className='formLayout'>
              <label htmlFor={'name'}>Nome do curso</label>
              <input
                id='name'
                type='text'
                {...register('name')}
                className='inputLayout'
                defaultValue={course?.name}
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
                defaultValue={course?.description}
              />
              {errors.description && (
                <span className='errorText'>{errors.description.message}</span>
              )}
              <label htmlFor={'isFree'}>Gratuido?</label>
              <Select
                id='isFree'
                appearance='underline'
                defaultValue={course?.isFree}
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
                defaultValue={course?.needAuth}
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
                defaultValue={course?.author}
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
                  onClick={() => setOpenEditModal(false)}
                >
                  Cancelar
                </Button>
              </DialogTrigger>

              <Button
                appearance='primary'
                onClick={handleSubmit(handlAddCourse)}
              >
                Alterar
              </Button>
            </DialogActions>
          )}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
