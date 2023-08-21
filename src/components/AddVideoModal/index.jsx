import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddVideoSchema } from './addVideoSchema';

import useUploadVideo from '../../hooks/useUploadVideo';

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  ProgressBar
} from '@fluentui/react-components';

export default function AddVideoModal({
  id,
  openVideoModal,
  setOpenVideoModal
}) {
  const [video, setVideo] = useState();

  const { uploadVideo, progress, loading } = useUploadVideo();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(AddVideoSchema)
  });

  const handleAddVideo = (formData) => {
    uploadVideo(
      { title: formData.title },
      `courses/${id}/videos`,
      video,
      setOpenVideoModal
    );
  };

  return (
    <Dialog modalType='modal' open={openVideoModal}>
      <DialogTrigger disableButtonEnhancement>
        <Button onClick={() => setOpenVideoModal(true)}>Adicionar aula</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Novo Curso</DialogTitle>
          <DialogContent>
            {progress > 0 && progress < 100 ? (
              <Field validationMessage='cadastrando ...' validationState='none'>
                <ProgressBar />
              </Field>
            ) : (
              <form className='formLayout'>
                <div>
                  <label htmlFor={'title'}>Título:</label>
                  <input
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    className='inputLayout'
                    {...register('title')}
                  />
                  {errors.title && (
                    <span className='errorText'>{errors.title.message}</span>
                  )}
                </div>
                <input
                  type='file'
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </form>
            )}
          </DialogContent>
          {loading ? (
            ''
          ) : (
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  appearance='secondary'
                  onClick={() => setOpenVideoModal(false)}
                >
                  Cancelar
                </Button>
              </DialogTrigger>

              <Button
                appearance='primary'
                onClick={handleSubmit(handleAddVideo)}
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
