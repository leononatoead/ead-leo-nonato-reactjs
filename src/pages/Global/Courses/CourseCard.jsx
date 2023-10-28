import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ShareBtn from "../../../components/ShareBtn";
import PremiumCourse from "../../../components/PremiumCourse";

import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { BiCartAdd, BiShareAlt } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";

export default function CourseCard({ course }) {
  const [openPremiumModal, setOpenPremiumModal] = useState(false);

  const url = `${import.meta.env.VITE_VERCEL_APP_URL}/course/${course.id}`;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/course/${course.id}`);
  };

  const handleShare = (event) => {
    event.stopPropagation();
  };

  return (
    <Box
      onClick={handleNavigate}
      className="flex h-32 w-full cursor-pointer items-center gap-3 rounded-lg bg-white p-3 shadow-md"
    >
      <Image
        src={course.imagePath}
        alt="thumbnail"
        w={"120px"}
        h={"104px"}
        className="rounded-sm object-cover"
      />
      <Box className="flex min-h-full w-full flex-col justify-start overflow-hidden">
        <Box className="flex-grow">
          <Heading className="break-title -mt-1 max-h-16 !font-poppins !text-base !font-semibold !leading-5 !text-primary-600">
            {course.name}
          </Heading>
          <Text className="break-title text-small text-gray-700 ">
            {course.description}
          </Text>
        </Box>
        <Box className="flex w-full items-center justify-between">
          <Box className="flex flex-1 items-center justify-end gap-2">
            {course.isPremium ? (
              <button onClick={() => setOpenPremiumModal(true)}>
                <BiCartAdd size={18} className="text-primary-600" />
              </button>
            ) : (
              <IoMdEye size={18} className="text-primary-600" />
            )}

            <Box onClick={handleShare}>
              <ShareBtn url={url} />
            </Box>
          </Box>
        </Box>
      </Box>

      <PremiumCourse
        open={openPremiumModal}
        close={setOpenPremiumModal}
        courseData={course}
        closeBtn={true}
      />
    </Box>
  );
}
