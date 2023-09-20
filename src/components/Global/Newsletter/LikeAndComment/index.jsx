import { useSelector } from 'react-redux';
import usePosts from '../../../../hooks/usePosts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentSchema } from './CommentSchema';

import { Box, Flex, Text } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export default function LikeAndComment({ post }) {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(CommentSchema) });

  const { updatePost } = usePosts();

  const handleAddComment = (formData) => {
    const data = { user: user.uid };

    updatePost(post.id, formData);
    reset({ comment: '' });
  };

  return (
    <Box className='px-4 pb-6'>
      <Flex className='gap-4' alignItems={'center'}>
        {user ? (
          <>
            {user?.posts?.includes(post) ? (
              <AiFillHeart size={20} className='text-primary-600' />
            ) : (
              <AiOutlineHeart size={20} className='text-primary-600' />
            )}
          </>
        ) : (
          <AiOutlineHeart size={20} className='text-primary-600' />
        )}
        <Text className='text-primary-600 font-medium'>
          {post?.likes
            ? `${post.likes} ${post.likes > 1 ? 'Curtidas' : 'Curtida'}`
            : ''}
        </Text>
      </Flex>
      {/* 
      <Box className='py-4'>
        <Heading className='!font-poppins !text-large !leading-6 !font-semibold  !text-primary-600 '>
          Comentários
        </Heading>

        <form
          id='addCommentForm'
          onSubmit={handleSubmit(handleAddComment)}
          className='flex flex-col gap-1'
        >
          <Input
            theme={'light'}
            type={'textarea'}
            label={''}
            placeholder={'Digite seu comentário aqui'}
            register={register}
            id={'comment'}
            error={errors?.comment?.message}
            watch={watch}
          />

          <ButtonSubmit
            form='addCommentForm'
            // disabled={loading}
            text={'Adicionar Comentário'}
            // loading={loading}
          />
        </form>

        {post?.comments && (
          <ul>
            {post.comments.map((comment) => (
              <li>comment</li>
            ))}
          </ul>
        )}
      </Box> */}
    </Box>
  );
}
