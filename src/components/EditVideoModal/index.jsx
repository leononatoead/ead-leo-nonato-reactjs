import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddVideoSchema } from './editVideoSchema';

import useVideo from '../../hooks/useVideo';

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

export default function EditVideoModal({
  courseId,
  oldVideoData,
  openEditModal,
  setOpenEditModal
}) {
  const [video, setVideo] = useState();

  const {
    editVideoChangingVideoFile,
    editVideoWithoutChangeVideo,
    progress,
    loading
  } = useVideo();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(AddVideoSchema)
  });

  const handleAddVideo = (formData) => {
    if (video) {
      editVideoChangingVideoFile(
        oldVideoData,
        { title: formData.title },
        `courses/${courseId}/videos`,
        video,
        setOpenEditModal
      );
    } else {
      editVideoWithoutChangeVideo(
        oldVideoData,
        { title: formData.title },
        `courses/${courseId}/videos`,
        setOpenEditModal
      );
    }
  };

  return (
    <Dialog modalType='modal' open={openEditModal}>
      <DialogTrigger disableButtonEnhancement>
        <Button onClick={() => setOpenEditModal(true)}>Editar</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Editar Video</DialogTitle>
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
                    defaultValue={oldVideoData?.title}
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
                  onClick={() => setOpenEditModal(false)}
                >
                  Cancelar
                </Button>
              </DialogTrigger>

              <Button
                appearance='primary'
                onClick={handleSubmit(handleAddVideo)}
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
