import { useEffect, useState } from "react";

import { Alert, AlertIcon, Box, Text } from "@chakra-ui/react";

import { BiSolidCheckboxChecked } from "react-icons/bi";

export default function ResultsList({ questionsList, setResults }) {
  const [questions, setQuestions] = useState({});
  const [active, setActive] = useState({});

  const handleSelectNextQuestion = () => {
    const findQuestion = questions.findIndex(
      (question) => question.question === active.question,
    );

    setActive(questions[findQuestion + 1]);
  };

  const handleSelectLastQuestion = () => {
    const findQuestion = questions.findIndex(
      (question) => question.question === active.question,
    );

    setActive(questions[findQuestion - 1]);
  };

  const handleFinish = () => {
    setResults((prev) => ({ ...prev, showAnswers: false }));
  };

  useEffect(() => {
    setQuestions(questionsList);
    setActive(questionsList[0]);
  }, []);

  return (
    <Box>
      {active && (
        <Box>
          <Text className="px-4 pb-8 pt-4">{active?.question?.question}</Text>
          <Box className="w-full border-b bg-gray-950"></Box>
          <Box className="flex flex-col gap-4 px-4 py-6">
            <Alert
              status={active?.question?.rightAnswer === 1 ? "success" : "error"}
              variant="left-accent"
              className="flex gap-4  px-5 py-4"
            >
              <AlertIcon />
              <Box className="flex w-full items-center justify-between">
                <Text>{active?.question?.firstAnswer}</Text>
                <Text className="font-bold">
                  {active?.userAnswer === 1 && (
                    <BiSolidCheckboxChecked
                      size={30}
                      className="text-primary-400"
                    />
                  )}
                </Text>
              </Box>
            </Alert>
            <Alert
              status={active?.question?.rightAnswer === 2 ? "success" : "error"}
              variant="left-accent"
              className="flex gap-4  px-5 py-4"
            >
              <AlertIcon />
              <Box className="flex w-full items-center justify-between">
                <Text>{active?.question?.secondAnswer}</Text>
                <Text className="font-bold">
                  {active?.userAnswer === 2 && (
                    <BiSolidCheckboxChecked
                      size={30}
                      className="text-primary-400"
                    />
                  )}
                </Text>
              </Box>
            </Alert>
            <Alert
              status={active?.question?.rightAnswer === 3 ? "success" : "error"}
              variant="left-accent"
              className="flex gap-4  px-5 py-4"
            >
              <AlertIcon />
              <Box className="flex w-full items-center justify-between">
                <Text>{active?.question?.thirdAnswer}</Text>
                <Text className="font-bold">
                  {active?.userAnswer === 3 && (
                    <BiSolidCheckboxChecked
                      size={30}
                      className="text-primary-400"
                    />
                  )}
                </Text>
              </Box>
            </Alert>
            <Alert
              status={active?.question?.rightAnswer === 4 ? "success" : "error"}
              variant="left-accent"
              className="flex gap-4  px-5 py-4"
            >
              <AlertIcon />
              <Box className="flex w-full items-center justify-between">
                <Text>{active?.question?.fourthAnswer}</Text>
                <Text className="font-bold">
                  {active?.userAnswer === 4 && (
                    <BiSolidCheckboxChecked
                      size={30}
                      className="text-primary-400"
                    />
                  )}
                </Text>
              </Box>
            </Alert>
          </Box>
          <Box
            className={`flex w-full gap-4  px-4 ${
              questions[0]?.question === active?.question
                ? "justify-end"
                : "justify-between"
            }`}
          >
            {questions[0]?.question !== active?.question && (
              <button
                onClick={handleSelectLastQuestion}
                className="w-1/2 rounded-sm bg-primary-400 py-[6px] text-base  leading-5 text-white"
              >
                Anterior
              </button>
            )}
            {questions[questions.length - 1]?.question !== active?.question && (
              <button
                onClick={handleSelectNextQuestion}
                className="w-1/2 rounded-sm bg-primary-400 py-[6px] text-base  leading-5 text-white disabled:bg-gray-700"
              >
                Próxima
              </button>
            )}
            {questions[questions.length - 1]?.question === active?.question && (
              <button
                onClick={handleFinish}
                className="w-1/2 rounded-sm bg-primary-400 py-[6px] text-base  leading-5 text-white disabled:bg-gray-700"
              >
                Finalizar
              </button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
