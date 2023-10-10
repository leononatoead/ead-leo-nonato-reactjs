import { Box, Text } from '@chakra-ui/react';
import { AiOutlineFileText, AiOutlineStar } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';

export default function VideoContent({ videoData, setVideoData }) {
  const handleSelectMaterials = () => {
    setVideoData((prev) => ({
      ...prev,
      showVideoList: false,
      showAssetsList: true,
    }));
  };

  return (
    <Box className='pt-2 '>
      <Box className='px-4 flex flex-col gap-[6px]'>
        <Text className='text-small leading-4'>{videoData.description}</Text>
        <Text className='text-base leading-5 font-bold'>{videoData.title}</Text>
      </Box>

      <Box className='flex items-center justify-center pt-[18px] pb-6 px-[22px] gap-[12px] border-b-[1px] border-b-gray-250'>
        <button
          onClick={handleSelectMaterials}
          className='rounded-md px-3 py-2 w-[97px] h-[60px] border-[1px] border-gray-250 flex flex-col items-center justify-center gap-1'
        >
          <AiOutlineFileText className='text-gray-950 ' size={20} />
          <Text className='text-small text-gray-950 leading-4'>Materiais</Text>
        </button>
        <button className='rounded-md px-3 py-2 w-[97px] h-[60px] border-[1px] border-gray-250 flex flex-col items-center justify-center gap-1'>
          <AiOutlineStar className='text-gray-950' size={20} />
          <Text className='text-small text-gray-950 leading-4'>Avaliar</Text>
        </button>
        <button className='rounded-md px-3 py-2 w-[97px] h-[60px] border-[1px] border-gray-250 flex flex-col items-center justify-center gap-1'>
          <BsCheck2Circle className='text-gray-950' size={20} />
          <Text className='text-small text-gray-950 leading-4'>Concluir</Text>
        </button>
      </Box>
    </Box>
  );
}