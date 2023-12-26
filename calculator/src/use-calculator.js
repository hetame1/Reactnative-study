import React, { useState } from "react";

const useCalculator = () => {
  const [input, setInput] = useState(0);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [result, setResult] = useState(null);
  const [tempInput, setTempInput] = useState(null);
  const [tempOperation, setTempOperation] = useState(null);
  const [isClickedOperator, setIsClickedOperator] = useState(false);
  const [isClickedEqual, setIsClickedEqual] = useState(false);

  const hasInput = !!input;

  const onPressNum = (num) => {
    if (currentOperation && isClickedOperator) {
      setResult(input);
      setInput(num);
      setIsClickedOperator(false);
    } else {
      const newInput = Number(`${input}${num}`);
      setInput(newInput);
    }
  };

  const onPressOperator = (operator) => {
    if (operator !== "=") {
      setCurrentOperation(operator);
      setIsClickedOperator(true);
      setIsClickedEqual(false);
    } else {
      let finalResult = result;
      const finalInput = isClickedEqual ? tempInput : input;
      const finalOperation = isClickedEqual ? tempOperation : currentOperation;
      switch (finalOperation) {
        case "+":
          finalResult = result + finalInput;
          break;
        case "-":
          finalResult = result - finalInput;
          break;
        case "*":
          finalResult = result * finalInput;
          break;
        case "/":
          finalResult = result / finalInput;
          break;
        default:
          break;
      }
      setResult(finalResult);
      setInput(finalResult);
      setTempInput(finalInput);
      setCurrentOperation(null);
      setTempOperation(finalOperation);
      setIsClickedEqual(true);
    }
  };

  const onPressReset = () => {
    if (hasInput) {
      setInput(0);
    } else {
      setInput(0);
      setCurrentOperation(null);
      setResult(null);
      setTempInput(null);
      setTempOperation(null);
    }
  };

  return {
    input,
    currentOperation,
    result,
    tempInput,
    tempOperation,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  };
};

export default useCalculator;
