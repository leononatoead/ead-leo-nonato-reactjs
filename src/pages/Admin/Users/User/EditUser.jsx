import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingsFromLocalStorage,
  fetchStudantClassesSettings,
} from "../../../../redux/modules/settings/actions";
import useCheckUpdate from "../../../../hooks/useCheckUpdate";

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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";

export default function EditUser({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const settings = useSelector((state) => state.settings);
  const { user: actualUser } = useSelector((state) => state.auth);

  const [studantClass, setStudantClass] = useState(actualUser?.studantClass);
  const [purchased, setPurchased] = useState({
    courseId: "",
    purchasedList: actualUser?.purchased ? actualUser?.purchased : [],
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { verifySettingsUpdate } = useCheckUpdate();
  const dispatch = useDispatch();

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

  const handleEditUser = (formData) => {
    console.log(formData);
  };

  console.log(purchased);

  return (
    <>
      <button
        onClick={onOpen}
        className="mt-2 w-full rounded-[4px] bg-primary-400 px-3  py-[5px]
       text-base leading-5 text-white disabled:bg-gray-900/30 "
      >
        Editar
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="self-center !rounded-lg !bg-gray-200 lg:static"
          py={6}
        >
          <ModalHeader className="!flex !items-center !pb-0">
            <Text className="w-full text-center font-poppins text-large font-bold leading-6 text-primary-500">
              Alterar usuário
            </Text>
            <ModalCloseButton className="text-gray-800" />
          </ModalHeader>
          <ModalBody px={4} py={8} pb={0}>
            <Box className="flex flex-col gap-4">
              {user?.studantClass && (
                <Box className="flex flex-col justify-center gap-2">
                  <Text>Turma</Text>
                  <select
                    className="w-full rounded-md p-1 px-2 shadow-sm"
                    value={studantClass}
                    onChange={(e) => setStudantClass(e.target.value)}
                  >
                    <option value="teste">2</option>
                    {settings?.studantClasses?.map((c) => (
                      <option key={c.id} value={c}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </Box>
              )}
              <form
                id="editUserForm"
                onSubmit={handleSubmit(handleEditUser)}
                className="flex flex-col justify-center gap-2"
              >
                <Text>Cursos comprados</Text>
                <Box
                  className={`relative w-full overflow-hidden rounded-[4px] after:absolute after:bottom-0 after:left-1/2 after:h-[2px]  after:-translate-x-1/2 after:bg-cian after:content-[''] ${
                    watch("purchased") ? "after:w-full" : "after:w-0"
                  } animation hover:after:w-full ${
                    errors.purchased && "after:w-full after:bg-red-500"
                  } shadow-gray-900/50} shadow-sm`}
                >
                  <input
                    type={"text"}
                    {...register("purchased")}
                    placeholder={"ID do curso"}
                    id={"purchased"}
                    className={`w-full rounded-[4px]  bg-white px-3 py-[5px] text-base leading-5 outline-none placeholder:text-gray-900`}
                    autoComplete="false"
                  />
                  {errors.purchased && (
                    <Box
                      className={`absolute right-1
                    top-1 text-red-500`}
                    >
                      <AiOutlineWarning size={20} className="text-red-500" />
                    </Box>
                  )}
                </Box>

                <button
                  form="editUserForm"
                  type="submit"
                  className="mt-4 w-full rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
                >
                  Incluir
                </button>
                <ul className="py-6">
                  {user?.purchased?.map((course) => course)}
                </ul>
              </form>
              <button
                type="button"
                className=" mt-6 w-full rounded-sm bg-primary-400 py-[6px] text-base  leading-5 text-white disabled:bg-gray-700"
              >
                Alterar
              </button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
