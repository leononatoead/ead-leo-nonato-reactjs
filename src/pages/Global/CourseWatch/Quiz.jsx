import { useState } from "react";
import QuestionsList from "./QuestionsList";
import QuizResult from "./QuizResult";
import { Box } from "@chakra-ui/react";

export default function Quiz({ videoPlayer, setVideoPlayer }) {
  const [quizData, setQuizData] = useState({
    isFinished: false,
    results: null,
  });

  return (
    <Box
      className={`bottom-0 w-full bg-white ${
        videoPlayer.showQuestionsList && "flex-grow"
      } pb-6`}
    >
      {quizData.isFinished ? (
        <QuizResult
          videoPlayer={videoPlayer}
          setVideoPlayer={setVideoPlayer}
          quizData={quizData}
        />
      ) : (
        <QuestionsList
          questionsList={videoPlayer.active.questionsList}
          videoPlayer={videoPlayer}
          setVideoPlayer={setVideoPlayer}
          quizData={quizData}
          setQuizData={setQuizData}
        />
      )}
    </Box>
  );
}
