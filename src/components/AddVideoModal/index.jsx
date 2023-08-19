import React, { useState } from 'react';
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

export default function AddVideoModal({ id }) {
  const [video, setVideo] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(AddVideoSchema)
  });

  const { uploadVideo, progress, loading } = useUploadVideo();

  const handleAddVideo = (formData) => {
    uploadVideo({ title: formData.title }, `courses/${id}/videos`, video);
  };

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Adicionar aula</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Novo Curso</DialogTitle>
          <DialogContent>
            {progress > 0 && progress < 100 ? (
              <Field
                validationMessage='Enviando arquivo'
                validationState='none'
              >
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
                    <span className='text-xs text-red-400 mt-[-12px]'>
                      {errors.title.message}
                    </span>
                  )}
                </div>
                <input
                  type='file'
                  onChange={(e) => setVideo(e.target.files[0])}
                  WS
                />
              </form>
            )}
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance='secondary'>Cancelar</Button>
            </DialogTrigger>
            {loading ? (
              ''
            ) : (
              <Button
                appearance='primary'
                onClick={handleSubmit(handleAddVideo)}
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
