import { Box, Text } from "@chakra-ui/react";
import React from "react";
import {
  AiOutlineDownload,
  AiOutlineFileExcel,
  AiOutlineFilePdf,
  AiOutlineFileWord,
  AiOutlineFileZip,
} from "react-icons/ai";
import { MdLink } from "react-icons/md";
import { RiCloseFill } from "react-icons/ri";
import { VscLinkExternal } from "react-icons/vsc";

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
      className={`bottom-0 w-full bg-white ${
        videoPlayer.showAssetsList && "flex-grow"
      }`}
    >
      <Box className="flex items-center justify-between p-4 pb-2">
        <Text className="font-poppins text-normal font-medium leading-6">
          Materiais
        </Text>
        <button onClick={handleCloseList}>
          <RiCloseFill alt="close" size={20} />
        </button>
      </Box>
      {assetList.map((asset, index) => (
        <Box key={index} className="px-4">
          {asset.fileURL.includes(".xls") ? (
            <Box className="flex h-[60px] items-center justify-between border-b-[1px] border-gray-250 py-2 text-gray-950">
              <Box className="flex items-center gap-2">
                <AiOutlineFileExcel size={20} />

                <Text className="text-base font-medium leading-5">
                  {asset.fileName}
                </Text>
              </Box>
              <a href={asset.fileURL} className="cursor-pointer">
                <AiOutlineDownload size={20} />
              </a>
            </Box>
          ) : asset.fileURL.includes(".zip") ||
            asset.fileURL.includes(".rar") ? (
            <Box className="flex h-[60px] items-center justify-between border-b-[1px] border-gray-250 py-2 text-gray-950">
              <Box className="flex items-center gap-2">
                <AiOutlineFileZip size={20} />

                <Text className="text-base font-medium leading-5">
                  {asset.fileName}
                </Text>
              </Box>
              <a href={asset.fileURL} className="cursor-pointer">
                <AiOutlineDownload size={20} />
              </a>
            </Box>
          ) : asset.fileURL.includes(".pdf") ? (
            <Box className="flex h-[60px] items-center justify-between border-b-[1px] border-gray-250 py-2 text-gray-950">
              <Box className="flex items-center gap-2">
                <AiOutlineFilePdf size={20} />

                <Text className="text-base font-medium leading-5">
                  {asset.fileName}
                </Text>
              </Box>
              <a href={asset.fileURL} className="cursor-pointer">
                <AiOutlineDownload size={20} />
              </a>
            </Box>
          ) : asset.fileURL.includes(".doc") ? (
            <Box className="flex h-[60px] items-center justify-between border-b-[1px] border-gray-250 py-2 text-gray-950">
              <Box className="flex items-center gap-2">
                <AiOutlineFileWord size={20} />
                <Text className="text-base font-medium leading-5">
                  {asset.fileName}
                </Text>
              </Box>
              <a href={asset.fileURL} className="cursor-pointer">
                <AiOutlineDownload size={20} />
              </a>
            </Box>
          ) : (
            <Box className="flex h-[60px] items-center justify-between border-b-[1px] border-gray-250 py-2 text-gray-950">
              <Box className="flex items-center gap-2">
                <MdLink size={20} />
                <Text className="text-base font-medium leading-5">
                  {asset.fileName}
                </Text>
              </Box>
              <a
                href={asset.fileURL}
                className="cursor-pointer"
                target="_blank"
              >
                <VscLinkExternal size={15} className="mr-1" />
              </a>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
