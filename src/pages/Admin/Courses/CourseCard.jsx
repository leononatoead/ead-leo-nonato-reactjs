import { Link, useNavigate } from "react-router-dom";

import { Box, Heading, Image, Text, useToast } from "@chakra-ui/react";
import { IoMdEye } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { FaShareSquare } from "react-icons/fa";

export default function CourseCard({ cardData }) {
  const navigate = useNavigate();
  const toast = useToast();

  const handleEdit = () => {
    navigate(`/dashboard/courses/${cardData.id}`);
  };

  const handleView = (event) => {
    event.stopPropagation();
  };

  const handleCopy = (event, id) => {
    event.stopPropagation();
    const textArea = document.createElement("textarea");
    textArea.value = id;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    toast({
      description: "ID Copiado",
      status: "success",
      duration: "1500",
      isClosable: true,
    });
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
        {cardData.isPremium && (
          <Box className="flex items-center gap-4">
            <Text className="mb-1 flex w-max items-center justify-center rounded-full bg-green-200 px-2 text-small text-white">
              Premium
            </Text>
            <button
              className="flex w-max gap-1 text-gray-700"
              onClick={(e) => handleCopy(e, cardData.id)}
            >
              <FaShareSquare size={15} />
              <Text className="flex-1 text-justify text-xs font-normal leading-4">
                ID:
              </Text>
              <Text className="flex-1 text-justify text-xs font-normal leading-4">
                {cardData.id}
              </Text>
            </button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
