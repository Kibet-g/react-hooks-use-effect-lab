import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect hook to handle the countdown timer
  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          onAnswered(false); // Call onAnswered with false when time runs out
          return 10; // Reset the timer to 10 seconds for the next question
        } else {
          return prevTime - 1; // Decrement timeRemaining by 1 second
        }
      });
    }, 1000); // Trigger the setTimeout every 1 second

    // Cleanup function to clear the timeout when the component unmounts or timeRemaining changes
    return () => clearTimeout(timerId);
  }, [timeRemaining, onAnswered]); // Re-run the effect when timeRemaining or onAnswered changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timeRemaining to 10 seconds when an answer is clicked
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
