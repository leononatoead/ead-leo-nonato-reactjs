import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnswers } from "../../../../../redux/modules/forms/actions";
import { useLocation } from "react-router-dom";

import { Box, Text } from "@chakra-ui/react";

export default function FormsAnswer() {
  const { pathname } = useLocation();
  const params = pathname.split("/");
  const id = params[4];
  const answerId = params[5];

  const dispatch = useDispatch();

  const { answers } = useSelector((state) => state.forms);
  const answer = answers?.find((answer) => answer.id === answerId);

  useEffect(() => {
    if (!answers) {
      dispatch(fetchAnswers(id));
    }
  }, []);

  return (
    <Box className="main-container">
      <Box className="lg:mx-auto lg:max-w-5xl">
        <Text className="mb-6 w-full text-center font-poppins text-[24px] font-bold text-primary-600">
          {answer?.user?.name}
        </Text>
        <Box className="flex flex-col gap-1">
          <Text>
            <span className="mr-2 font-bold">CPF:</span>
            {answer?.user?.cpf}
          </Text>
          <Text>
            <span className="mr-2 font-bold">E-mail:</span>
            {answer?.user?.email}
          </Text>
          <Text>
            <span className="mr-2 font-bold">Telefone:</span>
            {answer?.user?.phone}
          </Text>
        </Box>

        <Text className="my-6 font-poppins text-large font-bold text-primary-600">
          Respostas
        </Text>

        <ul className="flex flex-col gap-2">
          {answer?.answers?.map((a) => (
            <li>
              <Text className="text-normal font-bold">{a.question}</Text>
              <Text>{a.answer}</Text>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}
