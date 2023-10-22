import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../../redux/modules/courses/actions";
import { useLocation } from "react-router-dom";
import useCourse from "../../../hooks/useCourse";

import Navbar from "../../../components/Global/Navbar";
import VideoList from "./VideoList";
import VideoPlayer from "./VideoPlayer";
import PremiumCourse from "../../../components/Global/PremiumCourse";
import VideoContent from "./VideoContent";
import AssetsList from "./AssetsList";
import Quiz from "./Quiz";
import { Box } from "@chakra-ui/react";

export default function CourseWatch() {
  const { pathname } = useLocation();
  const pathParams = pathname.split("/");
  const id = pathParams[2];
  const videoId = pathParams[3];

  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);
  const course = courses?.find((course) => course.id === id);

  const { addCourseToUser, addCourseVideosToUser } = useCourse();

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

    if (user && user.courses && videoSection) {
      const selectedCourse = user.courses?.find((c) => c.id === course.id);
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

    if (user && videoPlayer.active?.isPremium) {
      const purchased = user.purchased?.find((ref) => ref === course.courseRef);
      if (!purchased) {
        setLocked(true);
      }

      // if (user && !user?.courses && course?.isPremium) {
      //   //TODO: add course to user if he payed
      //   if (purchased) {
      //     const courseData = {
      //       id: course?.id,
      //       videos: [],
      //     };
      //   }
    }
  }, [courses, user, videoId]);

  return (
    <main className="flex min-h-[100dvh] flex-col bg-[#F3F3F3]">
      <Navbar title={videoPlayer?.sectionName} />
      {videoPlayer?.videoList?.length === 0 ? (
        <h1>Nenhuma aula.</h1>
      ) : (
        <div className="flex flex-1 flex-col justify-between">
          <Box>
            {videoPlayer?.active?.videoPath?.includes("firebasestorage") && (
              <VideoPlayer
                video={videoPlayer?.active}
                size={videoPlayer?.playerSize}
                setVideoPlayer={setVideoPlayer}
              />
            )}

            {videoPlayer?.active?.videoPath?.includes("youtube") && (
              <Box className="flex min-h-[246px] flex-col items-start justify-between  p-4">
                <iframe
                  className="max-h-[80vh] min-h-[246px] w-full rounded-lg md:min-h-[400px]"
                  src={videoPlayer.active.videoPath}
                  title={videoPlayer.active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </Box>
            )}

            {videoPlayer?.active?.videoFrame && (
              <Box className="flex min-h-[246px] flex-col items-start justify-between p-4">
                <iframe
                  className="max-h-[80vh] min-h-[246px] w-full rounded-lg md:min-h-[400px]"
                  id={videoPlayer?.active?.videoFrame?.id}
                  src={videoPlayer?.active?.videoFrame?.src}
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                  allowFullScreen={true}
                ></iframe>
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

          {!videoPlayer.showAssetsList && !videoPlayer.showQuestionsList && (
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
            <Quiz videoPlayer={videoPlayer} setVideoPlayer={setVideoPlayer} />
          )}
        </div>
      )}
      <PremiumCourse
        open={locked}
        close={setLocked}
        title={"Conteúdo disponível para assinantes"}
        text={"Tenha acesso total a este curso assinando a plataforma"}
        btnText={"Assine já"}
        closeBtn={false}
      />
    </main>
  );
}
