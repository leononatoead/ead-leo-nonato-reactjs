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
  Image,
} from "@chakra-ui/react";

import { BiTrash } from "react-icons/bi";

export default function AdvertisementList({ videoData, setVideoData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteAdvertisement = (index) => {
    const filter = videoData.advertisement.advertisementList.filter(
      (asset, i) => i !== index,
    );

    setVideoData((prev) => ({
      ...prev,
      advertisement: { ...prev.advertisement, advertisementList: filter },
    }));
  };

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="mt-2 w-[50%] rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
      >
        Ver anúncio
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="!max-w-[95%] self-center">
          <ModalHeader className="!flex !items-center">
            <Text className="-mt-2 !font-poppins text-primary-600">
              Anúncios
            </Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody p={4}>
            <Flex
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              gap={3}
            >
              {videoData.advertisement.advertisementList.length > 0 ? (
                videoData.advertisement.advertisementList.map(
                  (advertisement, index) => (
                    <Box key={index} className="w-full">
                      <Image
                        src={advertisement.advertisementImage}
                        className="max-h-[120px] w-full rounded-md object-cover"
                      />
                      <Box className="mt-1 flex w-full items-center justify-between gap-4">
                        <Box>{advertisement.advertisementName}</Box>
                        <Box className="flex items-center gap-2">
                          <button
                            onClick={() => handleDeleteAdvertisement(index)}
                          >
                            <BiTrash size={18} className="text-red-500" />
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  ),
                )
              ) : (
                <Text className="p-2">Nenhum anúncio cadastrado.</Text>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
