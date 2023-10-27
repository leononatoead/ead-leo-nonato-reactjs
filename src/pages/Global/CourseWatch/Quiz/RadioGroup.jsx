import { useEffect, useRef } from "react";

import { Flex } from "@chakra-ui/react";

export default function RadioGroupComponent({ question, handleSelectAnswer }) {
  const firstRadioRef = useRef(null);
  const secondRadioRef = useRef(null);
  const thirdRadioRef = useRef(null);
  const fourthRadioRef = useRef(null);

  const handleSelectInput = (value) => {
    handleSelectAnswer(value);
    if (
      value === "1" &&
      firstRadioRef.current &&
      !firstRadioRef.current.checked
    ) {
      firstRadioRef.current.checked = true;
      return;
    }
    if (
      value === "2" &&
      secondRadioRef.current &&
      !secondRadioRef.current.checked
    ) {
      secondRadioRef.current.checked = true;
      return;
    }
    if (
      value === "3" &&
      thirdRadioRef.current &&
      !thirdRadioRef.current.checked
    ) {
      thirdRadioRef.current.checked = true;
      return;
    }
    if (
      value === "4" &&
      fourthRadioRef.current &&
      !fourthRadioRef.current.checked
    ) {
      fourthRadioRef.current.checked = true;
      return;
    }
  };

  useEffect(() => {
    firstRadioRef.current.checked = false;
    secondRadioRef.current.checked = false;
    thirdRadioRef.current.checked = false;
    fourthRadioRef.current.checked = false;
  }, [question]);

  return (
    <Flex
      flexDirection={"column"}
      gap={4}
      alignItems={"flex-start"}
      px={4}
      py={6}
    >
      <label
        htmlFor="firstAnswer"
        onClick={() => handleSelectInput("1")}
        className="flex w-full gap-4 border-l-[5px] border-l-gray-450 !bg-gray-150 px-5 py-4"
      >
        <input ref={firstRadioRef} type="radio" name="answer" />
        {question?.firstAnswer}
      </label>

      <label
        htmlFor="secondAnswer"
        onClick={() => handleSelectInput("2")}
        className="flex w-full gap-4 border-l-[5px] border-l-gray-450 !bg-gray-150 px-5 py-4"
      >
        <input ref={secondRadioRef} type="radio" name="answer" />
        {question?.secondAnswer}
      </label>

      <label
        htmlFor="thirdAnswer"
        onClick={() => handleSelectInput("3")}
        className="flex w-full gap-4 border-l-[5px] border-l-gray-450 !bg-gray-150 px-5 py-4"
      >
        <input ref={thirdRadioRef} type="radio" name="answer" />
        {question?.thirdAnswer}
      </label>

      <label
        htmlFor="fourthAnswer"
        onClick={() => handleSelectInput("4")}
        className="flex w-full gap-4 border-l-[5px] border-l-gray-450 !bg-gray-150 px-5 py-4"
      >
        <input ref={fourthRadioRef} type="radio" name="answer" />
        {question?.fourthAnswer}
      </label>
    </Flex>
  );
}
