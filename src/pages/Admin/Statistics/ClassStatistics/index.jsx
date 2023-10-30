import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../../redux/modules/users/actions";
import {
  fetchSettingsFromLocalStorage,
  fetchStudantClassesSettings,
} from "../../../../redux/modules/settings/actions";
import useCheckUpdate from "../../../../hooks/useCheckUpdate";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

export default function ClassStatistics() {
  const { id } = useParams();
  const settings = useSelector((state) => state.settings);
  const { courses } = useSelector((state) => state.courses);
  const { userList } = useSelector((state) => state.usersData);
  const dispatch = useDispatch();

  const [statistics, setStatistics] = useState({
    courses: null,
    classStudants: null,
  });
  const [loading, setLoading] = useState(true);

  const { verifySettingsUpdate } = useCheckUpdate();

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const fireStoreSettingsUpdate = await verifySettingsUpdate();
        const lastSettingsUpdate =
          new Date(JSON.parse(localStorage.getItem("lastSettingsUpdate"))) || 0;

        const calcCourse = fireStoreSettingsUpdate - lastSettingsUpdate;

        if (calcCourse !== 0 || !settings.studantClasses) {
          const localSettings = JSON.parse(localStorage.getItem("settings"));

          if (localSettings && localSettings.studantClasses) {
            dispatch(fetchSettingsFromLocalStorage(localSettings));
          } else {
            dispatch(fetchStudantClassesSettings());
          }
        } else {
          const localSettings = JSON.parse(localStorage.getItem("settings"));
          dispatch(fetchSettingsFromLocalStorage(localSettings));
        }
      } catch (error) {
        console.error("Erro ao buscar a última atualização de turmas:", error);
      }
    };

    fetchSettingsData();
  }, []);

  useEffect(() => {
    if (!userList) {
      dispatch(fetchUsers());
    }
  }, [userList]);

  useEffect(() => {
    if (!userList || !courses) return;

    const filterUserByClass = userList.filter(
      (user) => user.studantClass.id === id,
    );

    let classData = courses.map((course) => {
      const videos = course?.videos?.map((video) => ({
        id: video.id,
        order: video.order,
        title: video.title,
        rating: [],
        quizResult: video.questionsList ? [] : null,
        concluded: [],
        survey: video.survey ? { survey: video.survey, userAnswers: [] } : null,
      }));

      return {
        id: course.id,
        name: course.name,
        videos,
      };
    });

    filterUserByClass.forEach((user) => {
      user?.courses?.map((course) => {
        course?.videos?.map((video) => {
          classData.map((c) => {
            if (c.id === course.id) {
              c.videos.map((v) => {
                if (v.id === video.id) {
                  if (video.rating) {
                    v.rating.push(video.rating);
                  }
                  if (video.quizResult) {
                    v.quizResult.push(video.quizResult);
                  }
                  if (video.concluded) {
                    v.concluded.push(video.concluded);
                  }
                  if (video.surveyAnswer) {
                    v.survey.userAnswers.push(video.surveyAnswer.answer);
                  }
                  return v;
                } else return;
              });
            } else return;
          });
        });
      });
    });

    classData.map((course) => {
      return course.videos.map((video) => {
        video.rating =
          video.rating.length > 0
            ? video.rating.reduce((acc, cur) => acc + cur) /
              filterUserByClass.length
            : 0;

        video.concluded =
          video.concluded.length > 0
            ? `${
                (video.concluded.reduce((acc, cur) => {
                  if (cur === true) return acc + 1;
                }) /
                  filterUserByClass.length) *
                100
              } %`
            : "0 %";

        video.quizResult = video.quizResult
          ? video.quizResult.length > 0
            ? `${
                video.quizResult.reduce((acc, cur) => acc + cur) /
                video.quizResult.length
              } %`
            : "0 %"
          : null;

        const firstAnswerCount = video?.survey?.userAnswers?.reduce(
          (accumulator, currentValue) => {
            if (currentValue === video.survey.userAnswers[0]) {
              return accumulator + 1;
            } else {
              return accumulator;
            }
          },
          0,
        );
        const secondAnswerCount = video?.survey?.userAnswers?.reduce(
          (accumulator, currentValue) => {
            if (currentValue === video.survey.userAnswers[1]) {
              return accumulator + 1;
            } else {
              return accumulator;
            }
          },
          0,
        );
        const thirdAnswerCount = video?.survey?.userAnswers?.reduce(
          (accumulator, currentValue) => {
            if (currentValue === video.survey.userAnswers[2]) {
              return accumulator + 1;
            } else {
              return accumulator;
            }
          },
          0,
        );
        const fourthAnswerCount = video?.survey?.userAnswers?.reduce(
          (accumulator, currentValue) => {
            if (currentValue === video.survey.userAnswers[3]) {
              return accumulator + 1;
            } else {
              return accumulator;
            }
          },
          0,
        );

        video.survey = video.survey
          ? {
              ...video?.survey?.survey,
              firstAnswerCount,
              secondAnswerCount,
              thirdAnswerCount,
              fourthAnswerCount,
            }
          : null;
      });
    });

    setStatistics((prev) => ({
      ...prev,
      courses: classData,
      classStudants: filterUserByClass.length,
    }));
    setLoading(false);
  }, [userList, courses]);

  return (
    <Box
      className={`main-container flex flex-col gap-4 bg-gray-200 p-4 lg:p-6`}
    >
      {statistics?.courses?.map((course) => (
        <Box
          key={course.id}
          className="w-full rounded-md bg-white p-4  shadow-sm lg:mx-auto lg:max-w-5xl"
        >
          <Text className="mb-2 font-poppins text-normal font-bold text-primary-400">
            {course.name}
          </Text>

          <ul className="flex flex-col gap-4">
            {course?.videos
              ?.slice()
              .sort((a, b) => a.order - b.order)
              .map((video) => (
                <li key={video.id}>
                  <Box className="rounded-md bg-gray-150 p-2 lg:p-4">
                    <Text className="font-poppins font-bold text-primary-500">
                      {video.title}
                    </Text>
                    <Text>
                      <span className="text-base font-bold">
                        Percentual de conclusão:{" "}
                      </span>
                      {video.concluded}
                    </Text>
                    <Text>
                      <span className="text-base font-bold">
                        Rating médio:{" "}
                      </span>
                      {video.rating}
                    </Text>
                    {video.quizResult && (
                      <Text>
                        <span className="text-base font-bold">
                          Percentual de acertos quiz:{" "}
                        </span>
                        {video.quizResult}
                      </Text>
                    )}
                    {video.survey && (
                      <Box>
                        <Text className="text-base font-bold">Enquete:</Text>
                        <Text className="ml-2">{video?.survey?.question}</Text>
                        <Box className="ml-2">
                          <Text className="flex gap-2">
                            <span className="block w-[60px] text-center font-bold">
                              {video?.survey?.firstAnswerCount}
                            </span>{" "}
                            {video?.survey?.firstAnswer}
                          </Text>
                          <Text className="flex gap-2">
                            <span className="block w-[60px] text-center font-bold">
                              {video?.survey?.secondAnswerCount}
                            </span>{" "}
                            {video?.survey?.secondAnswer}
                          </Text>
                          <Text className="flex gap-2">
                            <span className="block w-[60px] text-center font-bold">
                              {video?.survey?.thirdAnswerCount}
                            </span>{" "}
                            {video?.survey?.thirdAnswer}
                          </Text>
                          <Text className="flex gap-2">
                            <span className="block w-[60px] text-center font-bold">
                              {video?.survey?.fourthAnswerCount}
                            </span>{" "}
                            {video?.survey?.fourthAnswer}
                          </Text>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </li>
              ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
}
