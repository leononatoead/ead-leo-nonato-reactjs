import useCourse from "../../../hooks/useCourse";

import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Flex,
} from "@chakra-ui/react";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function Rating({ courses, courseId, video, userId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { ratingVideo } = useCourse();

  const handleSelectRating = (rating) => {
    const videoData = { ...video, rating };

    const updatedCourse = courses.map((c) => {
      if (c.id === courseId) {
        const videoList = c.videos.filter((v) => v.id !== video.id);
        const update = { ...c, videos: [...videoList, videoData] };
        return update;
      } else {
        return c;
      }
    });

    ratingVideo(userId, updatedCourse, rating, courseId, video.id);
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="flex max-h-[60px] min-h-[60px] min-w-[77px] max-w-[77px] flex-col items-center justify-center gap-1 rounded-md border-[1px] border-gray-250 bg-gray-250 px-3 py-2 md:min-w-[97px] md:max-w-[97px]"
      >
        {video?.rating ? (
          <>
            <AiFillStar className="text-orange" size={20} />
            <Text className="text-small leading-4 text-gray-950">Avaliado</Text>
          </>
        ) : (
          <>
            <AiOutlineStar className="text-gray-950" size={20} />
            <Text className="text-small leading-4 text-gray-950">Avaliar</Text>
          </>
        )}
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="!absolute !bottom-0 !m-0 !rounded-b-none !rounded-t-3xl !bg-gray-200"
          py={6}
        >
          <ModalHeader className="!flex !items-center !pb-0">
            <Text className="w-full text-center font-poppins text-large font-bold leading-6 text-primary-500">
              O que você achou da aula?
            </Text>
            <ModalCloseButton className="text-gray-800" />
          </ModalHeader>
          <ModalBody px={4} py={2} pb={0}>
            <Text className="w-full text-center text-base font-medium leading-5">
              Sua avaliação é importante para continuarmos entregando bons
              conteúdos com qualidade.
            </Text>
            <Flex className="flex w-full items-center justify-between px-2 pb-2 pt-8">
              <AiFillStar
                onClick={() => handleSelectRating(1)}
                size={40}
                className={`${
                  video?.rating
                    ? video?.rating >= 1
                      ? "text-orange"
                      : "text-gray-800"
                    : "text-gray-800"
                }
                rating-1 cursor-pointer
                transition-all
                duration-200
                `}
              />
              <AiFillStar
                onClick={() => handleSelectRating(2)}
                size={40}
                className={`${
                  video?.rating
                    ? video?.rating >= 2
                      ? "text-orange"
                      : "text-gray-800"
                    : "text-gray-800"
                }
                rating-2 cursor-pointer
                transition-all
                duration-200
                `}
              />
              <AiFillStar
                onClick={() => handleSelectRating(3)}
                size={40}
                className={`${
                  video?.rating
                    ? video?.rating >= 3
                      ? "text-orange"
                      : "text-gray-800"
                    : "text-gray-800"
                }
                rating-3 cursor-pointer
                transition-all
                duration-200
                `}
              />
              <AiFillStar
                onClick={() => handleSelectRating(4)}
                size={40}
                className={`${
                  video?.rating
                    ? video?.rating >= 4
                      ? "text-orange"
                      : "text-gray-800"
                    : "text-gray-800"
                }
                rating-4 cursor-pointer
                transition-all
                duration-200
                `}
              />
              <AiFillStar
                onClick={() => handleSelectRating(5)}
                size={40}
                className={`${
                  video?.rating
                    ? video?.rating >= 5
                      ? "text-orange"
                      : "text-gray-800"
                    : "text-gray-800"
                }
                rating-5 cursor-pointer
                transition-all
                duration-200
                `}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
