import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

import { BiTrash } from "react-icons/bi";

export default function AssetsList({ videoData, setVideoData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteAsset = (index) => {
    const filter = videoData.assets.assetsList.filter(
      (asset, i) => i !== index,
    );

    setVideoData((prev) => ({
      ...prev,
      assets: { ...prev.assets, assetsList: filter },
    }));
  };

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="mt-2 w-[50%] rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
      >
        Ver inclusos
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="!max-w-[95%] self-center">
          <ModalHeader className="!flex !items-center">
            <Text className="-mt-2 !font-poppins text-primary-600">
              Material Complementar
            </Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody p={4}>
            <Flex
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              gap={2}
            >
              {videoData.assets.assetsList.length > 0 ? (
                videoData.assets.assetsList.map((asset, index) => (
                  <Box
                    key={index}
                    className="flex w-full items-center justify-between gap-4"
                  >
                    <Box>{asset.fileName}</Box>
                    <Box className="flex items-center gap-2">
                      <button onClick={() => handleDeleteAsset(index)}>
                        <BiTrash size={18} className="text-red-500" />
                      </button>
                    </Box>
                  </Box>
                ))
              ) : (
                <Text className="p-2">Nenhum material cadastrado.</Text>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
