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

export default function SurveyList({ videoData, setVideoData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteSurvey = () => {
    setVideoData((prev) => ({
      ...prev,
      survey: { ...prev.survey, survey: null },
    }));
  };

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="mt-2 w-[50%] rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
      >
        Ver inclusas
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="!max-w-[95%] self-center">
          <ModalHeader className="!flex !items-center">
            <Text className="-mt-2 !font-poppins text-primary-600">
              Enquete
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
              {videoData.survey.survey && (
                <Box className="mt-1 flex w-full items-center justify-between gap-4">
                  <Box>{videoData.survey.survey.question}</Box>
                  <Box className="flex items-center gap-2">
                    <button onClick={handleDeleteSurvey}>
                      <BiTrash size={18} className="text-red-500" />
                    </button>
                  </Box>
                </Box>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
