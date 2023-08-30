import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddVideoSchema } from './addVideoSchema';

import useVideo from '../../../hooks/useVideo';

import {
  DialogActions,
  DialogBody,
  DialogContent,
  Field,
  ProgressBar,
} from '@fluentui/react-components';
import Modal from '../../Global/Modal';
import Input from '../../Global/Input';
import ButtonSubmit from '../../Global/ButtonSubmit';

export default function AddVideoModal({
  id,
  openVideoModal,
  setOpenVideoModal,
}) {
  const [newVideo, setNewVideo] = useState({
    videoURL: '',
    videoFile: null,
    assetsList: [],
    assetFile: null,
    assetName: '',
    assetURL: '',
    assetType: 'file',
  });

  const { uploadVideo, loading } = useVideo();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(AddVideoSchema),
  });

  const handleAddVideo = (formData) => {
    uploadVideo(
      {
        title: formData.title,
        section: formData.section,
        description: formData.description,
        questions: formData.questions || null,
      },
      `courses/${id}/videos`,
      newVideo.videoFile,
      newVideo.assetsList,
      setOpenVideoModal,
    );
  };

  const handleAddFile = (e) => {
    e.preventDefault();

    if (!newVideo?.assetName) return;

    if (newVideo?.assetURL) {
      const data = {
        fileName: newVideo?.assetName,
        fileURL: newVideo?.assetURL,
      };

      setNewVideo((prev) => ({
        ...prev,
        assetsList: [...prev.assetsList, data],
        assetName: '',
        assetURL: '',
      }));
    } else if (newVideo?.assetFile) {
      const data = {
        fileName: newVideo?.assetName,
        file: newVideo?.assetFile,
      };

      setNewVideo((prev) => ({
        ...prev,
        assetsList: [...prev.assetsList, data],
        assetName: '',
        assetFile: '',
      }));
    }
  };

  const handleInputChange = (e) => {
    setNewVideo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInputFileChange = (e) => {
    setNewVideo((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleRemoveFile = (index) => {
    const removeSelected = newVideo.assetsList.filter((file, i) => i !== index);

    setNewVideo((prev) => ({ ...prev, assetsList: removeSelected }));
  };

  const handleCloseModal = () => {
    setOpenVideoModal(false);
  };

  return (
    <Modal
      title={'Adicionar Video'}
      openModal={openVideoModal}
      setOpenModal={setOpenVideoModal}
      handleCloseModal={handleCloseModal}
    >
      <DialogBody>
        <DialogContent>
          {loading ? (
            <Field validationMessage='cadastrando ...' validationState='none'>
              <ProgressBar />
            </Field>
          ) : (
            <div className='max-h-[70vh] hidden-scroll-bar'>
              <form id='videoForm' onSubmit={handleSubmit(handleAddVideo)}>
                <div className='flex flex-col gap-2'>
                  <label htmlFor={'videoFile'}>Vídeo</label>
                  <input
                    type='file'
                    name='videoFile'
                    onChange={handleInputFileChange}
                    multiple={false}
                    accept='video/*'
                    title='Selecione um vídeo'
                    className='mb-2'
                  />
                </div>
                <Input
                  theme={'light'}
                  type={'title'}
                  label={'Título'}
                  placeholder={'Digite aqui'}
                  register={register}
                  id={'title'}
                  error={errors?.title?.message}
                  watch={watch}
                />
                <Input
                  theme={'light'}
                  type={'description'}
                  label={'Descrição'}
                  placeholder={'Digite aqui'}
                  register={register}
                  id={'description'}
                  error={errors?.description?.message}
                  watch={watch}
                />
                <Input
                  theme={'light'}
                  type={'section'}
                  label={'Seção'}
                  placeholder={'Digite aqui'}
                  register={register}
                  id={'section'}
                  error={errors?.section?.message}
                  watch={watch}
                />
                <Input
                  theme={'light'}
                  type={'formRef'}
                  label={'Questionário'}
                  placeholder={'Digite aqui'}
                  register={register}
                  id={'formRef'}
                  error={errors?.formRef?.message}
                  watch={watch}
                />
              </form>

              <h2 className=''>Material adicional</h2>
              {newVideo?.assetsList.length > 0 && (
                <ul>
                  {newVideo?.assetsList.map((file, index) => (
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
                name='assetType'
                onChange={handleInputChange}
                className='w-full rounded-[4px] py-[4px] px-2 shadow-sm shadow-zinc-700/50 my-2'
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
                  <label htmlFor={'assetName'}>Nome</label>
                  <div
                    className={`my-2 relative w-full rounded-[4px] overflow-hidden after:content-[''] after:absolute after:h-[2px] after:bg-[#60cdff] after:left-1/2 after:bottom-0 after:-translate-x-1/2 ${
                      newVideo?.assetName ? 'after:w-full' : 'after:w-0'
                    } hover:after:w-full animation shadow-sm shadow-zinc-700/50`}
                  >
                    <input
                      type='text'
                      value={newVideo?.assetName}
                      name={'assetName'}
                      placeholder='Digite aqui'
                      onChange={handleInputChange}
                      className={`w-full rounded-[4px]  px-3 py-[5px] leading-[20px] text-[14px] outline-none  bg-white `}
                    />
                  </div>
                </div>
                {newVideo?.assetType === 'file' ? (
                  <div className='flex flex-col gap-2'>
                    <label htmlFor={'assetFile'}>Arquivo</label>
                    <input
                      type='file'
                      name='assetFile'
                      onChange={handleInputFileChange}
                      multiple={false}
                      accept='.pdf,.docx,.doc'
                      title='Selecione um arquivo PDF ou Word'
                    />
                  </div>
                ) : (
                  <div>
                    <label htmlFor={'assetURL'}>URL</label>
                    <div
                      className={`relative w-full rounded-[4px] overflow-hidden after:content-[''] after:absolute after:h-[2px] after:bg-[#60cdff] after:left-1/2 after:bottom-0 after:-translate-x-1/2 ${
                        newVideo?.assetURL ? 'after:w-full' : 'after:w-0'
                      } hover:after:w-full animation shadow-sm shadow-zinc-700/50`}
                    >
                      <input
                        type='text'
                        name={'assetURL'}
                        value={newVideo?.assetURL}
                        placeholder='https://exemplo.com.br'
                        onChange={handleInputChange}
                        className={`w-full rounded-[4px]  px-3 py-[5px] leading-[20px] text-[14px] outline-none  bg-white `}
                      />
                    </div>
                  </div>
                )}
                <button
                  className='w-full disabled:bg-white/30 bg-white rounded-[4px] px-3 py-[5px] text-[#005FB8] border-[1px] border-[#005FB8] text-[14px] leading-[20px] mt-2'
                  type='submit'
                  form='fileForm'
                >
                  Incluir material
                </button>
              </form>
            </div>
          )}
        </DialogContent>
        {loading ? (
          ''
        ) : (
          <DialogActions>
            <ButtonSubmit
              form='videoForm'
              disabled={false}
              text={'Confirmar'}
              loading={loading}
            />
          </DialogActions>
        )}
      </DialogBody>
    </Modal>
  );
}
