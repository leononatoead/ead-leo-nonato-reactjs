import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

export default function CoursesCategoriesFilter({ path, user }) {
  const [categories, setCategories] = useState({
    selectedCategory:
      path === 'all'
        ? 'Todos'
        : path === 'my-courses'
        ? 'Meus Cursos'
        : path === 'free'
        ? 'Gratuitos'
        : path === 'premium' && 'Premium',
    categories: user
      ? ['Todos', 'Meus Cursos', 'Gratuitos', 'Premium']
      : ['Todos', 'Gratuitos', 'Premium'],
  });

  const navigate = useNavigate();

  const handleSelectCategory = (category) => {
    if (category === 'Todos') {
      navigate('/courses/all');
    } else if (category === 'Gratuitos') {
      navigate('/courses/free');
    } else if (category === 'Premium') {
      navigate('/courses/premium');
    } else if (category === 'Meus Cursos') {
      navigate('/courses/my-courses');
    }
    setCategories((prev) => ({ ...prev, selectedCategory: category }));
  };

  return (
    <Swiper
      spaceBetween={4}
      slidesPerView={4}
      className='pl-4 pt-5'
      freeMode={true}
    >
      {categories.categories?.map((category, index) => {
        return (
          <SwiperSlide
            key={index}
            className={`${
              index === categories.categories.length - 1 && 'mr-10'
            } max-w-max min-w-max`}
          >
            <button
              onClick={() => handleSelectCategory(category)}
              className={`max-w-max min-w-max px-[10px] py-[6px] rounded-full text-center border-[1px] leading-4 text-base ${
                categories.selectedCategory === category
                  ? 'bg-primary-400 border-primary-400 text-white'
                  : 'bg-white border-gray-300/20'
              }`}
            >
              {category}
            </button>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
