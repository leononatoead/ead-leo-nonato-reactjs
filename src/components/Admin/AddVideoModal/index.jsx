import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddVideoSchema } from './addVideoSchema';

import useVideo from '../../../hooks/useVideo';

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
  ProgressBar,
} from '@fluentui/react-components';

export default function AddVideoModal({
  id,
  openVideoModal,
  setOpenVideoModal,
}) {
  const [video, setVideo] = useState();
  const [file, setFile] = useState();

  const [files, setFiles] = useState([]);

  const [fileName, setFileName] = useState();
  const [fileURL, setFileURL] = useState();
  const [fileType, setFileType] = useState('file');

  const { uploadVideo, progress, loading } = useVideo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddVideoSchema),
  });

  const handleAddVideo = (formData) => {
    uploadVideo(
      { title: formData.title },
      `courses/${id}/videos`,
      video,
      files,
      setOpenVideoModal,
    );
  };

  const handleAddFile = (e) => {
    e.preventDefault();

    if (fileURL) {
      const fileData = {
        fileName,
        fileURL,
      };

      const fileList = [...files, fileData];
      setFiles(fileList);
    } else {
      const fileData = {
        fileName,
        file,
      };
      const fileList = [...files, fileData];
      setFiles(fileList);
    }

    setFileName('');
    setFileURL('');
    setFile();
  };

  const handleRemoveFile = (index) => {
    const removeSelected = files.filter((file, i) => i !== index);

    setFiles(removeSelected);
  };

  return (
    <Dialog modalType='modal' open={openVideoModal}>
      <DialogTrigger disableButtonEnhancement>
        <Button onClick={() => setOpenVideoModal(true)}>Adicionar aula</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Adicionar aula</DialogTitle>
          <DialogContent>
            {loading ? (
              <Field validationMessage='cadastrando ...' validationState='none'>
                <ProgressBar />
              </Field>
            ) : (
              <>
                <form
                  className='formLayout'
                  id='videoForm'
                  onSubmit={handleSubmit(handleAddVideo)}
                >
                  <div className='flex flex-col gap-2'>
                    <label htmlFor={'video'}>Vídeo:</label>
                    <input
                      type='file'
                      id='video'
                      onChange={(e) => setVideo(e.target.files[0])}
                      multiple={false}
                      accept='video/*'
                      title='Selecione um vídeo'
                    />
                  </div>
                  <div>
                    <label htmlFor={'title'}>Título:</label>
                    <input
                      type='text'
                      className='inputLayout'
                      id='title'
                      {...register('title')}
                    />
                    {errors.title && (
                      <span className='errorText'>{errors.title.message}</span>
                    )}
                  </div>
                </form>

                <h2 className='text-xl font-medium'>Material adicional</h2>
                {files.length > 0 && (
                  <ul>
                    {files.map((file, index) => (
                      <li key={index} className='flex justify-between'>
                        <span>{file.fileName}</span>
                        <button
                          className='font-medium text-red-500'
                          onClick={() => handleRemoveFile(index)}
                        >
                          remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <select
                  defaultChecked='file'
                  onChange={(e) => setFileType(e.target.value)}
                >
                  <option value='file'>Arquivo</option>
                  <option value='url'>Link</option>
                </select>
                <form
                  onSubmit={handleAddFile}
                  className='formLayout'
                  id='fileForm'
                >
                  <div>
                    <label htmlFor={'fileName'}>Nome:</label>
                    <input
                      type='text'
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      className='inputLayout'
                    />
                  </div>
                  {fileType === 'file' ? (
                    <div className='flex flex-col gap-2'>
                      <label htmlFor={'assets'}>Arquivo:</label>
                      <input
                        type='file'
                        id='assets'
                        onChange={(e) => setFile(e.target.files[0])}
                        multiple={false}
                        accept='.pdf,.docx,.doc'
                        title='Selecione um arquivo PDF ou Word'
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor={'fileURL'}>URL:</label>
                      <input
                        id='fileURL'
                        type='text'
                        value={fileURL}
                        onChange={(e) => setFileURL(e.target.value)}
                        className='inputLayout'
                      />
                    </div>
                  )}
                  <button
                    className='!w-40 bg-sky-400 py-2 px-4 rounded-sm font-bold text-white'
                    type='submit'
                    form='fileForm'
                  >
                    Adicionar arquivo
                  </button>
                </form>
              </>
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

              <Button appearance='primary' type='submit' form='videoForm'>
                Adicionar
              </Button>
            </DialogActions>
          )}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
