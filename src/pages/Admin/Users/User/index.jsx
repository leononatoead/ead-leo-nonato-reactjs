import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { fetchUsers } from "../../../../redux/modules/users/actions";
import { fetchVideos } from "../../../../redux/modules/courses/actions";

import ChangeAdminState from "./ChangeAdminState";
import EditUser from "./EditUser";

export default function User() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.courses);
  const { userList } = useSelector((state) => state.usersData);
  const user = userList?.find((user) => user.id === id);

  const getCourseName = (id) => {
    const course = courses?.find((course) => course.id === id);
    return course?.name;
  };

  const getVideoName = (courseId, videoId) => {
    const course = courses?.find((course) => course.id === courseId);
    const video = course?.videos?.find((video) => video.id === videoId);
    return video?.title;
  };

  useEffect(() => {
    if (!userList) {
      dispatch(fetchUsers());
    }
  }, [userList]);

  useEffect(() => {
    if (!user) return;

    if (user?.courses?.length > 0 && courses) {
      user?.courses?.forEach((course) => {
        const findCourse = courses?.find((c) => c.id === course.id);

        if (findCourse && !findCourse.videos) {
          dispatch(fetchVideos(course.id));
        }
      });
    }
  }, [user, courses]);

  return (
    <Box className="main-container flex flex-col gap-2 bg-gray-200 p-4">
      <Box className="flex w-full flex-col  gap-2 lg:mx-auto lg:max-w-5xl">
        <Box className="flex flex-col items-center justify-center gap-2 py-6">
          <Text className="w-full text-center font-poppins text-large font-bold text-primary-500">
            {user?.name}
          </Text>

          <ChangeAdminState user={user} />
        </Box>
        <Flex py={4} flexDirection={"column"} gap={2}>
          <Text className="text-base font-medium">
            <span className="font-bold">E-mail: </span>
            {user?.email}
          </Text>
          <Text className="text-base font-medium">
            <span className="font-bold">CPF: </span>
            {user?.cpf}
          </Text>
          <Text className="text-base font-medium">
            <span className="font-bold">Turma: </span>
            {user?.studantClass ? user?.studantClass.title : "Nenhuma"}
          </Text>
          <Text className="text-base font-medium">
            <span className="font-bold">Cursos comprados: </span>
            {user?.purchased?.length > 0 ? (
              <>{user.purchased.map((course) => course)}</>
            ) : (
              "Nenhum"
            )}
          </Text>

          <EditUser user={user} />
        </Flex>
      </Box>

      <Box className=" w-full lg:mx-auto lg:max-w-5xl">
        <Text className="mb-4 font-poppins text-large font-bold text-primary-500">
          Aulas assistidas
        </Text>
        {user?.courses?.length > 0 ? (
          <Accordion allowToggle>
            {user?.courses?.map((course) => (
              <AccordionItem
                key={course.id}
                className="mb-2 !border-b-[1px] !border-t-0 !border-gray-200"
              >
                <AccordionButton
                  py={4}
                  className="rounded-md bg-white hover:!bg-white"
                >
                  <Box as="span" flex="1" textAlign="left">
                    <Text
                      className={`!text-base font-bold !leading-5 text-primary-400`}
                    >
                      {getCourseName(course.id)}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel px={0} className="flex flex-col gap-3">
                  {course?.videos?.map((video) => (
                    <Box
                      key={video.id}
                      py={2}
                      px={4}
                      className="rounded-md bg-white"
                    >
                      <Text className={`font-poppins text-base  !leading-5`}>
                        <span className="font-bold">Aula: </span>
                        {getVideoName(course?.id, video?.id)}
                      </Text>
                      <Box className="mt-2 flex flex-col items-start justify-center gap-1 text-base">
                        <Text>
                          <span className="font-bold">Concluída: </span>
                          {video.concluded ? "Sim" : "Não"}
                        </Text>
                        <Text>
                          <span className="font-bold">Rating: </span>

                          {video.rating ? video.rating : "N/A"}
                        </Text>

                        <Text>
                          <span className="font-bold">
                            Percentual de acertos:{" "}
                          </span>
                          {video.quizResult ? `${video.quizResult} %` : "N/A"}
                        </Text>
                        <Box className="flex gap-2">
                          <Text className="font-bold">Enquete:</Text>

                          {video.surveyAnswer ? (
                            <Text className=" flex flex-1 flex-col gap-1">
                              <span>
                                <span className="mr-2 font-bold">P:</span>
                                {video.surveyAnswer.question}
                              </span>
                              <span>
                                <span className="mr-2 font-bold">R:</span>
                                {video.surveyAnswer.answer}
                              </span>
                            </Text>
                          ) : (
                            "N/A"
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Text>Nenhum curso assistido</Text>
        )}
      </Box>
    </Box>
  );
}
