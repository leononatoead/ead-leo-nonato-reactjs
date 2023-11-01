import { useState } from "react";
import { useSelector } from "react-redux";
import useUserData from "../../../../hooks/useUserData";
import { useLocation } from "react-router-dom";

import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import { RiSurveyLine } from "react-icons/ri";

export default function Survey({ videoData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userAnswer, setUserAnswer] = useState();

  const { pathname } = useLocation();
  const pathParams = pathname.split("/");
  const courseId = pathParams[2];
  const videoId = pathParams[3];

  const { user } = useSelector((state) => state.auth);
  const course = user?.courses?.find((course) => course.id === courseId);
  const video = course?.videos?.find((video) => video.id === videoId);

  const { changeSurveyAnswer } = useUserData();

  const handleSelectAnswer = (answer) => {
    setUserAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    const data = {
      ...video,
      surveyAnswer: {
        question: videoData?.survey?.question,
        answer: userAnswer,
      },
    };

    const updatedCourse = user?.courses?.map((c) => {
      if (c.id === courseId) {
        const videoList = c.videos.filter((v) => v.id !== video.id);
        const update = { ...c, videos: [...videoList, data] };
        return update;
      } else {
        return c;
      }
    });

    changeSurveyAnswer(user.uid, updatedCourse);
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="flex max-h-[60px] min-h-[60px] min-w-[77px] max-w-[77px] flex-col items-center justify-center gap-1 rounded-md border-[1px] border-gray-250 bg-gray-250 px-3 py-2 md:min-w-[97px] md:max-w-[97px] lg:max-h-max lg:min-h-max lg:max-w-max lg:flex-row lg:gap-2"
      >
        <RiSurveyLine size={20} />
        <Text className="text-small leading-4 text-gray-950">Enquete</Text>
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="!absolute !bottom-0 !m-0 !min-w-full !rounded-b-none !rounded-t-3xl !bg-gray-200 lg:!static lg:!min-w-[450px] lg:!max-w-[450px] lg:!self-center lg:!rounded-2xl lg:px-6"
          py={6}
        >
          <ModalHeader className="!flex !items-center !pb-0">
            <Text className="w-full text-start font-poppins text-large font-bold leading-6 text-primary-500">
              {videoData?.survey?.question}
            </Text>
            <ModalCloseButton className="text-gray-800" />
          </ModalHeader>
          <ModalBody px={4} py={2} pb={0}>
            <Text className="w-full text-start text-base font-medium leading-5">
              {videoData?.survey?.description}
            </Text>
            <Box className="flex w-full items-center justify-between px-2 py-4">
              <RadioGroup
                className="flex w-full flex-col gap-2"
                onChange={handleSelectAnswer}
              >
                {videoData?.survey?.firstAnswer && (
                  <Box className="flex w-full gap-4 border-l-[5px] border-l-gray-450 !bg-gray-150 px-5 py-2">
                    <Radio
                      value={`${videoData?.survey?.firstAnswer}`}
                      size="lg"
                      colorScheme="gray"
                      className="!border-[2px] !border-gray-450"
                    ></Radio>
                    <Text>{videoData?.survey?.firstAnswer}</Text>
                  </Box>
                )}
                {videoData?.survey?.secondAnswer && (
                  <Box className="flex w-full gap-4 border-l-[5px] border-l-gray-450 !bg-gray-150 px-5 py-2">
                    <Radio
                      value={`${videoData?.survey?.secondAnswer}`}
                      size="lg"
                      colorScheme="gray"
                      className="!border-[2px] !border-gray-450"
                    ></Radio>
                    <Text>{videoData?.survey?.secondAnswer}</Text>
                  </Box>
                )}
                {videoData?.survey?.thirdAnswer && (
                  <Box className="flex w-full gap-4 border-l-[5px] border-l-gray-450 !bg-gray-150 px-5 py-2">
                    <Radio
                      value={`${videoData?.survey?.thirdAnswer}`}
                      size="lg"
                      colorScheme="gray"
                      className="!border-[2px] !border-gray-450"
                    ></Radio>
                    <Text>{videoData?.survey?.thirdAnswer}</Text>
                  </Box>
                )}
                {videoData?.survey?.fourthAnswer && (
                  <Box className="flex w-full gap-4 border-l-[5px] border-l-gray-450 !bg-gray-150 px-5 py-2">
                    <Radio
                      value={`${videoData?.survey?.fourthAnswer}`}
                      size="lg"
                      colorScheme="gray"
                      className="!border-[2px] !border-gray-450"
                    ></Radio>
                    <Text>{videoData?.survey?.fourthAnswer}</Text>
                  </Box>
                )}
              </RadioGroup>
            </Box>
            <button
              onClick={handleSubmitAnswer}
              className="w-full rounded-sm bg-primary-400 py-[6px] text-base  leading-5 text-white disabled:bg-gray-700"
              disabled={!userAnswer}
            >
              Responder
            </button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
