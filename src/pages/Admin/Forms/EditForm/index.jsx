import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms } from "../../../../redux/modules/forms/actions";
import useForms from "../../../../hooks/useForms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../NewForm/FormSchema";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../../../components/Input";
import ConfirmModal from "../../../../components/ConfirmModal";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { IoTrashBinSharp } from "react-icons/io5";
import { AiOutlineWarning } from "react-icons/ai";

export default function EditForm() {
  const { id } = useParams();
  const { forms } = useSelector((state) => state.forms);
  const form = forms?.find((form) => form.id === id);

  const [openConfirmModal, setOpenConfirmModal] = useState();

  const [formData, setFormData] = useState({
    title: form?.title || "",
    fields: form?.fields || [],
  });

  const [error, setError] = useState({
    title: "",
    fields: "",
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const { updateForm, deleteForm, loading } = useForms();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddField = (formData) => {
    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, formData],
    }));
    reset({ field: "", type: "text", placeholder: "" });
  };

  const handleRemoveField = (index) => {
    const removeSelected = formData.fields.filter((field, i) => i !== index);

    setFormData((prev) => ({ ...prev, fields: removeSelected }));
  };

  const handleUpdateForm = () => {
    if (formData.title === "") {
      return setError((prev) => ({
        ...prev,
        title: "Digite um título válido",
      }));
    } else setError({ title: "" });
    if (formData.fields.length === 0) {
      return setError((prev) => ({
        ...prev,
        fields: "Digite pelo menos um campo para o seu formulário",
      }));
    } else {
      setError({ fields: "" });
    }

    updateForm(id, formData);
  };

  const handleDeleteForm = () => {
    deleteForm(id);
    navigate("/dashboard/forms");
  };

  useEffect(() => {
    if (!forms) {
      dispatch(fetchForms());
    }
  }, []);

  return (
    <Box className="main-container !flex !flex-col">
      <Box className="flex-grow">
        <Box className="flex flex-col gap-4">
          <label htmlFor={"field"} className="text-base leading-5">
            Título
          </label>
          <Box
            className={`animation relative w-full overflow-hidden rounded-[4px] shadow-sm shadow-gray-900/50 after:absolute  after:bottom-0 after:left-1/2 after:h-[2px] after:-translate-x-1/2 after:bg-cian after:content-[''] hover:after:w-full  ${
              error.title && "after:w-full after:bg-red-500"
            }`}
          >
            <input
              id="field"
              type={"text"}
              placeholder={"Digite aqui"}
              className={`w-full rounded-[4px] bg-white px-3 py-[5px] text-base leading-5 outline-none placeholder:text-gray-900`}
              autoComplete="false"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              defaultValue={formData.title}
            />
            {error.title && (
              <Box
                className={`absolute right-1
                 top-1 text-red-500`}
              >
                <AiOutlineWarning size={20} className="text-red-500" />
              </Box>
            )}
          </Box>
          <span className="-mt-[10px] text-small text-red-500">
            {error?.title && error.title}
          </span>

          <Heading
            pt={2}
            className="!font-inter !text-normal !font-bold !leading-5 !text-primary-400"
          >
            Campos do formulário
          </Heading>
          <form
            id="editFieldsForm"
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleAddField)}
          >
            <Input
              theme={"light"}
              type={"text"}
              label={"Campo"}
              placeholder={"Digite aqui"}
              register={register}
              id={"field"}
              error={errors?.field?.message}
              watch={watch}
            />
            <Box className="flex items-center justify-center gap-4">
              <Box>
                <label
                  htmlFor={"type"}
                  className="mb-[9px] block text-base leading-5"
                >
                  Tipo
                </label>
                <select
                  id="type"
                  {...register("type")}
                  className={`w-full rounded-[4px] bg-white px-3 py-[5px] text-base leading-5 shadow-sm shadow-gray-900/50 outline-none placeholder:text-gray-900`}
                >
                  <option value="text">Texto</option>
                  <option value="number">Número</option>
                  <option value="email">E-mail</option>
                </select>
                {errors?.type?.message ? (
                  <span className="-mt-1 text-small text-red-500">
                    {errors?.type?.message}
                  </span>
                ) : (
                  errors?.placeholder?.message && (
                    <span className="-mt-1 text-small text-transparent">a</span>
                  )
                )}
              </Box>
              <Input
                theme={"light"}
                type={"text"}
                label={"Placeholder"}
                placeholder={"Digite aqui"}
                register={register}
                id={"placeholder"}
                error={errors?.placeholder?.message}
                watch={watch}
              />
            </Box>
            <button
              type="submit"
              form="editFieldsForm"
              className="mt-2 w-full rounded-[4px] border-[1px] border-primary-400 bg-white px-3 py-[5px] text-base font-medium leading-5 text-primary-400"
            >
              Adicionar Campo
            </button>
            <span className="-mt-1 text-small text-red-500">
              {error?.fields && error.fields}
            </span>
          </form>
          {formData.fields?.length > 0 && (
            <ul>
              {formData.fields?.map((question, index) => (
                <li key={index} className="flex justify-between">
                  <span className="font-medium text-primary-600">
                    {question.field}
                  </span>
                  <button
                    className="font-medium text-red-500"
                    onClick={() => handleRemoveField(index)}
                  >
                    <IoTrashBinSharp />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Box>
      <Flex flexDirection={"column"} gap={2}>
        <button
          type="button"
          className="w-full rounded-[4px] bg-primary-400 px-3 py-[5px] text-base leading-5 text-white disabled:bg-gray-900/30"
          onClick={handleUpdateForm}
          disabled={loading}
        >
          {loading ? <Spinner color="white" size="sm" /> : "Editar Formulário"}
        </button>

        <ConfirmModal
          deleteFunction={handleDeleteForm}
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
        />
      </Flex>
    </Box>
  );
}
