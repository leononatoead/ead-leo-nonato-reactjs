import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ShareBtn from "../../../components/ShareBtn";
import PremiumCourse from "../../../components/PremiumCourse";

import { Box, Heading, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { BiCartAdd } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import FormModal from "../../../components/FormModal";

export default function CourseCard({ course }) {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openPremiumModal, setOpenPremiumModal] = useState(false);
  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");

  const { user } = useSelector((state) => state.auth);

  const verifyPurchase = user?.purchased?.find((id) => id === course.id);

  const url = `${import.meta.env.VITE_VERCEL_APP_URL}/course/${course.id}`;

  const navigate = useNavigate();

  const handleClick = () => {
    !course?.isPremium
      ? handleNavigate()
      : user && course?.isPremium && user.admin
      ? handleNavigate()
      : course?.isPremium && verifyPurchase
      ? handleNavigate()
      : course?.isPremium && !verifyPurchase && course.needForm
      ? setOpenFormModal(true)
      : course?.isPremium && !verifyPurchase && setOpenPremiumModal(true);
  };

  const handleNavigate = () => {
    navigate(`/course/${course.id}`);
  };

  const handleShare = (event) => {
    event.stopPropagation();
  };

  return (
    <Box
      onClick={handleClick}
      className="flex h-28 w-full cursor-pointer items-center gap-3 rounded-lg bg-white p-2 shadow-md lg:h-[180px] lg:gap-4 lg:p-4"
    >
      <Image
        src={course.imagePath}
        alt="thumbnail"
        className="!h-24 !w-40 !min-w-[160px] !max-w-[160px] rounded-sm object-cover lg:!max-h-[156px] lg:!min-h-[144px] lg:!min-w-[240px] lg:!max-w-[240px]"
      />
      <Box className="flex !h-[104px] w-full flex-col justify-start lg:!h-[156px]">
        <Box className="flex-grow">
          <Heading className="break-title -mt-1 max-h-16 !font-poppins !text-base !font-semibold !leading-5 !text-primary-600 lg:!text-normal lg:!leading-5">
            {course.name}
          </Heading>
          <Text
            className={`${
              isLargerThanLg ? "break-description" : "break-title"
            } text-small text-gray-700 lg:text-base`}
          >
            {course.description}
          </Text>
        </Box>
        <Box className="flex w-full items-center justify-end gap-2 lg:justify-start lg:gap-3">
          <Text className="mr-3 hidden max-w-max rounded-xl bg-gray-200 px-3 py-[2px] text-base font-medium lg:block">
            {course.isPremium ? "Premium" : "Gratuito"}
          </Text>

          {course.isPremium ? (
            <button onClick={() => setOpenPremiumModal(true)}>
              <BiCartAdd
                size={isLargerThanLg ? 24 : 18}
                className="text-primary-600"
              />
            </button>
          ) : (
            <IoMdEye
              size={isLargerThanLg ? 24 : 18}
              className="text-primary-600"
            />
          )}

          <span className="flex items-center" onClick={handleShare}>
            <ShareBtn url={url} />
          </span>
        </Box>
      </Box>

      {course.isPremium && !course.formRef && (
        <PremiumCourse
          open={openPremiumModal}
          close={setOpenPremiumModal}
          courseData={course}
          closeBtn={true}
        />
      )}

      {course.formRef && (
        <FormModal
          open={openFormModal}
          close={setOpenFormModal}
          formId={course.formRef}
          courseId={course.id}
        />
      )}
    </Box>
  );
}
