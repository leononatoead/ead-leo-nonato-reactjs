import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Text,
} from "@chakra-ui/react";
import { fetchUsers } from "../../../../redux/modules/users/actions";
import { fetchVideos } from "../../../../redux/modules/courses/actions";

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

    if (user.courses.length > 0 && courses) {
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
      <Box className="flex flex-col gap-2">
        <Avatar src={user?.profileImage} />
        <Text className="w-full text-center font-poppins text-large font-bold text-primary-500">
          {user?.name}
        </Text>
        <Text className="text-base font-medium">{user?.cpf}</Text>
      </Box>

      <Box>
        <Text className="font-poppins text-large font-bold text-primary-500">
          Cursos
        </Text>
        {user?.courses?.length > 0 ? (
          <Accordion allowToggle>
            {user?.courses?.map((course) => (
              <AccordionItem
                key={course.id}
                className="!border-b-[1px] !border-t-0 !border-gray-200 "
              >
                <AccordionButton px={0} py={4} className="hover:!bg-gray-200">
                  <Box as="span" flex="1" textAlign="left">
                    <Text className={`!text-base font-bold !leading-5`}>
                      {getCourseName(course.id)}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel className="flex flex-col gap-3">
                  {course?.videos?.map((video) => (
                    <Box
                      key={video.id}
                      py={2}
                      px={4}
                      className="rounded-md bg-white"
                    >
                      <Text className={`font-poppins text-base  !leading-5`}>
                        {getVideoName(course?.id, video?.id)}
                      </Text>
                      <Box className="flex items-center justify-between gap-6 text-base">
                        <Text>
                          <span className="font-bold">Concluída: </span>
                          {video.concluded ? "Sim" : "Não"}
                        </Text>
                        <Text>
                          <span className="font-bold">Rating: </span>

                          {video.rating ? video.rating : "N/A"}
                        </Text>
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
