import { Link, useNavigate } from "react-router-dom";

import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { IoMdEye } from "react-icons/io";
import { BiEdit } from "react-icons/bi";

export default function CourseCard({ cardData }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dashboard/courses/${cardData.id}`);
  };

  const handleView = (event) => {
    event.stopPropagation();
  };

  return (
    <Box
      onClick={handleEdit}
      className="flex h-32 w-full cursor-pointer items-center gap-3 rounded-lg bg-white p-3 shadow-md"
    >
      <Image
        src={cardData.imagePath}
        alt="thumbnail"
        className="h-[104px] min-w-[120px] max-w-[120px] rounded-sm object-cover"
      />
      <Box className="flex min-h-full w-full flex-col justify-start overflow-hidden">
        <Box className="flex-grow">
          <Heading className="break-title -mt-1 max-h-16 !font-poppins !text-base !font-semibold !leading-5 !text-primary-600">
            {cardData.name}
          </Heading>
          <Text className="break-title text-small text-gray-700 ">
            {cardData.description}
          </Text>
        </Box>
        <Box className="flex w-full items-center justify-between">
          <Box className="flex flex-1 items-center justify-end gap-2">
            <Box onClick={handleView}>
              <Link to={`/course/${cardData.id}`}>
                <IoMdEye size={18} className="text-primary-600" />
              </Link>
            </Box>
            <Link to={`/dashboard/courses/${cardData.id}`}>
              <BiEdit size={18} className="text-primary-600" />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
