import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "../../../components/Navbar";
import CourseCard from "./CourseCard";
import CoursesCategoriesFilter from "./CoursesCategoriesFilter";
import SearchBar from "../../../components/SearchBar";
import Footer from "../../../components/Footer";
import { Box, Image } from "@chakra-ui/react";
import background from "../../../assets/auth-background.png";

export default function Courses() {
  const { id } = useParams();
  const { courses } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);

  return (
    <Box className="flex min-h-[100dvh] flex-col justify-between bg-gray-200 pb-6">
      <Box>
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

        <Box>
          <Image
            src={background}
            alt="background"
            className="hidden h-[120px] w-full rounded-bl-[16px] rounded-br-[16px] object-cover lg:block"
          />
        </Box>

        <Box className="lg:mx-auto lg:max-w-5xl">
          <Box className="flex w-full bg-white px-4 pb-[6px] lg:hidden">
            <SearchBar type="course" />
          </Box>

          <CoursesCategoriesFilter path={id} user={user} />

          {courses && (
            <ul className="flex flex-col gap-4 px-4 py-6">
              {id === "all" &&
                courses?.map((course) => (
                  <CourseCard course={course} key={course.id} />
                ))}

              {id === "free" &&
                courses?.map(
                  (course) =>
                    !course.isPremium &&
                    id === "free" && (
                      <CourseCard course={course} key={course.id} />
                    ),
                )}

              {id === "premium" &&
                courses?.map(
                  (course) =>
                    course.isPremium &&
                    id === "premium" && (
                      <CourseCard course={course} key={course.id} />
                    ),
                )}

              {id === "my-courses" && (
                <>
                  {courses?.map((course) => {
                    const verify = user?.courses?.find(
                      (c) => c.id === course.id,
                    );

                    if (verify) {
                      return <CourseCard course={course} key={course.id} />;
                    }
                  })}
                </>
              )}
            </ul>
          )}
        </Box>
      </Box>
      <Box className="hidden lg:block">
        <Footer />
      </Box>
    </Box>
  );
}
