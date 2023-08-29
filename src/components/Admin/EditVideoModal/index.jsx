import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddVideoSchema } from './editVideoSchema';

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

export default function EditVideoModal({
  courseId,
  oldVideoData,
  openEditModal,
  setOpenEditModal,
}) {
  const [video, setVideo] = useState(null);
  const [file, setFile] = useState();

  const [files, setFiles] = useState(oldVideoData.assets);

  const [fileName, setFileName] = useState();
  const [fileURL, setFileURL] = useState();
  const [fileType, setFileType] = useState('file');

  // console.log(oldVideoData);

  const {
    updateVideo,
    // editVideoChangingVideoFile,
    // editVideoWithoutChangeVideo,
    progress,
    loading,
  } = useVideo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddVideoSchema),
  });

  const handleEditVideo = (formData) => {
    updateVideo(
      courseId,
      setOpenEditModal,
      oldVideoData,
      { title: formData.title },
      `courses/${courseId}/videos`,
      files,
      video,
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
    <Dialog modalType='modal' open={openEditModal}>
      <DialogTrigger disableButtonEnhancement>
        <Button onClick={() => setOpenEditModal(true)}>Editar</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Editar Video</DialogTitle>
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
                  onSubmit={handleSubmit(handleEditVideo)}
                >
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
                  onClick={() => setOpenEditModal(false)}
                >
                  Cancelar
                </Button>
              </DialogTrigger>

              <Button appearance='primary' type='submit' form='videoForm'>
                Salvar
              </Button>
            </DialogActions>
          )}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
