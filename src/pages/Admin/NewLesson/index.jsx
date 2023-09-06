import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddVideoSchema } from './addVideoSchema';

import useVideo from '../../../hooks/useVideo';

import Input from '../../../components/Global/Input';
import ButtonSubmit from '../../../components/Global/ButtonSubmit';

import { Box, Heading, Radio, RadioGroup } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchVideos } from '../../../redux/modules/courses/actions';

export default function NewLesson() {
  const { pathname } = useLocation();
  const pathParams = pathname.split('/');
  const id = pathParams[3];

  const { courses } = useSelector((state) => state.courses);
  const course = courses.find((course) => course.id === id);
  const dispatch = useDispatch();

  const [newVideo, setNewVideo] = useState({
    videoURL: '',
    videoFile: null,
    assetsList: [],
    questionsList: [],
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
        // questions: formData.questionsList || null,
      },
      `courses/${id}/videos`,
      newVideo.videoFile,
      newVideo.assetsList,
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

  // const handleAddQuestions = (e) => {
  //   e.preventDefault();

  // };

  const handleInputChange = (e) => {
    setNewVideo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectType = (e) => {
    setNewVideo((prev) => ({ ...prev, assetType: e.target.value }));
  };

  const handleInputFileChange = (e) => {
    setNewVideo((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleRemoveFile = (index) => {
    const removeSelected = newVideo.assetsList.filter((file, i) => i !== index);

    setNewVideo((prev) => ({ ...prev, assetsList: removeSelected }));
  };

  useEffect(() => {
    if (course && !course.videos) {
      dispatch(fetchVideos(id));
    }
  }, [courses, id]);

  return (
    <Box
      px={4}
      py={6}
      gap={2}
      className='min-h-[calc(100vh-40px)] !flex !flex-col'
    >
      <Box className='flex-1'>
        <form id='newLessonForm' onSubmit={handleSubmit(handleAddVideo)}>
          <label
            htmlFor={'videoFile'}
            className='text-base leading-5 mb-[3px] block'
          >
            Vídeo
          </label>
          <input
            type='file'
            name='videoFile'
            onChange={handleInputFileChange}
            multiple={false}
            accept='video/*'
            title='Selecione um vídeo'
            className='w-full outline-none text-base'
          />

          <Input
            theme={'light'}
            type={'text'}
            label={'Título'}
            placeholder={'Digite aqui'}
            register={register}
            id={'title'}
            error={errors?.title?.message}
            watch={watch}
          />
          <Input
            theme={'light'}
            type={'text'}
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
        </form>

        <Heading
          mt={4}
          mb={2}
          className='!text-base !leading-5 !font-normal !font-inter'
        >
          Material adicional
        </Heading>
        {newVideo?.assetType !== 'questions' ? (
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
        ) : (
          ''
        )}

        <RadioGroup
          defaultValue={newVideo.assetType}
          className='flex items-center justify-start gap-4'
          mb={2}
        >
          <Radio value='file' onChange={handleSelectType} size={'sm'}>
            Arquivo
          </Radio>
          <Radio value='url' onChange={handleSelectType} size={'sm'}>
            Link
          </Radio>
          <Radio value='questions' onChange={handleSelectType} size={'sm'}>
            Questionário
          </Radio>
        </RadioGroup>

        <form onSubmit={handleAddFile} id='fileForm'>
          {newVideo?.assetType !== 'questions' && (
            <>
              <label
                htmlFor={'assetName'}
                className='text-base leading-5 mb-[3px] block'
              >
                Nome
              </label>
              <div
                className={`my-2 relative w-full rounded-[4px] overflow-hidden after:content-[''] after:absolute after:h-[2px] after:bg-cian after:left-1/2 after:bottom-0 after:-translate-x-1/2 ${
                  newVideo?.assetName ? 'after:w-full' : 'after:w-0'
                } hover:after:w-full animation shadow-sm shadow-zinc-700/50`}
              >
                <input
                  type='text'
                  value={newVideo?.assetName}
                  name={'assetName'}
                  placeholder='Digite aqui'
                  onChange={handleInputChange}
                  className={`w-full rounded-[4px]  px-3 py-[5px] leading-5 text-base outline-none  bg-white `}
                />
              </div>
            </>
          )}
          {newVideo?.assetType === 'file' ? (
            <div className='flex flex-col gap-2'>
              <label
                htmlFor={'assetFile'}
                className='text-base leading-5 mb-[3px] block'
              >
                Arquivo
              </label>
              <input
                type='file'
                name='assetFile'
                onChange={handleInputFileChange}
                multiple={false}
                accept='.pdf,.docx,.doc'
                title='Selecione um arquivo PDF ou Word'
                className='w-full outline-none text-base'
              />
            </div>
          ) : newVideo?.assetType === 'url' ? (
            <div>
              <label
                htmlFor={'assetURL'}
                className='text-base leading-5 mb-[3px] block'
              >
                URL
              </label>
              <div
                className={`relative w-full rounded-[4px] overflow-hidden after:content-[''] after:absolute after:h-[2px] after:bg-cian after:left-1/2 after:bottom-0 after:-translate-x-1/2 ${
                  newVideo?.assetURL ? 'after:w-full' : 'after:w-0'
                } hover:after:w-full animation shadow-sm shadow-zinc-700/50`}
              >
                <input
                  type='text'
                  name={'assetURL'}
                  value={newVideo?.assetURL}
                  placeholder='https://exemplo.com.br'
                  onChange={handleInputChange}
                  className={`w-full rounded-[4px]  px-3 py-[5px] leading-5 text-base outline-none  bg-white `}
                />
              </div>
            </div>
          ) : (
            'questions'
          )}
          <button
            className='w-full disabled:bg-white/30 bg-white rounded-[4px] px-3 py-[5px] text-primary-600 border-[1px] border-primary-600 text-base leading-5 mt-2'
            type='submit'
            form='fileForm'
          >
            Incluir material
          </button>
        </form>
      </Box>

      <ButtonSubmit
        form='newLessonForm'
        disabled={false}
        text={'Confirmar'}
        loading={loading}
      />
    </Box>
  );
}
