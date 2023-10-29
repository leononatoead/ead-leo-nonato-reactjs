import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms } from "../../../redux/modules/forms/actions";
import { Link } from "react-router-dom";

import { Box, Text, useToast } from "@chakra-ui/react";
import { MdAddCircleOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaShareSquare } from "react-icons/fa";

export default function Forms() {
  const { forms } = useSelector((state) => state.forms);

  const dispatch = useDispatch();
  const toast = useToast();

  const handleCopy = (id) => {
    const textArea = document.createElement("textarea");
    textArea.value = id;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    toast({
      description: "ID Copiado",
      status: "success",
      duration: "1500",
      isClosable: true,
    });
  };

  useEffect(() => {
    if (!forms) {
      dispatch(fetchForms());
    }
  }, []);

  return (
    <Box className="main-container">
      <Box className="flex w-full   justify-end lg:mx-auto lg:max-w-5xl">
        <Link to="/dashboard/forms/new" className="add-btn">
          <MdAddCircleOutline size={20} />
          <span className="font-bold">Novo formulário</span>
        </Link>
      </Box>

      {forms && (
        <ul className="flex w-full flex-col gap-2 py-6 lg:mx-auto lg:max-w-5xl">
          {forms.map((form) => (
            <Link
              key={form.id}
              to={`/dashboard/forms/edit/${form.id}`}
              className="flex flex-col gap-4 rounded-md border-[1px] border-gray-150 bg-white p-2 shadow-sm"
            >
              <li className="flex items-center justify-center gap-3 ">
                <span className="flex-1 text-justify text-normal font-semibold leading-4">
                  {form.title}
                </span>
                <BiEdit size={18} />
              </li>

              <button
                className="flex w-max gap-1 text-gray-700"
                onClick={() => handleCopy(form.id)}
              >
                <FaShareSquare size={15} />
                <Text className="flex-1 text-justify text-xs font-normal leading-4">
                  ID:
                </Text>
                <Text className="flex-1 text-justify text-xs font-normal leading-4">
                  {form.id}
                </Text>
              </button>
            </Link>
          ))}
        </ul>
      )}
    </Box>
  );
}
