import React, { useEffect, useState } from "react";
import { questions } from "./services/quizServices";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [countScore, setCountScore] = useState(0);

  useEffect(() => {
    setData(questions);
  }, []);

  const handlecurrentQuestion = (isCorrect) => {
    if (isCorrect) setCountScore(countScore + 1);

    if (currentQuestion < data.length - 1)
      setcurrentQuestion(currentQuestion + 1);
    else setShowScore(true);
  };

  return (
    <main className="quiz">
      {showScore ? (
        <p>
          You scored {countScore} out of {data.length}
        </p>
      ) : (
        <React.Fragment>
          <section className="quiz-question">
            <p>
              Question {currentQuestion + 1} / {data.length}
            </p>
            <p>{data[currentQuestion] && data[currentQuestion].questionText}</p>
          </section>
          <section className="quiz-options">
            {data[currentQuestion] &&
              data[currentQuestion].questionOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handlecurrentQuestion(option.isCorrect)}
                >
                  {option.id + ". "}
                  {option.answerText}
                </button>
              ))}
          </section>
        </React.Fragment>
      )}
    </main>
  );
}

export default App;
