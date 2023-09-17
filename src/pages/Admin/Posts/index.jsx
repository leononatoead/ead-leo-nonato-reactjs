import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  changePage,
  fetchMorePosts,
  fetchPosts,
} from '../../../redux/modules/posts/actions';

import { Link } from 'react-router-dom';

import { Box, Text } from '@chakra-ui/react';

import { MdAddCircleOutline } from 'react-icons/md';
import PostCardAdmin from '../../../components/Admin/PostCardAdmin';

export default function Posts() {
  const { pages, currentPage } = useSelector((state) => state.posts);

  const page = pages?.find((page) => page.page === currentPage);

  const dispatch = useDispatch();

  const handleLoadMore = () => {
    const verifyIfPageAlreadyLoaded = pages?.find(
      (page) => page.page === currentPage + 1,
    );

    if (verifyIfPageAlreadyLoaded) {
      dispatch(changePage(currentPage + 1));
    } else {
      const id = page.posts[page.posts.length - 1].id;
      dispatch(fetchMorePosts(id));
    }
  };

  const handleBackPage = () => {
    dispatch(changePage(currentPage - 1));
  };

  useEffect(() => {
    if (!pages) {
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

      {page && page.posts.length > 0 ? (
        <ul className='flex flex-col gap-2 pt-6'>
          {page.posts?.map((post) => (
            <PostCardAdmin post={post} key={post.id} />
          ))}
        </ul>
      ) : (
        <Box>
          <Text>Nenhum post encontrado.</Text>
        </Box>
      )}

      <Box className='flex gap-2 text-small'>
        {currentPage > 1 && (
          <button
            onClick={handleBackPage}
            className='w-full bg-primary-400 px-4 py-2 mt-2 text-white font-bold rounded-md'
          >
            seta pra esquerda
          </button>
        )}
        {page?.posts.length === 10 && (
          <button
            onClick={handleLoadMore}
            className='w-full bg-primary-400 px-4 py-2 mt-2 text-white font-bold rounded-md'
          >
            seta pra direita
          </button>
        )}
      </Box>
    </Box>
  );
}
