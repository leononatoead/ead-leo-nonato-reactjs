import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../../redux/modules/courses/actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFormat from "../../../hooks/useFormat";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import PremiumCourse from "../../../components/PremiumCourse";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Text,
  Box,
  Heading,
} from "@chakra-ui/react";

import background from "../../../assets/auth-background.png";
import { FaCircleCheck } from "react-icons/fa6";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { RiArrowDownSLine } from "react-icons/ri";
import LoginModal from "../../../components/LoginModal";

export default function Course() {
  const [course, setCourse] = useState();
  const [showDescription, setShowDescription] = useState(false);
  const [locked, setLocked] = useState(null);
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);
  const verifyPurchase = user?.purchased?.find(
    (purchasedId) => purchasedId === id,
  );

  const checkIfSectionHasVideo = [
    ...new Set(course?.videos?.map((video) => video.section)),
  ];

  const userCourses = user?.courses;
  const userCourseData = userCourses?.find((course) => course.id === id);

  const { getFirstElement } = useFormat();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWatch = () => {
    const section = getFirstElement(course?.sections);
    const sectionVideos = course?.videos?.filter(
      (video) => video.section === section.sectionName,
    );

    const firstVideo = getFirstElement(sectionVideos);

    navigate(`/course/${id}/${firstVideo.id}`);
  };

  useEffect(() => {
    if (courses?.length > 0) {
      const findCourse = courses?.find((course) => course.id === id);

      if (!findCourse?.videos) {
        dispatch(fetchVideos(id));
      }

      setCourse(findCourse);

      if (!user) {
        setLocked(true);
      }

      if (
        user &&
        !verifyPurchase &&
        course?.isPremium &&
        course?.needForm &&
        !user.admin
      ) {
        navigate("/");
      }

      if (!user && course?.isPremium && course?.needForm) {
        navigate("/");
      }

      if (user && course?.isPremium) {
        if (!verifyPurchase && !user.admin) {
          setLocked(true);
        }
      }
    }
  }, [courses, course]);

  return (
    <Box className="flex min-h-[100dvh] flex-col bg-gray-200 pb-6  lg:pb-14">
      <Navbar title="Curso" />

      <Box className="!h-[118px] overflow-hidden rounded-b-2xl">
        <Image
          src={background}
          alt="logo"
          className="!h-[118px] w-full !object-cover"
        />
      </Box>

      <Box
        px={6}
        pb={4}
        mt={"-51px"}
        className="flex flex-col items-center justify-center"
      >
        <Image
          src={course?.imagePath}
          alt={course?.name}
          w={96}
          h={160}
          className="!h-24 !w-40 rounded-md object-cover"
        ></Image>
        <Box className="flex items-center gap-2" mb={8} mt={6}>
          <Heading className="!font-poppins !text-large !font-bold !leading-6 lg:!text-[24px] lg:!leading-6">
            {course?.name}
          </Heading>
          <RiArrowDownSLine
            size={24}
            className={`${showDescription ? "rotate-180" : ""}`}
            onClick={() => setShowDescription((prev) => !prev)}
          />
        </Box>
        {showDescription && (
          <Text
            mb={6}
            className="lg:leading:5 text-small leading-4 text-gray-950 lg:text-base"
          >
            {course?.description}
          </Text>
        )}
        <span
          onClick={handleWatch}
          className="w-full cursor-pointer rounded-[4px] bg-primary-400 px-3 py-[5px] text-center text-base leading-5 text-white lg:w-80"
        >
          Assistir
        </span>
      </Box>

      <Box className="!flex-grow bg-white p-4 lg:mx-auto lg:!w-[768px] lg:rounded-md  ">
        <Heading className="!font-poppins !text-normal !font-medium !leading-6">
          Módulos
        </Heading>

        <Accordion allowToggle className="w-full">
          {course &&
            course?.sections
              ?.slice()
              .sort((a, b) => a.order - b.order)
              .map((section, i) => {
                const verify = checkIfSectionHasVideo.find(
                  (sct) => sct === section.sectionName,
                );

                if (verify) {
                  return (
                    <AccordionItem
                      key={i}
                      className="!border-b-[1px] !border-t-0 !border-gray-200 "
                    >
                      <AccordionButton
                        px={0}
                        py={4}
                        className="hover:!bg-white"
                      >
                        <Box as="span" flex="1" textAlign="left">
                          <Text className="!text-base !font-medium !leading-5">
                            {section.sectionName}
                          </Text>

                          {userCourseData && (
                            <Text className="text-small leading-4 text-gray-800">
                              {userCourseData?.videos?.filter(
                                (v) =>
                                  v.concluded &&
                                  v.section === section.sectionName,
                              ).length ===
                              course?.videos?.filter(
                                (v) => v.section === section.sectionName,
                              ).length ? (
                                "Concluído"
                              ) : (
                                <>
                                  {
                                    userCourseData?.videos?.filter(
                                      (v) =>
                                        v.concluded &&
                                        v.section === section.sectionName,
                                    ).length
                                  }{" "}
                                  /{" "}
                                  {
                                    course?.videos?.filter(
                                      (v) => v.section === section.sectionName,
                                    ).length
                                  }{" "}
                                  aulas concluídas
                                </>
                              )}
                            </Text>
                          )}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel pb={4} className="flex flex-col gap-6 ">
                        {course?.videos
                          ?.slice()
                          .sort((a, b) => a.order - b.order)
                          .map((video) => {
                            if (video.section === section.sectionName) {
                              return (
                                <Link
                                  to={`/course/${id}/${video.id}`}
                                  key={video.id}
                                  className="flex items-center justify-start gap-2 "
                                >
                                  {userCourseData && (
                                    <>
                                      {userCourseData?.videos?.find(
                                        (v) => v.id === video.id && v.concluded,
                                      ) ? (
                                        <FaCircleCheck
                                          size={15}
                                          className="text-green-200"
                                        />
                                      ) : (
                                        <AiOutlinePlayCircle size={16} />
                                      )}
                                    </>
                                  )}
                                  <Text className="text-small font-semibold leading-4">
                                    {video.title}
                                  </Text>
                                </Link>
                              );
                            }
                          })}
                      </AccordionPanel>
                    </AccordionItem>
                  );
                }
              })}
        </Accordion>
      </Box>
      {/* 
      <Box className="hidden lg:block">
        <Footer />
      </Box> */}

      {course?.isPremium ? (
        <PremiumCourse open={locked} close={setLocked} courseData={course} />
      ) : (
        <LoginModal
          openLoginModal={locked}
          setOpenLoginModal={setLocked}
          locked={locked}
        />
      )}
    </Box>
  );
}
