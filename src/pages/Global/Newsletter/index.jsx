import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../redux/modules/posts/actions';

import Navbar from '../../../components/Global/Navbar';
import { Box, Text } from '@chakra-ui/react';
import PostCard from '../../../components/Global/PostCard';
import Pagination from '../../../components/Global/Pagination';

export default function Newsletter() {
  const { pages, currentPage } = useSelector((state) => state.posts);
  const page = pages?.find((page) => page.page === currentPage);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!pages) {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <Box className='min-h-screen bg-gray-200'>
      <Navbar title='Newsletter' />
      {/* TODO: SEARCHBAR DE POSTS */}
      <Box className='px-4 py-6'>
        {/* TODO: SLIDER DE CATEGORIAS */}
        {page && page.posts.length > 0 ? (
          <ul className='flex flex-col gap-4 pt-6 flex-grow'>
            {page.posts?.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </ul>
        ) : (
          <Box>
            <Text>Nenhum post encontrado.</Text>
          </Box>
        )}

        <Pagination />
      </Box>
    </Box>
  );
}
