import { useState } from "react";
import { useSelector } from "react-redux";
import useCourse from "../../../../hooks/useCourse";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCourseSchema } from "../NewCourse/addCourseSchema";
import { useLocation, useNavigate } from "react-router-dom";

import Input from "../../../../components/Input";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import ConfirmModal from "../../../../components/ConfirmModal";
import Sections from "../NewCourse/Sections";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";

export default function EditCourse() {
  const { pathname } = useLocation();
  const pathParams = pathname.split("/");
  const id = pathParams[3];
  const { courses } = useSelector((state) => state.courses);
  const course = courses.find((course) => course.id === id);
  const { editCourseWithImage, editCourseWithoutImage, deleteCourse, loading } =
    useCourse();
  const navigate = useNavigate();

  const [switchStates, setSwitchStates] = useState({
    isPremium: course?.isPremium,
    needAuth: course?.needAuth,
    isHidden: course?.isHidden,
    needForm: course?.needForm,
  });

  const [error, setError] = useState({
    image: "",
    price: "",
    paymentURL: "",
    formRef: "",
  });

  const [imageFile, setImageFile] = useState();
  const [sections, setSections] = useState(course?.sections);

  const [openConfirmModal, setOpenConfirmModal] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddCourseSchema),
  });

  const handleSwitch = (type) => {
    if (type === "isPremium") {
      setSwitchStates((prev) => ({ ...prev, isPremium: !prev.isPremium }));
    } else if (type === "needAuth") {
      setSwitchStates((prev) => ({ ...prev, needAuth: !prev.needAuth }));
    } else if (type === "isHidden") {
      setSwitchStates((prev) => ({ ...prev, isHidden: !prev.isHidden }));
    } else if (type === "needForm") {
      setSwitchStates((prev) => ({ ...prev, needForm: !prev.needForm }));
    }
  };

  const handleEditCourse = async (formData) => {
    setError({
      image: "",
      price: "",
      paymentURL: "",
      formRef: "",
    });

    if (switchStates.isPremium) {
      if (!formData.price || !formData.paymentURL) {
        if (!formData.price) {
          setError((prev) => ({ ...prev, price: "Digite um preço válido" }));
        }

        if (!formData.paymentURL) {
          setError((prev) => ({
            ...prev,
            paymentURL: "Digite um URL válido",
          }));
        }
        return;
      }
    }

    if (switchStates.needForm) {
      if (!formData.formRef) {
        setError((prev) => ({
          ...prev,
          formRef: "Digite uma referência válida",
        }));

        return;
      }
    }

    const data = {
      ...formData,
      isPremium: switchStates.isPremium,
      needAuth: switchStates.needAuth,
      isHidden: switchStates.isHidden,
      needForm: switchStates.needForm,
      sections,
    };

    if (imageFile) {
      editCourseWithImage(course, data, "courses", imageFile);
    } else {
      editCourseWithoutImage(course, data);
    }
  };

  const handleDeleteCourse = () => {
    deleteCourse(course);
    navigate("/dashboard/courses");
  };

  return (
    <Box className="main-container flex flex-col justify-between">
      <Box className="w-full lg:mx-auto lg:max-w-5xl">
        <Box className="mb-4 flex flex-grow flex-col gap-4">
          <form
            id="editCourseForm"
            onSubmit={handleSubmit(handleEditCourse)}
            className="flex flex-col gap-[10px]"
          >
            <Box className="mb-[6px]">
              <label
                htmlFor={"image"}
                className="!mb-[9px] block text-base leading-5"
              >
                Imagem
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                multiple={false}
                className="w-full text-base outline-none"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </Box>
            <Input
              theme={"light"}
              type={"text"}
              label={"Nome do curso"}
              placeholder={"Digite aqui"}
              register={register}
              id={"name"}
              error={errors?.name?.message}
              watch={watch}
              defaultValue={course.name}
            />
            <Input
              theme={"light"}
              type={"text"}
              label={"Descrição"}
              placeholder={"Digite aqui"}
              register={register}
              id={"description"}
              error={errors?.description?.message}
              watch={watch}
              defaultValue={course.description}
            />
            <Input
              theme={"light"}
              type={"text"}
              label={"Autor"}
              placeholder={"Digite aqui"}
              register={register}
              id={"author"}
              error={errors?.author?.message}
              watch={watch}
              defaultValue={course.author}
            />
            {switchStates.isPremium && (
              <>
                <Input
                  theme={"light"}
                  type={"number"}
                  label={"Preço"}
                  placeholder={"R$ 0,00"}
                  register={register}
                  id={"price"}
                  error={errors?.price?.message}
                  watch={watch}
                  defaultValue={course.price}
                />

                <Input
                  theme={"light"}
                  type={"text"}
                  label={"Checkout de pagamento (URL)"}
                  placeholder={"https://exemplo.com/"}
                  register={register}
                  id={"paymentURL"}
                  error={errors?.paymentURL?.message}
                  watch={watch}
                  defaultValue={course.paymentURL}
                />
              </>
            )}
            {switchStates.needForm && (
              <Input
                theme={"light"}
                type={"text"}
                label={"Referência do formulário de cadastro"}
                placeholder={"Digite aqui"}
                register={register}
                id={"formRef"}
                error={error?.formRef}
                watch={watch}
                defaultValue={course.formRef}
              />
            )}
            <Box className="flex items-center justify-start gap-4" mb={"5px"}>
              <Text className="text-base font-bold text-primary-600">
                Curso pago:
              </Text>
              <Box className="flex items-center justify-start gap-4">
                <Switch
                  id="isPremium"
                  isChecked={switchStates.isPremium}
                  onChange={() => handleSwitch("isPremium")}
                />
                <label htmlFor={"isPremium"} className="text-base leading-5">
                  {switchStates.isPremium ? "Sim" : "Não"}
                </label>
              </Box>
            </Box>
            <Box className="flex items-center justify-start gap-4" mb={"5px"}>
              <Text className="text-base font-bold text-primary-600">
                Formulário de cadastro:
              </Text>
              <Box className="flex items-center justify-start gap-4">
                <Switch
                  id="needForm"
                  onChange={() => handleSwitch("needForm")}
                  isChecked={switchStates.needForm}
                />
                <label htmlFor={"needForm"} className="text-base leading-5">
                  {switchStates.needForm ? "Ativado" : "Desativado"}
                </label>
              </Box>
            </Box>
            <Box className="flex items-center justify-start gap-4" mb={"5px"}>
              <Text className="text-base font-bold text-primary-600">
                Requer cadastro:
              </Text>
              <Box className="flex items-center justify-start gap-4">
                <Switch
                  id="needAuth"
                  isChecked={switchStates.needAuth}
                  onChange={() => handleSwitch("needAuth")}
                />
                <label htmlFor={"needAuth"} className="text-base leading-5">
                  {switchStates.needAuth ? "Sim" : "Não"}
                </label>
              </Box>
            </Box>
            <Box className="flex items-center justify-start gap-4" mb={4}>
              <Text className="text-base font-bold text-primary-600">
                Visibilidade:
              </Text>
              <Box className="flex items-center justify-start gap-4">
                <Switch
                  id="isHidden"
                  isChecked={!switchStates.isHidden}
                  onChange={() => handleSwitch("isHidden")}
                />
                <label htmlFor={"isHidden"} className="text-base leading-5">
                  {switchStates.isHidden ? "Privado" : "Público"}
                </label>
              </Box>
            </Box>
          </form>
          <Sections sections={sections} setSections={setSections} />
        </Box>
      </Box>
      <Flex
        flexDirection={"column"}
        gap={2}
        className="mt-2 w-full lg:mx-auto lg:max-w-5xl"
      >
        <ButtonSubmit
          form="editCourseForm"
          disabled={false}
          text={"Alterar"}
          loading={loading}
        />
        <ConfirmModal
          deleteFunction={handleDeleteCourse}
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
        />
      </Flex>
    </Box>
  );
}
