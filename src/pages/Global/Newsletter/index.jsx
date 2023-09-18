import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../redux/modules/posts/actions';

import Navbar from '../../../components/Global/Navbar';
import { Box, Text } from '@chakra-ui/react';
import PostCard from '../../../components/Global/PostCard';
import Pagination from '../../../components/Global/Pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Newsletter() {
  const { pages, currentPage } = useSelector((state) => state.posts);
  const page = pages?.find((page) => page.page === currentPage);

  const dispatch = useDispatch();
  const selectedCategory = 'Todos';
  const categories = ['Todos', 'Ações', 'Dólar', 'Fundos', 'Investimentos'];

  useEffect(() => {
    if (!pages) {
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <Box className='min-h-screen bg-gray-200'>
      <Navbar title='Newsletter' />
      {/* TODO: SEARCHBAR DE POSTS */}

      {/* TODO: SLIDER DE CATEGORIAS */}
      {/* <Swiper
        spaceBetween={'4px'}
        slidesPerView={3.5}
        className='pl-4 pt-5'
        freeMode={true}
      >
        {categories?.map((category, index) => {
          return (
            <SwiperSlide
              key={index}
              className={`${index === categories.length - 1 && 'mr-10'} w-auto`}
            >
              <Text
                className={`w-auto px-4 py-2 rounded-full text-center border-[1px] whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary-400 border-primary-400 text-white'
                    : 'bg-white border-gray-100 font-medium'
                }`}
              >
                {category}
              </Text>
            </SwiperSlide>
          );
        })}
      </Swiper> */}

      <Box className='px-4 py-6'>
        {page && page.posts.length > 0 ? (
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

        <Pagination />
      </Box>
    </Box>
  );
}
