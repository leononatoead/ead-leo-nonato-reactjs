import { useState } from "react";
import QuestionsList from "./QuestionsList";
import QuizResult from "./QuizResult";

export default function Quiz({ videoPlayer, setVideoPlayer }) {
  const [quizData, setQuizData] = useState({
    isFinished: false,
    results: null,
  });

  return (
    <>
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
    </>
  );
}
