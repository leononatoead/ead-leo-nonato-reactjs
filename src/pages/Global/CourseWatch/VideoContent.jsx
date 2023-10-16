import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { AiOutlineFileText, AiOutlineStar } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { RiArrowDownSLine } from 'react-icons/ri';
import { MdFormatListNumbered } from 'react-icons/md';

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
    <Box className='pt-2 '>
      <Box className='px-4 flex flex-col gap-[6px]'>
        <Text className='text-small leading-4'>{videoData.section}</Text>
        <Box className='flex items-center justify-between'>
          <Text className='text-base leading-5 font-bold'>
            {videoData.title}
          </Text>
          <button onClick={handleOpenDescription}>
            <RiArrowDownSLine
              size={25}
              alt='view-description'
              className={` ${showDescription && 'rotate-180'}`}
            />
          </button>
        </Box>
        <Text
          className={`${
            !showDescription && 'hidden'
          } my-2 text-small leading-4`}
        >
          {videoData.description}
        </Text>
      </Box>

      <Box className='flex items-center justify-center pt-[18px] pb-6 px-[22px] gap-[12px] border-b-[1px] border-b-gray-250'>
        {videoData.assetsList.length > 0 && (
          <button
            onClick={handleSelectMaterials}
            className='rounded-md px-3 py-2 w-[97px] h-[60px] border-[1px] border-gray-250 bg-gray-250 flex flex-col items-center justify-center gap-1'
          >
            <AiOutlineFileText className='text-gray-950 ' size={20} />
            <Text className='text-small text-gray-950 leading-4'>
              Materiais
            </Text>
          </button>
        )}
        {videoData.questionsList.length > 0 && (
          <button
            onClick={handleSelectQuestions}
            className='rounded-md px-3 py-2 w-[97px] h-[60px] border-[1px] border-gray-250 bg-gray-250 flex flex-col items-center justify-center gap-1'
          >
            <MdFormatListNumbered className='text-gray-950 ' size={20} />
            <Text className='text-small text-gray-950 leading-4'>Questões</Text>
          </button>
        )}
        <button className='rounded-md px-3 py-2 w-[97px] h-[60px] border-[1px] border-gray-250 bg-gray-250 flex flex-col items-center justify-center gap-1'>
          <AiOutlineStar className='text-gray-950' size={20} />
          <Text className='text-small text-gray-950 leading-4'>Avaliar</Text>
        </button>
        <button className='rounded-md px-3 py-2 w-[97px] h-[60px] border-[1px] border-gray-250 bg-gray-250 flex flex-col items-center justify-center gap-1'>
          <BsCheck2Circle className='text-gray-950' size={20} />
          <Text className='text-small text-gray-950 leading-4'>Concluir</Text>
        </button>
      </Box>
    </Box>
  );
}
