import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../redux/modules/posts/actions';

import Navbar from '../../../components/Global/Navbar';
import PostCard from '../../../components/Global/Newsletter/PostCard';
import Pagination from '../../../components/Global/Pagination';
import SearchBar from '../../../components/Global/SearchBar';
import CategoriesFilter from '../../../components/Global/Newsletter/CategoriesFilter';

import { Box, Text } from '@chakra-ui/react';

export default function Newsletter() {
  const { posts, selectedCategory, pages, currentPage } = useSelector(
    (state) => state.posts,
  );
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
      <SearchBar type='post' />

      <CategoriesFilter />

      <Box className='px-4 py-6'>
        {selectedCategory ? (
          <ul className='flex flex-col gap-4 flex-grow'>
            {selectedCategory?.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </ul>
        ) : page && page.posts.length > 0 ? (
          <ul className='flex flex-col gap-4 flex-grow'>
            {page.posts?.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </ul>
        ) : (
          <Box>
            <Text>Nenhum post encontrado.</Text>
          </Box>
        )}

        {!selectedCategory && posts?.length >= 10 && <Pagination />}
      </Box>
    </Box>
  );
}
