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

export default function QuizList({ videoData, setVideoData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteQuestion = (index) => {
    const filter = videoData.quiz.questionsList.filter(
      (asset, i) => i !== index,
    );

    setVideoData((prev) => ({
      ...prev,
      quiz: { ...prev.quiz, questionsList: filter },
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
              Questionário
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
              {videoData.quiz.questionsList.length > 0 ? (
                videoData.quiz.questionsList.map((question, index) => (
                  <Box
                    className="mt-1 flex w-full items-center justify-between gap-4"
                    key={index}
                  >
                    <Box>{question.question}</Box>
                    <Box className="flex items-center gap-2">
                      <button onClick={() => handleDeleteQuestion(index)}>
                        <BiTrash size={18} className="text-red-500" />
                      </button>
                    </Box>
                  </Box>
                ))
              ) : (
                <Text className="p-2">Nenhuma questão cadastrada.</Text>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
