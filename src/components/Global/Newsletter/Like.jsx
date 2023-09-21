import { useSelector } from 'react-redux';
import usePosts from '../../../hooks/usePosts';

import { Flex, Text } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export default function Like({ id }) {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const post = posts?.find((post) => post.id === id);
  const { addLike, removeLike } = usePosts();

  const handleLikePost = () => {
    addLike(id, user.uid);
  };
  const handleDislikePost = () => {
    removeLike(id, user.uid);
  };

  return (
    <Flex className='gap-2 px-4' alignItems={'center'}>
      {user ? (
        <>
          {user?.likedPosts?.includes(post.id) ? (
            <AiFillHeart
              size={20}
              className='text-primary-600 cursor-pointer'
              onClick={handleDislikePost}
            />
          ) : (
            <AiOutlineHeart
              size={20}
              className='text-primary-600 cursor-pointer'
              onClick={handleLikePost}
            />
          )}
        </>
      ) : (
        <AiOutlineHeart
          size={20}
          className='text-primary-600 cursor-pointer'
          onClick={handleLikePost}
        />
      )}
      <Text className='text-gray-400 text-small'>
        {post?.likesCount
          ? `${post.likesCount} ${post.likesCount > 1 ? 'Curtidas' : 'Curtida'}`
          : 'Nenhuma curtida'}
      </Text>
    </Flex>
  );
}
