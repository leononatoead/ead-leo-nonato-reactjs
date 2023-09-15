import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMorePosts,
  fetchPosts,
} from '../../../redux/modules/posts/actions';

import { Link } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import { MdAddCircleOutline } from 'react-icons/md';
import PostCardAdmin from '../../../components/Admin/PostCardAdmin';

export default function Posts() {
  const { posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const handleLoadMore = () => {
    const id = posts[posts.length - 1].id;

    dispatch(fetchMorePosts(id));
  };

  useEffect(() => {
    if (!posts) {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <Box className='main-container'>
      <Box className='w-full flex justify-end'>
        <Link to='/dashboard/posts/new' className='add-btn'>
          <MdAddCircleOutline size={20} />
          <span className='font-bold'>Novo Post</span>
        </Link>
      </Box>

      {posts && (
        <ul className='flex flex-col gap-2 pt-6'>
          {posts.map((post) => (
            <PostCardAdmin post={post} key={post.id} />
          ))}
        </ul>
      )}

      <button
        onClick={handleLoadMore}
        className='w-full bg-primary-400 px-4 py-2 mt-2 text-white font-bold rounded-md'
      >
        proxima page
      </button>
    </Box>
  );
}
