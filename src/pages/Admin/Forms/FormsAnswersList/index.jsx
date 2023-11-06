import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnswers } from "../../../../redux/modules/forms/actions";
import { Link, useLocation, useParams } from "react-router-dom";

import { Box, Text } from "@chakra-ui/react";
import { AiFillEye } from "react-icons/ai";

export default function FormsAnswersList() {
  const { id } = useParams();
  const { pathname } = useLocation();

  const { answers } = useSelector((state) => state.forms);

  const dispatch = useDispatch();

  const handleExportExcel = () => {
    console.log(answers);
  };

  useEffect(() => {
    if (!answers) {
      dispatch(fetchAnswers(id));
    }
  }, []);

  return (
    <Box className="main-container">
      <Box className="mb-6 flex items-center justify-start lg:mx-auto lg:max-w-5xl">
        <Text
          className={`mb-4 cursor-pointer font-poppins font-bold text-primary-600 `}
        >
          Alunos
        </Text>
        {/* <button onClick={handleExportExcel}>Exportar</button> */}
      </Box>

      {answers?.length > 0 ? (
        <ul className="flex w-full flex-col gap-2 lg:mx-auto lg:max-w-5xl">
          {answers.map((answer) => (
            <Link
              key={answer.id}
              to={`${pathname}/${answer.id}`}
              className=" w-full cursor-pointer gap-4 rounded-md border-[1px] border-gray-150 bg-white p-4 shadow-sm"
            >
              <li className="flex items-center justify-between text-justify text-normal font-semibold leading-4 text-primary-600">
                {answer?.user?.name}
                <AiFillEye size={20} className="text-primary-600" />
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <Box>Nenhuma resposta enviada.</Box>
      )}
    </Box>
  );
}
