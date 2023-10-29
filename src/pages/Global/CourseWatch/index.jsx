import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../../redux/modules/courses/actions";
import { fetchBannerSettings } from "../../../redux/modules/settings/actions";
import useUserData from "../../../hooks/useUserData";
import { useLocation } from "react-router-dom";

import Navbar from "../../../components/Navbar";
import VideoPlayer from "./VideoPlayer";
import VideoIframe from "./VideoIframe";
import VideoList from "./VideoList";
import VideoContent from "./VideoContent";
import AssetsList from "./AssetsList";
import Banner from "./Banner";
import Quiz from "./Quiz";
import PremiumCourse from "../../../components/PremiumCourse";
import Footer from "../../../components/Footer";
import { Box } from "@chakra-ui/react";

export default function CourseWatch() {
  const { pathname } = useLocation();
  const pathParams = pathname.split("/");
  const id = pathParams[2];
  const videoId = pathParams[3];

  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);
  const { banners } = useSelector((state) => state.settings);
  const course = courses?.find((course) => course.id === id);

  const { addCourseToUser, addCourseVideosToUser } = useUserData();

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

  const [locked, setLocked] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!course?.videos) {
      dispatch(fetchVideos(id));
    }

    if (!banners) {
      dispatch(fetchBannerSettings());
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
      setLocked(true);
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
        const checkIfCourseAlreadyInArray = user.courses.find(
          (c) => c.id === course.id,
        );

        if (!checkIfCourseAlreadyInArray) {
          addCourseToUser(user.uid, courseData, user.courses);
        }
      }
    }

    const selectedCourse = user.courses?.find((c) => c.id === course.id);
    if (user && user.courses && videoSection && selectedCourse) {
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

        const updatedCourse = user.courses.map((c) => {
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

  //TODO: ANUNCIOS NOS VIDEOS

  return (
    <Box className="bg-gray-200 lg:flex lg:flex-col lg:justify-between lg:pb-6">
      <Box className="flex min-h-[100dvh] flex-col bg-gray-200 lg:min-h-[calc(100vh-78px)]">
        <Navbar title={videoPlayer?.sectionName} />
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
                  <Box className="flex items-start justify-center">
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
                    <Box className="flex max-w-[390px] flex-col gap-1">
                      <Banner data={banners && banners[0]} />
                      <Banner data={banners && banners[1]} />
                    </Box>
                  </Box>
                </Box>
              </Box>
              {/* <AssetsList
                  assetList={videoPlayer.active.assetsList}
                  videoPlayer={videoPlayer}
                  setVideoPlayer={setVideoPlayer}
                /> */}
              {/* <Quiz videoPlayer={videoPlayer} setVideoPlayer={setVideoPlayer} /> */}
            </Box>
          </>
        )}
      </Box>
      <Box className="hidden lg:block">
        <Footer />
      </Box>
      <PremiumCourse
        open={locked}
        close={setLocked}
        title={"Conteúdo disponível para assinantes"}
        text={"Tenha acesso total a este curso assinando a plataforma"}
        btnText={"Assine já"}
        closeBtn={false}
      />
    </Box>
  );
}
