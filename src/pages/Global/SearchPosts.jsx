import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../../redux/modules/posts/actions';
import { Box, Text } from '@chakra-ui/react';
import Navbar from '../../components/Global/Navbar';
import PostCard from '../../components/Global/Newsletter/PostCard';
import SearchBar from '../../components/Global/SearchBar';

export default function SearchResults() {
  const { id } = useParams();
  const { searchResults } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    const search = id
      .toLowerCase()
      .replace(/[áàãâä]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòõôö]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/ç/g, 'c')
      .split('-');

    dispatch(searchPosts(search));
  }, [id]);

  return (
    <Box className='min-h-screen bg-gray-200 flex flex-col'>
      <Navbar title={'Pesquisa'} />

      <SearchBar type='post' />

      {searchResults?.length > 0 ? (
        <ul className='px-4 py-6 flex flex-col gap-4'>
          {searchResults.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </ul>
      ) : (
        <Box className='px-4 py-6 flex flex-col items-center justify-center gap-4 flex-1'>
          <Text>Nenhuma postagem encontrada.</Text>
        </Box>
      )}
    </Box>
  );
}
