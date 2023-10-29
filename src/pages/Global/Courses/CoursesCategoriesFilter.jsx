import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

export default function CoursesCategoriesFilter({ path, user }) {
  const [categories, setCategories] = useState({
    selectedCategory:
      path === "all"
        ? "Todos"
        : path === "my-courses"
        ? "Meus Cursos"
        : path === "free"
        ? "Gratuitos"
        : path === "premium" && "Premium",
    categories: user
      ? ["Todos", "Meus Cursos", "Gratuitos", "Premium"]
      : ["Todos", "Gratuitos", "Premium"],
  });

  const navigate = useNavigate();

  const handleSelectCategory = (category) => {
    if (category === "Todos") {
      navigate("/courses/all");
    } else if (category === "Gratuitos") {
      navigate("/courses/free");
    } else if (category === "Premium") {
      navigate("/courses/premium");
    } else if (category === "Meus Cursos") {
      navigate("/courses/my-courses");
    }
    setCategories((prev) => ({ ...prev, selectedCategory: category }));
  };

  return (
    <Swiper
      spaceBetween={4}
      slidesPerView={4}
      className="pl-4 pt-5 lg:pt-8"
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
              className={`min-w-max max-w-max rounded-full border-[1px] px-[10px] py-[6px] text-center text-base leading-4 lg:mr-3 ${
                categories.selectedCategory === category
                  ? "border-primary-400 bg-primary-400 text-white"
                  : "border-gray-300/20 bg-white"
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
