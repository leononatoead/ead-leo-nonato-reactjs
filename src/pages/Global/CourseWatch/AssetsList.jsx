import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import {
  AiOutlineDownload,
  AiOutlineFileExcel,
  AiOutlineFilePdf,
  AiOutlineFileWord,
} from 'react-icons/ai';
import { MdLink } from 'react-icons/md';
import { RiCloseFill } from 'react-icons/ri';
import { VscLinkExternal } from 'react-icons/vsc';

export default function AssetsList({ assetList, videoPlayer, setVideoPlayer }) {
  const handleCloseList = () => {
    setVideoPlayer((prev) => ({
      ...prev,
      showVideoList: false,
      showAssetsList: false,
      showQuestionsList: false,
    }));
  };

  return (
    <Box
      className={`w-full bottom-0 bg-white ${
        videoPlayer.showAssetsList && 'flex-grow'
      }`}
    >
      <Box className='p-4 pb-2 flex justify-between items-center'>
        <Text className='text-normal font-medium leading-6 font-poppins'>
          Materiais
        </Text>
        <button onClick={handleCloseList}>
          <RiCloseFill alt='close' size={20} />
        </button>
      </Box>
      {assetList.map((asset, index) => (
        <Box key={index} className='px-4'>
          {asset.fileURL.includes('.xls') ? (
            <Box className='flex items-center justify-between text-gray-950 py-2 border-b-[1px] border-gray-250 h-[60px]'>
              <Box className='flex items-center gap-2'>
                <AiOutlineFileExcel size={20} />

                <Text className='text-base font-medium leading-5'>
                  {asset.fileName}
                </Text>
              </Box>
              <a href={asset.fileURL} className='cursor-pointer'>
                <AiOutlineDownload size={20} />
              </a>
            </Box>
          ) : asset.fileURL.includes('.pdf') ? (
            <Box className='flex items-center justify-between text-gray-950 py-2 border-b-[1px] border-gray-250 h-[60px]'>
              <Box className='flex items-center gap-2'>
                <AiOutlineFilePdf size={20} />

                <Text className='text-base font-medium leading-5'>
                  {asset.fileName}
                </Text>
              </Box>
              <a href={asset.fileURL} className='cursor-pointer'>
                <AiOutlineDownload size={20} />
              </a>
            </Box>
          ) : asset.fileURL.includes('.doc') ? (
            <Box className='flex items-center justify-between text-gray-950 py-2 border-b-[1px] border-gray-250 h-[60px]'>
              <Box className='flex items-center gap-2'>
                <AiOutlineFileWord size={20} />
                <Text className='text-base font-medium leading-5'>
                  {asset.fileName}
                </Text>
              </Box>
              <a href={asset.fileURL} className='cursor-pointer'>
                <AiOutlineDownload size={20} />
              </a>
            </Box>
          ) : (
            <Box className='flex items-center justify-between text-gray-950 py-2 border-b-[1px] border-gray-250 h-[60px]'>
              <Box className='flex items-center gap-2'>
                <MdLink size={20} />
                <Text className='text-base font-medium leading-5'>
                  {asset.fileName}
                </Text>
              </Box>
              <a
                href={asset.fileURL}
                className='cursor-pointer'
                target='_blank'
              >
                <VscLinkExternal size={15} className='mr-1' />
              </a>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
