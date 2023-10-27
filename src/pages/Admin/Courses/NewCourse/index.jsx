import { useState } from "react";
import useCourse from "../../../../hooks/useCourse";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCourseSchema } from "./addCourseSchema";
import { useNavigate } from "react-router-dom";

import Input from "../../../../components/Input";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import Sections from "./Sections";
import { Box, Switch, Text, useToast } from "@chakra-ui/react";

export default function NewCourse() {
  const [switchStates, setSwitchStates] = useState({
    isPremium: false,
    needAuth: true,
    isHidden: false,
    needForm: false,
  });

  const [error, setError] = useState({
    image: "",
    price: "",
    paymentRef: "",
    paymentURL: "",
    formRef: "",
  });

  const [imageFile, setImageFile] = useState();
  const [sections, setSections] = useState([]);

  const toast = useToast();
  const navigate = useNavigate();

  const { addNewCourse, loading } = useCourse();
  const {
    register,
    handleSubmit,
    watch,
    reset,
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

  const handlAddCourse = async (formData) => {
    setError({
      image: "",
      price: "",
      paymentRef: "",
      paymentURL: "",
      formRef: "",
    });

    if (sections.length < 1) {
      toast({
        description: "Adicione ao menos uma seção!",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      return;
    }

    if (!imageFile) {
      setError((prev) => ({ ...prev, image: "Envie uma imagem!" }));
      return;
    }

    if (switchStates.isPremium) {
      if (!formData.price || !formData.paymentRef || !formData.paymentURL) {
        if (!formData.price) {
          setError((prev) => ({ ...prev, price: "Digite um preço válido" }));
        }
        if (!formData.paymentRef) {
          setError((prev) => ({
            ...prev,
            paymentRef: "Digite uma referência válida",
          }));
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
    addNewCourse(data, "courses", imageFile);

    reset({
      name: "",
      description: "",
      author: "",
      price: "",
      paymentRef: "",
      paymentURL: "",
      formRef: "",
    });

    setSwitchStates({
      isPremium: false,
      needAuth: true,
      isHidden: false,
      needForm: false,
    });

    navigate("/dashboard/courses");
  };

  return (
    <Box className="main-container flex flex-col">
      <Box className="mb-4 flex flex-grow flex-col gap-4">
        <form
          id="addCourseForm"
          onSubmit={handleSubmit(handlAddCourse)}
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
            <span className="errorText">{error?.image && error.image}</span>
          </Box>
          <Input
            theme={"light"}
            type={"text"}
            label={"Nome"}
            placeholder={"Digite aqui"}
            register={register}
            id={"name"}
            error={errors?.name?.message}
            watch={watch}
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
          />

          {switchStates.isPremium && (
            <>
              <Input
                theme={"light"}
                type={"number"}
                label={"Preço"}
                register={register}
                id={"price"}
                error={error.price}
                watch={watch}
                defaultValue={0}
              />
              <Input
                theme={"light"}
                type={"text"}
                label={"Referência de pagamento"}
                placeholder={"Digite aqui"}
                register={register}
                id={"paymentRef"}
                error={error?.paymentRef}
                watch={watch}
              />
              <Input
                theme={"light"}
                type={"text"}
                label={"Checkout de pagamento (URL)"}
                placeholder={"https://exemplo.com/"}
                register={register}
                id={"paymentURL"}
                error={error?.paymentURL}
                watch={watch}
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
            />
          )}
          <Box className="flex items-center justify-start gap-4" mb={"5px"}>
            <Text className="text-base font-bold text-primary-600">
              Curso pago:
            </Text>
            <Box className="flex items-center justify-start gap-4">
              <Switch
                id="isPremium"
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
              <Switch id="needForm" onChange={() => handleSwitch("needForm")} />
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
                defaultChecked
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
                defaultChecked
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
      <ButtonSubmit
        form="addCourseForm"
        disabled={loading ? true : false}
        text={"Adicionar"}
        loading={loading}
      />
    </Box>
  );
}
