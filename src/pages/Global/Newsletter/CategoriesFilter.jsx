import { useState } from "react";
import { useDispatch } from "react-redux";

import { selectCategory } from "../../../redux/modules/posts/actions";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CategoriesFilter() {
  const [categories, setCategories] = useState({
    selectedCategory: "Todos",
    categories: ["Todos", "Ações", "Dólar", "Fundos", "Investimentos"],
  });

  const dispatch = useDispatch();

  const handleSelectCategory = (category) => {
    if (category === "Todos") {
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
      className="pl-4 pt-5"
      freeMode={true}
    >
      {categories.categories?.map((category, index) => {
        return (
          <SwiperSlide
            key={index}
            className={`${
              index === categories.categories.length - 1 && "mr-10"
            } min-w-max max-w-max`}
          >
            <button
              onClick={() => handleSelectCategory(category)}
              className={`min-w-max max-w-max rounded-full border-[1px] px-4 py-2 text-center lg:mr-3 ${
                categories.selectedCategory === category
                  ? "border-primary-400 bg-primary-400 text-white"
                  : "border-gray-300/20 bg-white font-medium"
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
