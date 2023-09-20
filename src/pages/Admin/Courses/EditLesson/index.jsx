import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../../../redux/modules/courses/actions';
import useVideo from '../../../../hooks/useVideo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddVideoSchema } from './editVideoSchema';
import { useLocation, useNavigate } from 'react-router-dom';

import ButtonSubmit from '../../../../components/Global/ButtonSubmit';
import Input from '../../../../components/Global/Input';
import ConfirmModal from '../../../../components/Global/ConfirmModal';
import { Box, Flex, Heading, Radio, RadioGroup } from '@chakra-ui/react';

export default function EditLesson() {
  const { pathname } = useLocation();
  const pathParams = pathname.split('/');

  const courseId = pathParams[3];
  const id = pathParams[5];

  const { videos } = useSelector((state) => state.courses);
  const oldVideoData = videos?.find((video) => video.id === id);

  const [editVideo, setEditVideo] = useState({
    videoURL: '',
    videoFile: null,
    assetsList: oldVideoData?.assets || [],
    questionsList: [],
    assetFile: null,
    assetName: '',
    assetURL: '',
    assetType: 'file',
  });

  const [openConfirmModal, setOpenConfirmModal] = useState();

  const { updateVideo, deleteVideo, loading } = useVideo();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddVideoSchema),
  });

  const handleEditVideo = (formData) => {
    updateVideo(
      pathParams[3],
      oldVideoData,
      {
        title: formData.title,
        description: formData.description,
        // questions: formData.questionsList || null,
      },
      `courses/${pathParams[3]}/videos`,
      editVideo.assetsList,
      editVideo.videoFile,
    );
  };

  useEffect(() => {
    if (!videos) {
      dispatch(fetchVideos(pathParams[3]));
    }
  }, [videos]);

  const handleAddFile = (e) => {
    e.preventDefault();

    if (!editVideo?.assetName) return;

    if (editVideo?.assetURL) {
      const data = {
        fileName: editVideo?.assetName,
        fileURL: editVideo?.assetURL,
      };

      setEditVideo((prev) => ({
        ...prev,
        assetsList: [...prev.assetsList, data],
        assetName: '',
        assetURL: '',
      }));
    } else if (editVideo?.assetFile) {
      const data = {
        fileName: editVideo?.assetName,
        file: editVideo?.assetFile,
      };

      setEditVideo((prev) => ({
        ...prev,
        assetsList: [...prev.assetsList, data],
        assetName: '',
        assetFile: '',
      }));
    }
  };

  const handleInputFileChange = (e) => {
    setEditVideo((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleInputChange = (e) => {
    setEditVideo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectType = (e) => {
    setEditVideo((prev) => ({ ...prev, assetType: e.target.value }));
  };

  const handleRemoveFile = (index) => {
    const removeSelected = editVideo.assetsList.filter(
      (file, i) => i !== index,
    );
    setEditVideo((prev) => ({ ...prev, assetsList: removeSelected }));
  };

  const handleDeleteVideo = () => {
    deleteVideo(
      courseId,
      oldVideoData.id,
      oldVideoData.storageRef,
      oldVideoData.assets,
    );

    navigate(-1);
  };

  return (
    <Box className='main-container !flex !flex-col'>
      <Box className='flex-1'>
        <form id='editLessonForm' onSubmit={handleSubmit(handleEditVideo)}>
          <Box className='mb-4'>
            <label
              htmlFor={'videoFile'}
              className='text-base leading-5 mb-[9px] block'
            >
              Alterar vídeo
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
          </Box>
          <Input
            theme={'light'}
            type={'text'}
            label={'Título'}
            placeholder={'Digite aqui'}
            register={register}
            id={'title'}
            error={errors?.title?.message}
            watch={watch}
            defaultValue={oldVideoData?.title}
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
            defaultValue={oldVideoData?.description}
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
            defaultValue={oldVideoData?.section}
          />
        </form>
        <Heading
          mt={4}
          mb={2}
          className='!text-base !leading-5 !font-normal !font-inter'
        >
          Material adicional
        </Heading>
        {editVideo?.assetType !== 'questions' ? (
          <ul>
            {editVideo?.assetsList.map((file, index) => (
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
          defaultValue={editVideo.assetType}
          className='flex items-center justify-start gap-4'
          mb={2}
        >
          <Radio value='file' size={'sm'} onChange={handleSelectType}>
            Arquivo
          </Radio>
          <Radio value='url' size={'sm'} onChange={handleSelectType}>
            Link
          </Radio>
          <Radio value='questions' size={'sm'} onChange={handleSelectType}>
            Questionário
          </Radio>
        </RadioGroup>

        <form onSubmit={handleAddFile} id='fileForm'>
          {editVideo?.assetType !== 'questions' && (
            <>
              <label
                htmlFor={'assetName'}
                className='text-base leading-5 mb-[9px] block'
              >
                Nome
              </label>
              <div
                className={`my-2 relative w-full rounded-[4px] overflow-hidden after:content-[''] after:absolute after:h-[2px] after:bg-cian after:left-1/2 after:bottom-0 after:-translate-x-1/2 ${
                  editVideo?.assetName ? 'after:w-full' : 'after:w-0'
                } hover:after:w-full animation shadow-sm shadow-zinc-700/50`}
              >
                <input
                  type='text'
                  value={editVideo?.assetName}
                  name={'assetName'}
                  placeholder='Digite aqui'
                  onChange={handleInputChange}
                  className={`w-full rounded-[4px]  px-3 py-[5px] leading-5 text-base outline-none  bg-white `}
                />
              </div>
            </>
          )}
          {editVideo?.assetType === 'file' ? (
            <div className='flex flex-col gap-2'>
              <label
                htmlFor={'assetFile'}
                className='text-base leading-5 mb-[9px] block'
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
          ) : editVideo?.assetType === 'url' ? (
            <div>
              <label
                htmlFor={'assetURL'}
                className='text-base leading-5 mb-[9px] block'
              >
                URL
              </label>
              <div
                className={`relative w-full rounded-[4px] overflow-hidden after:content-[''] after:absolute after:h-[2px] after:bg-cian after:left-1/2 after:bottom-0 after:-translate-x-1/2 ${
                  editVideo?.assetURL ? 'after:w-full' : 'after:w-0'
                } hover:after:w-full animation shadow-sm shadow-zinc-700/50`}
              >
                <input
                  type='text'
                  name={'assetURL'}
                  value={editVideo?.assetURL}
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
            className='w-full bg-white rounded-[4px] px-3 py-[5px] text-primary-600 border-[1px] border-primary-600 text-base leading-5 mt-2'
            type='submit'
            form='fileForm'
          >
            Incluir material
          </button>
        </form>
      </Box>

      <Flex flexDirection={'column'} gap={2}>
        <ButtonSubmit
          form='editLessonForm'
          disabled={false}
          text={'Alterar'}
          loading={loading}
        />

        <ConfirmModal
          deleteFunction={handleDeleteVideo}
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
        />
      </Flex>
    </Box>
  );
}
