import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import CourseCard from "../../components/Courses/CourseCard";
import CoursesCategoriesFilter from "../../components/Courses/CoursesCategoriesFilter";
import SearchBar from "../../components/SearchBar";
import { Box } from "@chakra-ui/react";

export default function Courses() {
  const { id } = useParams();
  const { courses } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);

  return (
    <Box className="min-h-[100dvh] bg-gray-200">
      <Navbar
        title={
          id === "premium"
            ? "Cursos Pagos"
            : id === "free"
            ? "Cursos Gratuitos"
            : id === "my-courses"
            ? "Meus Cursos"
            : "Todos"
        }
      />
      <SearchBar type="course" />
      <CoursesCategoriesFilter path={id} user={user} />

      {courses && (
        <ul className="flex flex-col gap-4 px-4 py-6">
          {id === "all" &&
            courses.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}

          {id === "free" &&
            courses.map(
              (course) =>
                !course.isPremium &&
                id === "free" && <CourseCard course={course} key={course.id} />,
            )}

          {id === "premium" &&
            courses.map(
              (course) =>
                course.isPremium &&
                id === "premium" && (
                  <CourseCard course={course} key={course.id} />
                ),
            )}
          {/* TODO: VERFICAR CURSOS DO USUARIO */}
          {/* {id === 'my-courses' &&
            courses.map(
              (course) =>
                course.isPremium &&
                id === 'premium' && (
                  <CourseCard course={course} key={course.id} />
                ),
            )} */}
        </ul>
      )}
    </Box>
  );
}
