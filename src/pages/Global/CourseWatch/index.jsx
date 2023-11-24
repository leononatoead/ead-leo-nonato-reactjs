import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../../redux/modules/courses/actions";
import useUserData from "../../../hooks/useUserData";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../../components/Navbar";
import VideoPlayer from "./VideoPlayer";
import VideoIframe from "./VideoIframe";
import VideoList from "./VideoList";
import VideoContent from "./VideoContent";
import AssetsList from "./AssetsList";
import Quiz from "./Quiz";
import Footer from "../../../components/Footer";
import { Box, Image, Text, useMediaQuery } from "@chakra-ui/react";
import background from "../../../assets/auth-background.png";

export default function CourseWatch() {
  const { pathname } = useLocation();
  const pathParams = pathname.split("/");
  const id = pathParams[2];
  const videoId = pathParams[3];

  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);
  const course = courses?.find((course) => course.id === id);
  const verifyPurchase = user?.purchased?.find(
    (purchasedId) => purchasedId === id,
  );

  const [isLargerThanLg] = useMediaQuery("(min-width: 1024px)");

  const { addCourseToUser, addCourseVideosToUser } = useUserData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [locked, setLocked] = useState(null);
  const [videoPlayer, setVideoPlayer] = useState({
    active: {},
    videoList: [],
    sectionName: "",
    playerSize: "full",
    isLocked: false,
    timeLeft: 30,
    showVideoList: false,
    showAssetsList: false,
    showQuestionsList: false,
  });

  useEffect(() => {
    if (!course?.videos) {
      dispatch(fetchVideos(id));
    }

    const video = course?.videos?.find((video) => video.id === videoId);

    const videoList = course?.sections
      ?.slice()
      .sort((a, b) => a.order - b.order)
      .map((section) => {
        return {
          section: section.sectionName,
          videos: course?.videos
            ?.slice()
            .sort((a, b) => a.order - b.order)
            .filter((video) => video.section === section.sectionName),
        };
      });

    const allVideos = [];
    videoList?.map((section) =>
      section.videos?.forEach((video) => {
        allVideos.push(video);
      }),
    );

    if (video) {
      setVideoPlayer((prev) => ({
        ...prev,
        active: video,
        sectionName: video.section,
        videoList,
        allVideos,
      }));
    }
  }, [courses]);

  useEffect(() => {
    if (!user) {
      navigate("/");
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

    if (!course) {
      return;
    }

    const videoSection = course?.videos?.find(
      (video) => video.id === videoId,
    ).section;

    if (user && !course?.isPremium) {
      const courseData = {
        id: course?.id,
        videos: [],
      };

      if (!user.courses) {
        addCourseToUser(user.uid, courseData);
      } else if (user?.courses) {
        const checkIfCourseAlreadyInArray = user?.courses?.find(
          (c) => c.id === course.id,
        );

        if (!checkIfCourseAlreadyInArray) {
          addCourseToUser(user.uid, courseData, user.courses);
        }
      }
    }

    const selectedCourse = user?.courses?.find((c) => c.id === course.id);
    if (user && user?.courses && videoSection && selectedCourse) {
      const video = selectedCourse?.videos?.find(
        (video) => video.id === videoId,
      );

      if (!video) {
        const videoData = {
          id: videoId,
          rating: null,
          concluded: false,
          section: videoSection,
        };

        const updatedCourse = user?.courses?.map((c) => {
          if (c.id === course.id) {
            let update = { ...c, videos: [...c.videos, videoData] };
            return update;
          } else {
            return c;
          }
        });

        addCourseVideosToUser(user.uid, updatedCourse);
      }
    }
  }, [courses, user, videoId]);

  return (
    <Box className="bg-gray-200 lg:flex lg:flex-col lg:justify-between lg:pb-14">
      <Box className="flex min-h-[100dvh] flex-col bg-gray-200 lg:min-h-[calc(100vh-78px)]">
        <Navbar title={videoPlayer?.sectionName} />
        <Image
          src={background}
          alt="background"
          className="hidden h-[120px] w-full rounded-bl-[16px] rounded-br-[16px] object-cover lg:block"
        />
        {videoPlayer?.videoList?.length === 0 ? (
          <Box className="flex min-h-[calc(100vh-100px)] items-center justify-center">
            <div className="video-page-loading">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </Box>
        ) : (
          <>
            <Box className="flex flex-1 flex-col justify-between lg:hidden">
              <Box>
                {videoPlayer?.active?.videoPath?.includes("firebasestorage") ? (
                  <VideoPlayer
                    video={videoPlayer?.active}
                    size={videoPlayer?.playerSize}
                    setVideoPlayer={setVideoPlayer}
                  />
                ) : (
                  <VideoIframe videoPlayer={videoPlayer} />
                )}
                {videoPlayer?.active?.advertisementList && (
                  <Box className="mb-4 w-full px-4">
                    <Image
                      src={
                        videoPlayer.active.advertisementList[0]
                          .advertisementImage
                      }
                      className="max-h-[80px] min-h-[80px] w-full rounded-md object-cover"
                    />
                  </Box>
                )}

                {!videoPlayer.showVideoList &&
                  !videoPlayer.showAssetsList &&
                  !videoPlayer.showQuestionsList && (
                    <VideoContent
                      videoData={videoPlayer?.active}
                      setVideoData={setVideoPlayer}
                      courseId={id}
                      videoId={videoId}
                    />
                  )}
              </Box>

              {!videoPlayer.showAssetsList &&
                !videoPlayer.showQuestionsList && (
                  <VideoList
                    videoPlayer={videoPlayer}
                    setVideoPlayer={setVideoPlayer}
                    user={user}
                    course={course}
                  />
                )}

              {videoPlayer?.showAssetsList && (
                <AssetsList
                  assetList={videoPlayer.active.assetsList}
                  videoPlayer={videoPlayer}
                  setVideoPlayer={setVideoPlayer}
                />
              )}

              {videoPlayer?.showQuestionsList && (
                <Quiz
                  videoPlayer={videoPlayer}
                  setVideoPlayer={setVideoPlayer}
                />
              )}
            </Box>
            <Box>
              <Box className="mx-auto mt-2 hidden max-w-7xl flex-1 flex-col justify-between lg:flex">
                <Box>
                  <Box className="flex items-start justify-between">
                    {isLargerThanLg && videoPlayer.showQuestionsList ? (
                      <Box className="m-4 w-full overflow-y-scroll rounded-lg bg-white p-4 lg:h-[420px]">
                        <Quiz
                          videoPlayer={videoPlayer}
                          setVideoPlayer={setVideoPlayer}
                        />
                      </Box>
                    ) : (
                      <Box className="w-full">
                        {videoPlayer?.active?.videoPath?.includes(
                          "firebasestorage",
                        ) ? (
                          <VideoPlayer
                            video={videoPlayer?.active}
                            size={videoPlayer?.playerSize}
                            setVideoPlayer={setVideoPlayer}
                          />
                        ) : (
                          <VideoIframe videoPlayer={videoPlayer} />
                        )}
                      </Box>
                    )}
                    <VideoList
                      videoPlayer={videoPlayer}
                      setVideoPlayer={setVideoPlayer}
                      user={user}
                      course={course}
                    />
                  </Box>

                  <Box className="flex items-start justify-center gap-8">
                    <Box className="flex-1">
                      <VideoContent
                        videoData={videoPlayer?.active}
                        setVideoData={setVideoPlayer}
                        courseId={id}
                        videoId={videoId}
                      />
                    </Box>
                    <Box className="flex w-full max-w-[390px] flex-col gap-1">
                      {videoPlayer?.active?.advertisementList && (
                        <Box className="w-full">
                          <Image
                            src={
                              videoPlayer.active.advertisementList[0]
                                .advertisementImage
                            }
                            className="max-h-[120px] min-h-[120px] w-full rounded-md object-cover"
                          />
                          <Text className="pt-2 font-poppins font-bold text-primary-400">
                            {
                              videoPlayer.active.advertisementList[0]
                                .advertisementName
                            }
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
      {/* <Box className="hidden lg:block">
        <Footer />
      </Box> */}
    </Box>
  );
}
