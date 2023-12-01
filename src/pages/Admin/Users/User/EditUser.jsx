import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettingsFromLocalStorage,
  fetchStudantClassesSettings,
} from "../../../../redux/modules/settings/actions";
import useUserData from "../../../../hooks/useUserData";
import useCheckUpdate from "../../../../hooks/useCheckUpdate";
import { useForm } from "react-hook-form";

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
  useToast,
} from "@chakra-ui/react";
import { AiOutlineWarning } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import useAuth from "../../../../hooks/useAuth";

export default function EditUser({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const settings = useSelector((state) => state.settings);
  const { user: actualUser } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);

  const { resetPassword, loading: resetLoading } = useAuth();

  const [studantClass, setStudantClass] = useState("");
  const [purchased, setPurchased] = useState({
    purchasedList: [],
  });
  const [error, setError] = useState(null);

  const { register, handleSubmit, watch, reset } = useForm();

  const { changeUserClassAndPurchasedCourses, loading } = useUserData();
  const { verifySettingsUpdate } = useCheckUpdate();
  const dispatch = useDispatch();
  const toast = useToast();

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

  const handleUpdatePurchased = (formData) => {
    if (formData.purchased === "") {
      setError("Digite um ID");
      return;
    }

    const checkIfIdExists = courses.find(
      (course) => course.id === formData.purchased,
    );

    const checkIfAlreadyExists = purchased.purchasedList.find(
      (id) => id === formData.purchased,
    );

    if (checkIfIdExists && !checkIfAlreadyExists) {
      setPurchased((prev) => ({
        purchasedList: [...prev.purchasedList, formData.purchased],
      }));
    } else if (!checkIfIdExists) {
      setError("Curso não encontrado, insira um ID válido");
      return;
    } else if (checkIfAlreadyExists) {
      setError("Usuário já possui este curso");
      return;
    }

    reset({ purchased: "" });
    setError(null);
  };

  const getCourseName = (id) => {
    const course = courses?.find((course) => course.id === id);
    return course?.name;
  };

  const handleRemoveCourse = (id) => {
    const removeCourse = purchased.purchasedList.filter(
      (course) => course !== id,
    );

    setPurchased((prev) => ({ ...prev, purchasedList: removeCourse }));
  };

  const handleUpdateUser = () => {
    const classData = settings?.studantClasses?.find(
      (c) => c.id === studantClass,
    );

    if (!classData && user.studantClass) {
      toast({
        description: "Turma não encontrada",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      return;
    }

    if (!classData && purchased.purchasedList && !user.studantClass) {
      changeUserClassAndPurchasedCourses(
        user.id,
        actualUser,
        settings.studantClasses[0],
        purchased.purchasedList,
      );
    }
    if (classData && purchased.purchasedList) {
      changeUserClassAndPurchasedCourses(
        user.id,
        actualUser,
        classData,
        purchased.purchasedList,
      );
    }
  };

  const handleSendReset = () => {
    resetPassword(user?.email);
  };

  useEffect(() => {
    if (!user) {
      return;
    } else {
      if (user.studantClass) {
        setStudantClass(user.studantClass.id);
      }
      if (user.purchased) {
        setPurchased({ purchasedList: user.purchased });
      }
    }
  }, [user]);

  return (
    <>
      <button
        onClick={onOpen}
        className="mt-2 w-full rounded-[4px] bg-primary-400 px-3 py-[5px] text-base  leading-5
       text-white disabled:bg-gray-900/30 lg:mx-auto lg:max-w-[370px] "
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
              <Box className="flex flex-col justify-center gap-2">
                <Text>Turma</Text>
                <select
                  className="w-full rounded-md p-1 px-2 shadow-sm"
                  value={studantClass}
                  onChange={(e) => setStudantClass(e.target.value)}
                >
                  {settings?.studantClasses?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </Box>

              <form
                id="editUserForm"
                onSubmit={handleSubmit(handleUpdatePurchased)}
                className="flex flex-col justify-center gap-2"
              >
                <Text>Cursos comprados</Text>
                <Box
                  className={`relative w-full overflow-hidden rounded-[4px] after:absolute after:bottom-0 after:left-1/2 after:h-[2px]  after:-translate-x-1/2 after:bg-cian after:content-[''] ${
                    watch("purchased") ? "after:w-full" : "after:w-0"
                  } animation hover:after:w-full ${
                    error && "after:w-full after:bg-red-500"
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
                  {error && (
                    <Box
                      className={`absolute right-1
                    top-1 text-red-500`}
                    >
                      <AiOutlineWarning size={20} className="text-red-500" />
                    </Box>
                  )}
                </Box>
                <span className="-mt-1 text-small text-red-500">
                  {error && error}
                </span>

                <button
                  form="editUserForm"
                  type="submit"
                  className="mt-4 w-full rounded-[4px] border-[1px] border-primary-600 bg-white px-3 py-[5px] text-base leading-5 text-primary-600"
                >
                  Incluir Curso
                </button>
                <ul className="py-6">
                  {purchased?.purchasedList?.map((course) => (
                    <li
                      key={course}
                      className="flex items-center justify-between"
                    >
                      <Text>{getCourseName(course)}</Text>
                      <BiTrash
                        size={18}
                        className="cursor-pointer text-red-500"
                        onClick={() => handleRemoveCourse(course)}
                      />
                    </li>
                  ))}
                </ul>
              </form>
              <button
                type="button"
                className={` mt-6 w-full rounded-sm ${
                  resetLoading ? "bg-gray-800" : "bg-primary-500"
                } py-[6px] text-base  leading-5 text-white disabled:bg-gray-700 `}
                onClick={handleSendReset}
                disabled={resetLoading}
              >
                Enviar e-mail para redefinir senha
              </button>

              <button
                type="button"
                className={` w-full rounded-sm ${
                  loading ? "bg-gray-800" : "bg-primary-400"
                } py-[6px] text-base  leading-5 text-white disabled:bg-gray-700 `}
                onClick={handleUpdateUser}
                disabled={loading}
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
