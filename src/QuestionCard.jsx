import React, { useState, useEffect } from "react";
import "./Quiz.css";

function QuestionCard({ questionData, questionNumber, totalQuestions, onNext, onAnswer }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // TIMER LOGIC
  useEffect(() => {
    if (showResult) 
        return; // stop timer if result shown
        

    if (timeLeft === 0) {
      setShowResult(true);
      onAnswer(false); // time ran out, count as wrong
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult, onAnswer]);

  // HANDLE OPTION CLICK
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowResult(true);

    if (option === questionData.correctAnswer) {
      onAnswer(true);
    } else {
      onAnswer(false);
    }
  };

  // NEXT QUESTION
  const handleNext = () => {
    setTimeLeft(60);
    setSelectedOption(null);
    setShowResult(false);
    onNext();
  };

  return (
    <div className="quiz-container">
      {/* TIMER INSIDE CARD */}
      <div className={`quiz-timer ${timeLeft <= 10 ? "timer-warning" : ""}`}>
        ⏱ Time Left: {timeLeft}s
      </div>

      <p className="quiz-progress">
        Question {questionNumber} of {totalQuestions}
      </p>

      <div className="top-progress">
        <div
          className="top-progress-fill"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        ></div>
      </div>

      <h3 className="quiz-question">{questionData.question}</h3>

      <div className="options-container">
        {questionData.options.map((option, index) => {
          let className = "option-button";

          if (showResult) {
            if (option === questionData.correctAnswer) {
              className += " correct";
            } else if (option === selectedOption) {
              className += " wrong";
            }
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => handleOptionClick(option)}
              disabled={showResult}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showResult && (
        <button className="quiz-button next-button" onClick={handleNext}>
          Next Question
        </button>
      )}
    </div>
  );
}

export default QuestionCard;
