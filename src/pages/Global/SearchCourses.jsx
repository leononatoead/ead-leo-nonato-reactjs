import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCourse } from "../../redux/modules/courses/actions";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import CourseCard from "../../components/Courses/CourseCard";
import SearchBar from "../../components/SearchBar";
import { Box, Text } from "@chakra-ui/react";

export default function SearchCourses() {
  const { id } = useParams();
  const { searchResults } = useSelector((state) => state.courses);

  const dispatch = useDispatch();

  useEffect(() => {
    const search = id
      .replace(/[áàãâä]/g, "a")
      .replace(/[éèêë]/g, "e")
      .replace(/[íìîï]/g, "i")
      .replace(/[óòõôö]/g, "o")
      .replace(/[úùûü]/g, "u")
      .replace(/ç/g, "c")
      .replace(/[^\w\s]/gi, "")
      .replace("-", " ");

    dispatch(searchCourse(search));
  }, [id]);

  return (
    <Box className="flex min-h-[100dvh] flex-col bg-gray-200">
      <Navbar title={"Pesquisa"} />

      <SearchBar type="course" />

      {searchResults && searchResults?.length > 0 ? (
        <ul className="flex flex-col gap-4 px-4 py-6">
          {searchResults?.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </ul>
      ) : (
        <Box className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-6">
          <Text>Nenhum curso encontrado.</Text>
        </Box>
      )}
    </Box>
  );
}
