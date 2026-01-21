import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import "./Quiz.css";

function App() {
  const questions = [
    {
      question: "What is React?",
      options: [
        "A Programming Language",
        "A JavaScript Library",
        "A Database",
        "A Web Browser"
      ],
      correctAnswer: "A JavaScript Library"
    },
    {
      question: "What is JSX?",
      options: [
        "A CSS Framework",
        "HTML inside JavaScript",
        "A Database",
        "A Browser API"
      ],
      correctAnswer: "HTML inside JavaScript"
    },
    {
      question: "What is State in React?",
      options: [
        "Static data",
        "CSS Styling",
        "Data that changes over time",
        "Server Data"
      ],
      correctAnswer: "Data that changes over time"
    },
    {
      question: "Which Hook handles side effects?",
      options: [
        "useState",
        "useEffect",
        "useRef",
        "useMemo"
      ],
      correctAnswer: "useEffect"
    },
    {
      question: "Why is React fast?",
      options: [
        "Because of Virtual DOM",
        "Because it reloads pages",
        "Because it uses SQL",
        "Because it avoids State"
      ],
      correctAnswer: "Because of Virtual DOM"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
  };

  // Quiz completed screen
  if (currentIndex >= questions.length) {
    return (
      <div className="app-wrapper">
        <div className="quiz-container">
          <h2 className="quiz-completed">🎉 Quiz Completed!</h2>
          <p style={{ fontSize: "1.1rem", marginTop: "12px", textAlign: "center" }}>
            You answered {score} out of {questions.length} questions correctly ✅
          </p>
          <button className="quiz-button" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <div>
        <h1 className="app-title">React Quiz🎯</h1>
        <p className="app-subtitle">Test your knowledge</p>

        <QuestionCard
          questionData={questions[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          onNext={nextQuestion}
          onAnswer={handleAnswer} // track score for final result
        />
      </div>
    </div>
  );
}

export default App;
