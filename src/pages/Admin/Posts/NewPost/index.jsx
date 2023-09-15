import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostSchema } from './PostSchema';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Input from '../../../../components/Global/Input';
import ButtonSubmit from '../../../../components/Global/ButtonSubmit';

import { Box } from '@chakra-ui/react';

export default function NewPost() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(PostSchema) });

  const handleAddPost = (formData) => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    const data = JSON.stringify(contentRaw);

    console.log(formData);
    console.log(data);
  };

  return (
    <Box className='main-container flex flex-col bg-gray-200'>
      <form
        id='newPostForm'
        className='flex flex-col gap-[10px] pb-[10px]'
        onSubmit={handleSubmit(handleAddPost)}
      >
        <Input
          theme={'light'}
          type={'text'}
          label={'Categoria'}
          placeholder={'Digite aqui'}
          register={register}
          id={'category'}
          error={errors?.category?.message}
          watch={watch}
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
      </form>
      <Box className='rounded-md overflow-hidden flex flex-col flex-grow '>
        <label className='text-base leading-5 mb-[9px]'>Post</label>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbarClassName='w-full flex flex-wrap items-center justify-start border-none rounded-md shadow-sm shadow-gray-900/50'
          editorClassName='px-4 min-h-[250px] bg-white border-none rounded-md shadow-sm shadow-gray-900/50'
          toolbar={{
            options: [
              'fontSize',
              'inline',
              'textAlign',
              'image',
              'list',
              'colorPicker',
            ],
            inline: {
              options: ['bold', 'italic', 'underline'],
              bold: {
                className:
                  'w-8 h-8 !rounded-lg bg-gray-200 !rounded-lg bg-gray-200',
              },
              italic: {
                className:
                  'w-8 h-8 !rounded-lg bg-gray-200 !rounded-lg bg-gray-200',
              },
              underline: {
                className:
                  'w-8 h-8 !rounded-lg bg-gray-200 !rounded-lg bg-gray-200',
              },
            },
            fontSize: {
              options: [
                8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
              ],
              className: 'h-8 !rounded-lg bg-gray-200',
            },
            list: {
              options: ['unordered', 'ordered'],
              unordered: { className: 'w-8 h-8 !rounded-lg bg-gray-200' },
              ordered: { className: 'w-8 h-8 !rounded-lg bg-gray-200' },
            },
            textAlign: {
              inDropdown: false,
              options: ['left', 'center', 'right', 'justify'],
              left: { className: 'w-8 h-8 !rounded-lg bg-gray-200' },
              center: { className: 'w-8 h-8 !rounded-lg bg-gray-200' },
              right: { className: 'w-8 h-8 !rounded-lg bg-gray-200' },
              justify: { className: 'w-8 h-8 !rounded-lg bg-gray-200' },
            },
            link: {
              inDropdown: false,
              showOpenOptionOnHover: true,
              defaultTargetOption: '_self',
              options: ['link', 'unlink'],
              link: { className: 'w-8 h-8 !rounded-lg bg-gray-200' },
              unlink: { className: 'w-8 h-8 !rounded-lg bg-gray-200' },
            },

            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              previewImage: false,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              alt: { present: false, mandatory: false },
              defaultSize: {
                height: 'auto',
                width: 'auto',
              },
              className: 'w-8 h-8 !rounded-lg bg-gray-200',
            },
            colorPicker: {
              className: 'w-8 h-8 !rounded-lg bg-gray-200',
            },
          }}
        />
      </Box>
      <ButtonSubmit
        form='newPostForm'
        disabled={false}
        text={'Adicionar Post'}
        loading={false}
      />
    </Box>
  );
}
