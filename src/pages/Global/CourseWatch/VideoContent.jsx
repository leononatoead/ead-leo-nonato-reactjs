import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { AiOutlineFileText, AiOutlineStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdFormatListNumbered } from "react-icons/md";

export default function VideoContent({ videoData, setVideoData }) {
  const [showDescription, setShowDescription] = useState(false);

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

  const handleOpenDescription = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <Box className="pt-2 ">
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
              className={` ${showDescription && "rotate-180"}`}
            />
          </button>
        </Box>
        <Text
          className={`${
            !showDescription && "hidden"
          } my-2 text-small leading-4`}
        >
          {videoData?.description}
        </Text>
      </Box>

      <Box className="flex items-center justify-center gap-[12px] border-b-[1px] border-b-gray-250 px-[22px] pb-6 pt-[18px]">
        {videoData?.assetsList?.length > 0 && (
          <button
            onClick={handleSelectMaterials}
            className="flex max-h-[60px] min-h-[60px] min-w-[77px] max-w-[77px] flex-col items-center justify-center gap-1 rounded-md border-[1px] border-gray-250 bg-gray-250 px-3 py-2 md:min-w-[97px] md:max-w-[97px]"
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
            className="flex max-h-[60px] min-h-[60px] min-w-[77px] max-w-[77px] flex-col items-center justify-center gap-1 rounded-md border-[1px] border-gray-250 bg-gray-250 px-3 py-2 md:min-w-[97px] md:max-w-[97px]"
          >
            <MdFormatListNumbered className="text-gray-950 " size={20} />
            <Text className="text-small leading-4 text-gray-950">Questões</Text>
          </button>
        )}
        <button className="flex max-h-[60px] min-h-[60px] min-w-[77px] max-w-[77px] flex-col items-center justify-center gap-1 rounded-md border-[1px] border-gray-250 bg-gray-250 px-3 py-2 md:min-w-[97px] md:max-w-[97px]">
          <AiOutlineStar className="text-gray-950" size={20} />
          <Text className="text-small leading-4 text-gray-950">Avaliar</Text>
        </button>
        <button className="flex max-h-[60px] min-h-[60px] min-w-[77px] max-w-[77px] flex-col items-center justify-center gap-1 rounded-md border-[1px] border-gray-250 bg-gray-250 px-3 py-2 md:min-w-[97px] md:max-w-[97px]">
          <BsCheck2Circle className="text-gray-950" size={20} />
          <Text className="text-small leading-4 text-gray-950">Concluir</Text>
        </button>
      </Box>
    </Box>
  );
}
