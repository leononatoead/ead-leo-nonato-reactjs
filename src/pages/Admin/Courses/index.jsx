import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CourseCard from "./CourseCard";
import { Box } from "@chakra-ui/react";
import { MdAddCircleOutline } from "react-icons/md";

export default function Courses() {
  const { courses } = useSelector((state) => state.courses);

  return (
    <Box className="main-container">
      <Box className="flex w-full justify-end">
        <Link to="/dashboard/courses/new" className="add-btn">
          <MdAddCircleOutline size={20} />{" "}
          <span className="font-bold"> Novo curso</span>
        </Link>
      </Box>

      {courses && (
        <ul className="flex flex-grow flex-col gap-4 pt-6">
          {courses?.map((course) => (
            <CourseCard cardData={course} key={course.id} />
          ))}
        </ul>
      )}
    </Box>
  );
}
