import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingsFromLocalStorage,
  fetchStudantClassesSettings,
} from "../../../redux/modules/settings/actions";
import useCheckUpdate from "../../../hooks/useCheckUpdate";
import { Link } from "react-router-dom";

import { Box, Text } from "@chakra-ui/react";
import { PiUsersThreeFill } from "react-icons/pi";

export default function Statistics() {
  const settings = useSelector((state) => state.settings);
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

  return (
    <Box className={`main-container flex flex-col gap-4 bg-gray-200 p-4`}>
      {settings?.studantClasses?.map((c, i) => (
        <Link
          key={c.id}
          to={`/dashboard/statistics/class/${c.id}`}
          className="flex w-full items-center justify-between rounded-lg bg-white p-3 shadow-md"
        >
          <Box className="flex items-center gap-3">
            <PiUsersThreeFill size={15} />
            <Text>{c.title}</Text>
          </Box>
          {i === 0 ? (
            <Text className="w-24 rounded-md bg-green-200 py-1 text-center  text-white">
              Ativa
            </Text>
          ) : (
            <Text className="w-24 rounded-md bg-gray-200 py-1 text-center text-gray-800">
              Inativa
            </Text>
          )}
        </Link>
      ))}
    </Box>
  );
}
