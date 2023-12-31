import { useLocation, useNavigate } from "react-router-dom";

import { RiArrowUpSLine } from "react-icons/ri";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import NextVideoIcon from "../../../assets/next-icon.svg";
import { FaCircleCheck } from "react-icons/fa6";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { useEffect } from "react";

export default function VideoList({
  user,
  course,
  videoPlayer,
  setVideoPlayer,
}) {
  const { pathname } = useLocation();
  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");

  const userCourses = user?.courses;
  const userCourseData = userCourses?.find(
    (course) => course.id === pathname.split("/")[2],
  );

  const checkIfSectionHasVideo = [
    ...new Set(course?.videos?.map((video) => video.section)),
  ];

  const navigate = useNavigate();

  const activeSectionName = videoPlayer.active.section;
  const activeSection = videoPlayer.videoList.find(
    (section) => section.section === activeSectionName,
  );

  const videoIndex = videoPlayer.allVideos.findIndex(
    (value) => value.id === videoPlayer.active.id,
  );

  const nextVideo = videoPlayer.allVideos[videoIndex + 1];

  const handleSelectVideo = (id) => {
    const newActive = videoPlayer.allVideos.find((video) => video.id === id);
    setVideoPlayer((prev) => ({
      ...prev,
      active: newActive,
      showQuestionsList: false,
    }));

    const path = pathname.split("/");

    navigate(`/course/${path[2]}/${id}`);
  };

  const handlePlayNext = () => {
    setVideoPlayer((prev) => ({
      ...prev,
      active: nextVideo,
      showQuestionsList: false,
    }));
    const path = pathname.split("/");

    navigate(`/course/${path[2]}/${nextVideo.id}`);
  };

  const handleOpenList = () => {
    setVideoPlayer((prev) => ({ ...prev, showVideoList: !prev.showVideoList }));
  };

  useEffect(() => {
    if (isLargerThanLg) {
      setVideoPlayer((prev) => ({ ...prev, showVideoList: true }));
    }
  }, [isLargerThanLg]);

  return (
    <Box
      className={`bottom-0 w-full bg-white lg:mt-4 lg:h-[500px] lg:max-w-[390px] lg:overflow-hidden lg:overflow-y-scroll lg:rounded-lg ${
        videoPlayer.showVideoList && "flex-grow"
      }`}
    >
      <Box className="flex h-[92px] items-center justify-between gap-11  bg-white px-4 py-8 lg:h-[46px] ">
        <Box>
          <Text className="text-[17px] font-semibold leading-[22px]">
            Reproduzindo{" "}
            {activeSection.videos.findIndex(
              (value) => value.id === videoPlayer.active.id,
            ) + 1}{" "}
            de {activeSection.videos.length}
          </Text>
          <Text className="text-small leading-4 text-gray-800 ">
            {nextVideo && `Próximo: ${nextVideo?.title}`}
          </Text>
        </Box>
        <Box className="flex gap-5 lg:hidden">
          {nextVideo && (
            <button onClick={handlePlayNext} className="w-6">
              <img src={NextVideoIcon} alt="next" className="!h-6 !w-6" />
            </button>
          )}
          <button onClick={handleOpenList}>
            <RiArrowUpSLine
              size={25}
              alt="view-all"
              className={` ${
                videoPlayer.showVideoList && "rotate-180"
              } text-gray-950`}
            />
          </button>
        </Box>
      </Box>
      <Accordion
        allowMultiple
        className={`flex flex-col gap-4 p-4 lg:pt-0 ${
          !videoPlayer.showVideoList && "hidden lg:flex"
        }`}
      >
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
                    <AccordionButton px={0} py={4} className="hover:!bg-white">
                      <Box as="span" flex="1" textAlign="left">
                        <Text
                          className={`!text-base !leading-5 ${
                            videoPlayer.active.section === section.sectionName
                              ? "font-bold"
                              : " font-medium"
                          }`}
                        >
                          {section.sectionName}
                        </Text>

                        {userCourseData && (
                          <Text className="text-small leading-4 text-gray-800">
                            {userCourseData?.videos.filter(
                              (v) =>
                                v.concluded &&
                                v.section === section.sectionName,
                            ).length ===
                            course?.videos.filter(
                              (v) => v.section === section.sectionName,
                            ).length ? (
                              "Concluído"
                            ) : (
                              <>
                                {
                                  userCourseData?.videos.filter(
                                    (v) =>
                                      v.concluded &&
                                      v.section === section.sectionName,
                                  ).length
                                }{" "}
                                /{" "}
                                {
                                  course?.videos.filter(
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
                              <button
                                onClick={() => handleSelectVideo(video.id)}
                                key={video.id}
                                className={`flex cursor-pointer items-center justify-start gap-2  ${
                                  videoPlayer.active?.id === video.id &&
                                  "font-bold"
                                }`}
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
                                <Text className=" text-small leading-4">
                                  {video.title}
                                </Text>
                              </button>
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
  );
}
