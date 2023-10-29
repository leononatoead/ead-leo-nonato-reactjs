import { useState } from "react";
import { useSelector } from "react-redux";
import useUserData from "../../../../hooks/useUserData";

import Rating from "./Rating";
import Survey from "./Survey";
import AssetsList from "../AssetsList";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { BsCheck2Circle } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdFormatListNumbered } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";

export default function VideoContent({
  videoData,
  setVideoData,
  courseId,
  videoId,
}) {
  const [showDescription, setShowDescription] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const course = user?.courses?.find((course) => course.id === courseId);
  const video = course?.videos?.find((video) => video.id === videoId);

  const { changeConcludedVideoState } = useUserData();

  const handleSelectMaterials = () => {
    setVideoData((prev) => ({
      ...prev,
      showVideoList: false,
      showQuestionsList: false,
      showAssetsList: true,
    }));
  };

  const handleSelectQuestions = () => {
    setVideoData((prev) => ({
      ...prev,
      showVideoList: false,
      showAssetsList: false,
      showQuestionsList: true,
    }));
  };

  const handleChangeConcludedState = () => {
    let videoData = {
      ...video,
    };

    if (video?.concluded) {
      videoData = { ...videoData, concluded: false };
    } else {
      videoData = { ...videoData, concluded: true };
    }

    const updatedCourse = user.courses.map((c) => {
      if (c.id === course.id) {
        const videoList = c.videos.filter((video) => video.id !== videoId);
        const update = { ...c, videos: [...videoList, videoData] };
        return update;
      } else {
        return c;
      }
    });

    changeConcludedVideoState(user?.uid, updatedCourse);
  };

  const handleOpenDescription = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <Box className="pt-2 lg:flex lg:flex-col">
      <Box>
        <Box className="flex flex-col gap-[6px] px-4">
          <Text className="text-small leading-4">{videoData?.section}</Text>
          <Box className="flex items-center justify-between">
            <Text className="text-base font-bold leading-5">
              {videoData?.title}
            </Text>
            <button onClick={handleOpenDescription}>
              <RiArrowDownSLine
                size={25}
                alt="view-description"
                className={` ${showDescription && "rotate-180"}  lg:hidden`}
              />
            </button>
          </Box>
          <Text
            className={`${
              !showDescription && "hidden"
            } my-2 text-small leading-4 lg:hidden`}
          >
            {videoData?.description}
          </Text>
        </Box>

        <Box className="flex items-center justify-start gap-[12px] !overflow-x-scroll border-b-[1px] border-b-gray-250 px-[22px] pb-6 pt-[18px] lg:border-none lg:p-4">
          {videoData?.assetsList?.length > 0 && (
            <button
              onClick={handleSelectMaterials}
              className="flex max-h-[60px] min-h-[60px] min-w-[77px] max-w-[77px] flex-col items-center justify-center gap-1 rounded-md border-[1px] border-gray-250 bg-gray-250 px-3 py-2 md:min-w-[97px] md:max-w-[97px] lg:hidden lg:max-h-max lg:min-h-max lg:max-w-max lg:flex-row lg:gap-2"
            >
              <AiOutlineFileText className="text-gray-950 " size={20} />
              <Text className="text-small leading-4 text-gray-950">
                Materiais
              </Text>
            </button>
          )}
          {videoData?.questionsList?.length > 0 && (
            <button
              onClick={handleSelectQuestions}
              className="flex max-h-[60px] min-h-[60px] min-w-[77px] max-w-[77px] flex-col items-center justify-center gap-1 rounded-md border-[1px] border-gray-250 bg-gray-250 px-3 py-2 md:min-w-[97px] md:max-w-[97px] lg:max-h-max lg:min-h-max lg:max-w-max lg:flex-row lg:gap-2"
            >
              <MdFormatListNumbered className="text-gray-950 " size={20} />
              <Text className="text-small leading-4 text-gray-950">
                Questões
              </Text>
            </button>
          )}

          <Rating
            courses={user?.courses}
            courseId={course?.id}
            video={video}
            userId={user?.uid}
          />

          <button
            onClick={handleChangeConcludedState}
            className="flex max-h-[60px] min-h-[60px] min-w-[77px] max-w-[77px] flex-col items-center justify-center gap-1 rounded-md border-[1px] border-gray-250 bg-gray-250 px-3 py-2 md:min-w-[97px] md:max-w-[97px] lg:max-h-max lg:min-h-max lg:max-w-max lg:flex-row lg:gap-2"
          >
            {video?.concluded ? (
              <>
                <BsCheck2Circle className="text-green-300" size={20} />

                <Text className="text-small leading-4 text-gray-950">
                  Concluído
                </Text>
              </>
            ) : (
              <>
                <BsCheck2Circle className="text-gray-950" size={20} />

                <Text className="text-small leading-4 text-gray-950">
                  Concluir
                </Text>
              </>
            )}
          </button>

          {videoData.survey && !video?.surveyAnswer && (
            <Survey videoData={videoData} />
          )}
        </Box>
      </Box>

      <Tabs className="ml-4 !hidden w-full rounded-lg bg-white p-4 lg:!block">
        <TabList>
          <Tab>Descrição</Tab>
          <Tab>Materiais</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{videoData?.description}</TabPanel>
          <TabPanel>
            <AssetsList
              assetList={videoData?.assetsList}
              videoPlayer={videoData}
              setVideoPlayer={setVideoData}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
