import { useEffect } from "react";
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

  console.log(userList && userList[1].courses);
  console.log(courses);

  return (
    <Box className={`main-container flex flex-col gap-4 bg-gray-200 p-4`}>
      {courses?.map((course) => (
        <Box key={course.id} className="rounded-md bg-white p-4 shadow-sm">
          <Text className="font-poppins text-normal font-bold text-primary-400">
            {course.name}
          </Text>

          <ul>
            {course?.videos?.map((video) => (
              <li key={video.id}>
                <Box className="py-2">
                  <Text>
                    <span className="font-medium">Rating médio:</span>
                  </Text>
                  <Text>
                    <span className="font-medium">% de acertos médio:</span>
                  </Text>
                  <Text>
                    <span className="font-medium">Enquete:</span>
                  </Text>
                </Box>
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
}
