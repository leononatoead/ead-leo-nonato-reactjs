import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../redux/modules/posts/actions';

import Navbar from '../../../components/Global/Navbar';
import { Box, Text } from '@chakra-ui/react';
import PostCard from '../../../components/Global/PostCard';
import Pagination from '../../../components/Global/Pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Newsletter() {
  const { pages, currentPage } = useSelector((state) => state.posts);
  // const page = pages?.find((page) => page.page === currentPage);

  const dispatch = useDispatch();
  const [categories, setCategories] = useState({
    selectedCategory: 'Todos',
    categories: ['Todos', 'Ações', 'Dólar', 'Fundos', 'Investimentos'],
    page: null,
  });

  const handleSelectCategory = (category) => {
    setCategories((prev) => ({ ...prev, selectedCategory: category }));
  };

  useEffect(() => {
    if (pages) {
      setCategories((prev) => ({
        ...prev,
        page: pages?.find((page) => page.page === currentPage),
      }));
    }
  }, [pages]);

  useEffect(() => {
    if (!pages) {
      dispatch(fetchPosts());
    }
  }, []);

  if (!categories.page) {
    return <div>Loading...</div>;
  } else
    return (
      <Box className='min-h-screen bg-gray-200'>
        <Navbar title='Newsletter' />
        {/* TODO: SEARCHBAR DE POSTS */}

        {/* TODO: SLIDER DE CATEGORIAS */}
        <Swiper
          spaceBetween={4}
          slidesPerView={3.5}
          className='pl-4 pt-5'
          freeMode={true}
        >
          {categories.categories?.map((category, index) => {
            return (
              <SwiperSlide
                key={index}
                className={`${
                  index === categories.categories.length - 1 && 'mr-10'
                } w-max`}
              >
                <button
                  onClick={() => handleSelectCategory(category)}
                  className={`w-max px-4 py-2 rounded-full text-center border-[1px] ${
                    categories.selectedCategory === category
                      ? 'bg-primary-400 border-primary-400 text-white'
                      : 'bg-white border-gray-100 font-medium'
                  }`}
                >
                  {category}
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Box className='px-4 py-6'>
          {categories.page && categories.page.posts.length > 0 ? (
            <ul className='flex flex-col gap-4 flex-grow'>
              {categories.page.posts?.map((post) => (
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
