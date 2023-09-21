import { useState } from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../../components/Global/Navbar';
import PostCard from '../../../components/Global/Newsletter/PostCard';
import Pagination from '../../../components/Global/Pagination';
import SearchBar from '../../../components/Global/SearchBar';
import CategoriesFilter from '../../../components/Global/Newsletter/CategoriesFilter';
import LoginModal from '../../../components/Auth/LoginModal';
import { Box, Flex, Text } from '@chakra-ui/react';
import { IoMdStar } from 'react-icons/io';

export default function Newsletter() {
  const { user } = useSelector((state) => state.auth);
  const { posts, selectedCategory, pages, currentPage } = useSelector(
    (state) => state.posts,
  );
  const page = pages?.find((page) => page.page === currentPage);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <Box className='min-h-screen bg-gray-200'>
      <Navbar title='Newsletter' />
      <SearchBar type='post' />

      {!user && (
        <Flex className='p-2 !items-start bg-gray-250 gap-1'>
          <IoMdStar size={20} className='text-orange -mt-[2px]' />
          <Text className=' text-small leading-4'>
            Tenha acesso ilimitado a todo o conteúdo e cresça como investidor.{' '}
            <button
              className='text-primary-400'
              onClick={() => setOpenLoginModal(true)}
            >
              Entre ou cadastre-se agora.
            </button>
          </Text>
        </Flex>
      )}

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
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
    </Box>
  );
}
