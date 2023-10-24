import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";
import { BsCheckLg } from "react-icons/bs";
import ResultsList from "./ResultsList";

export default function QuizResult({ quizData, setVideoPlayer }) {
  const [results, setResults] = useState({
    results: null,
    totalQuestions: null,
    questions: null,
    showAnswers: false,
  });

  const handleCloseList = () => {
    setVideoPlayer((prev) => ({
      ...prev,
      showVideoList: false,
      showAssetsList: false,
      showQuestionsList: false,
    }));
  };

  const handleShowAnswers = () => {
    setResults((prev) => ({
      ...prev,
      showAnswers: true,
    }));
  };

  useEffect(() => {
    const verify = quizData.results.filter(
      (question) => question.question.rightAnswer === question.userAnswer,
    );

    setResults({
      results: verify,
      totalQuestions: quizData.results.length,
      questions: quizData.results,
    });
  }, []);

  return (
    <>
      <Box className="flex items-center justify-between p-4 pb-2">
        <Text className="font-poppins text-normal font-medium leading-6">
          Resultado
        </Text>
        <button onClick={handleCloseList}>
          <RiCloseFill alt="close" size={20} />
        </button>
      </Box>
      {results.showAnswers ? (
        <ResultsList
          questionsList={results.questions}
          setResults={setResults}
        />
      ) : (
        <Box className="flex flex-grow flex-col justify-center gap-8 px-4 pb-6 pt-40">
          <Box className="relative flex items-center justify-center ">
            <Box className="circle"></Box>
            <BsCheckLg
              size={80}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform pr-2 text-green-200"
            />
          </Box>
          <Box className="flex w-full flex-grow flex-col items-center justify-between gap-2">
            <Box className="w-full text-center">
              <Text className="text-large font-medium">
                Você acertou {results?.results?.length} de{" "}
                {results?.totalQuestions}
              </Text>
              <Text className="mt-2 text-base">
                {results?.results?.length / results?.totalQuestions >= 0.8
                  ? "Parabéns, continue focado e praticando seus conhecimentos para obter os melhores resultados."
                  : results?.results?.length / results?.totalQuestions >= 0.5
                  ? "Poderia ser melhor, mas continue estudando e com o tempo irá pegar o conteúdo!"
                  : "Você precisa se concentrar mais, reveja o conteúdo, faça anotações e preste bastante atenção."}
              </Text>
            </Box>
            <button
              onClick={handleShowAnswers}
              className="w-full rounded-sm bg-primary-400 py-[6px] text-base  leading-5 text-white disabled:bg-gray-700"
            >
              Ver respostas
            </button>
          </Box>
        </Box>
      )}
    </>
  );
}
