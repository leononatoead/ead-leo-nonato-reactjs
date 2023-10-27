import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useUserData from "../../../../hooks/useUserData";
import { useLocation } from "react-router-dom";

import RadioGroupComponent from "./RadioGroup";
import { Box, Radio, Text } from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";

export default function QuestionsList({
  questionsList,
  setVideoPlayer,
  setQuizData,
}) {
  const [questions, setQuestions] = useState({});
  const [active, setActive] = useState({});

  const { pathname } = useLocation();
  const pathParams = pathname.split("/");
  const courseId = pathParams[2];
  const videoId = pathParams[3];

  const { user } = useSelector((state) => state.auth);
  const course = user?.courses?.find((course) => course.id === courseId);
  const video = course?.videos?.find((video) => video.id === videoId);

  const { changeQuizResult } = useUserData();

  const handleCloseList = () => {
    setVideoPlayer((prev) => ({
      ...prev,
      showVideoList: false,
      showAssetsList: false,
      showQuestionsList: false,
    }));
  };

  const handleSelectAnswer = (value) => {
    const updateUserAnswer = questions.map((question) => {
      if (question.question === active.question) {
        return { ...question, userAnswer: Number(value) };
      } else {
        return question;
      }
    });

    setActive((prev) => ({ ...prev, userAnswer: Number(value) }));
    setQuestions(updateUserAnswer);
  };

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
    const rightAnswers = questions.filter(
      (question) => question.question.rightAnswer === question.userAnswer,
    );

    const result = (rightAnswers.length / questions.length) * 100;
    const videoData = { ...video, quizResult: result };

    const updatedCourse = user?.courses?.map((c) => {
      if (c.id === courseId) {
        const videoList = c.videos.filter((v) => v.id !== video.id);
        const update = { ...c, videos: [...videoList, videoData] };
        return update;
      } else {
        return c;
      }
    });

    changeQuizResult(user.uid, updatedCourse);
    setQuizData((prev) => ({ ...prev, isFinished: true, results: questions }));
  };

  useEffect(() => {
    const createState = [];
    questionsList.forEach((question) =>
      createState.push({ question, userAnswer: null }),
    );

    setQuestions(createState);
    setActive(createState[0]);
  }, []);

  return (
    <Box>
      <Box className="flex items-center justify-between p-4 pb-2">
        <Text className="font-poppins text-normal font-medium leading-6">
          Atividade
        </Text>
        <button onClick={handleCloseList}>
          <RiCloseFill alt="close" size={20} />
        </button>
      </Box>
      <Box>
        {active && (
          <Box>
            <Text className="px-4 pb-8 pt-4">{active?.question?.question}</Text>
            <Box className="w-full border-b bg-gray-950"></Box>
            <RadioGroupComponent
              question={active.question}
              handleSelectAnswer={handleSelectAnswer}
            />
            {
              // <RadioGroup
              //   className="flex flex-col gap-4 px-4 py-6"
              //   onChange={handleSelectAnswer}
              // >
              //   <Box className="flex gap-4 border-l-[5px] border-l-gray-450 !bg-gray-150 px-5 py-4">
              //     <Radio
              //       value="1"
              //       size="lg"
              //       colorScheme="gray"
              //       className="!border-[3px] !border-gray-450 "
              //     >
              //       <Text className="ml-4 text-normal">
              //         {active?.question?.firstAnswer}
              //       </Text>
              //     </Radio>
              //   </Box>
              //   <Box className="flex gap-4 border-l-[5px] border-l-gray-450 !bg-gray-150 px-5 py-4">
              //     <Radio
              //       value="2"
              //       size="lg"
              //       colorScheme="gray"
              //       className="!border-[3px] !border-gray-450"
              //     >
              //       <Text className="ml-4 text-normal">
              //         {active?.question?.secondAnswer}
              //       </Text>
              //     </Radio>
              //   </Box>
              //   <Box className="flex gap-4 border-l-[5px] border-l-gray-450 !bg-gray-150 px-5 py-4">
              //     <Radio
              //       value="3"
              //       size="lg"
              //       colorScheme="gray"
              //       className="!border-[3px] !border-gray-450"
              //     >
              //       <Text className="ml-4 text-normal">
              //         {active?.question?.thirdAnswer}
              //       </Text>
              //     </Radio>
              //   </Box>
              //   <Box className="flex gap-4 border-l-[5px] border-l-gray-450 !bg-gray-150 px-5 py-4">
              //     <Radio
              //       value="4"
              //       size="lg"
              //       colorScheme="gray"
              //       className="!border-[3px] !border-gray-450"
              //     >
              //       <Text className="ml-4 text-normal">
              //         {active?.question?.fourthAnswer}
              //       </Text>
              //     </Radio>
              //   </Box>
              // </RadioGroup>
            }
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
              {questions[questions.length - 1]?.question !==
                active?.question && (
                <button
                  onClick={handleSelectNextQuestion}
                  className="w-1/2 rounded-sm bg-primary-400 py-[6px] text-base  leading-5 text-white disabled:bg-gray-700"
                  disabled={!active.userAnswer}
                >
                  Próxima
                </button>
              )}
              {questions[questions.length - 1]?.question ===
                active?.question && (
                <button
                  onClick={handleFinish}
                  className="w-1/2 rounded-sm bg-primary-400 py-[6px] text-base  leading-5 text-white disabled:bg-gray-700"
                  disabled={!active.userAnswer}
                >
                  Finalizar
                </button>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
