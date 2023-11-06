import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms } from "../../../redux/modules/forms/actions";
import { Link, useNavigate } from "react-router-dom";

import { Box, Text, useToast } from "@chakra-ui/react";
import { MdAddCircleOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaShareSquare } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";

export default function Forms() {
  const { forms } = useSelector((state) => state.forms);
  const { courses } = useSelector((state) => state.courses);

  const [selected, setSelected] = useState("forms");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleNavigate = (id) => {
    navigate(`/dashboard/forms/edit/${id}`);
  };
  const handleSelected = (value) => {
    if (value === "forms") {
      setSelected("forms");
    } else if (value === "answers") {
      setSelected("answers");
    }
  };

  const handleCopy = (event, id) => {
    event.stopPropagation();
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

      <Box className="mt-6 flex items-center gap-4 border-b border-b-gray-250 lg:mx-auto lg:max-w-5xl">
        <Text
          className={`cursor-pointer font-poppins ${
            selected === "forms"
              ? "font-bold text-primary-600"
              : "text-gray-450"
          } `}
          onClick={() => handleSelected("forms")}
        >
          Formulários
        </Text>
        <Text
          className={`cursor-pointer font-poppins ${
            selected === "answers"
              ? "font-bold text-primary-600"
              : " text-gray-450"
          } `}
          onClick={() => handleSelected("answers")}
        >
          Respostas
        </Text>
      </Box>

      {selected === "forms" ? (
        <>
          {forms && (
            <ul className="flex w-full flex-col gap-2 py-6 lg:mx-auto lg:max-w-5xl">
              {forms.map((form) => (
                <Box
                  key={form.id}
                  onClick={() => handleNavigate(form.id)}
                  className="flex cursor-pointer flex-col gap-4 rounded-md border-[1px] border-gray-150 bg-white p-4 shadow-sm"
                >
                  <li className="flex items-center justify-center gap-3 ">
                    <span className="flex-1 text-justify text-normal font-semibold leading-4">
                      {form.title}
                    </span>
                    <BiEdit size={18} />
                  </li>

                  <button
                    className="flex w-max gap-1 text-gray-700"
                    onClick={(e) => handleCopy(e, form.id)}
                  >
                    <FaShareSquare size={15} />
                    <Text className="flex-1 text-justify text-xs font-normal leading-4">
                      ID:
                    </Text>
                    <Text className="flex-1 text-justify text-xs font-normal leading-4">
                      {form.id}
                    </Text>
                  </button>
                </Box>
              ))}
            </ul>
          )}
        </>
      ) : (
        <ul className="flex w-full flex-col gap-2 py-6 lg:mx-auto lg:max-w-5xl">
          {courses?.map(
            (course) =>
              course.needForm && (
                <Link
                  className=" w-full cursor-pointer gap-4 rounded-md border-[1px] border-gray-150 bg-white p-4 shadow-sm"
                  key={course.id}
                  to={`/dashboard/forms/courses/${course.id}`}
                >
                  <li className="flex items-center justify-between text-justify text-normal font-semibold leading-4 text-primary-600">
                    {course.name}

                    <AiFillEye size={20} className="text-primary-600" />
                  </li>
                </Link>
              ),
          )}
        </ul>
      )}
    </Box>
  );
}
