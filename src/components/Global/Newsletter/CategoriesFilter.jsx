import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import { selectCategory } from '../../../redux/modules/posts/actions';

export default function CategoriesFilter() {
  const [categories, setCategories] = useState({
    selectedCategory: 'Todos',
    categories: ['Todos', 'Ações', 'Dólar', 'Fundos', 'Investimentos'],
  });

  const dispatch = useDispatch();

  const handleSelectCategory = (category) => {
    if (category === 'Todos') {
      dispatch(selectCategory(null));
    } else {
      dispatch(selectCategory(category));
    }
    setCategories((prev) => ({ ...prev, selectedCategory: category }));
  };

  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={3}
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
              className={`max-w-max min-w-max px-4 py-2 rounded-full text-center border-[1px] ${
                categories.selectedCategory === category
                  ? 'bg-primary-400 border-primary-400 text-white'
                  : 'bg-white border-gray-300/20 font-medium'
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
