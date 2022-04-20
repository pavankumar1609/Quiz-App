import React, { useEffect, useState } from "react";
import { questions } from "./services/quizServices";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [countScore, setCountScore] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setData(questions);
  }, []);

  const handlecurrentQuestion = (isCorrect) => {
    setIsSelected(true);

    if (isCorrect) setCountScore(countScore + 1);
  };

  const handleSubmit = () => {
    if (currentQuestion < data.length - 1 && isSelected)
      setcurrentQuestion(currentQuestion + 1);
    if (currentQuestion === data.length - 1) setShowScore(true);
  };

  const handleRestart = () => {
    setcurrentQuestion(0);
    setCountScore(0);
    setShowScore(false);
  };

  const handleStartQuiz = () => {
    setStartQuiz(true);
  };

  if (!startQuiz)
    return (
      <div className="quiz">
        <div className="score">
          <button onClick={handleStartQuiz}>Start Quiz</button>
          <div className="quiz-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
            rerum nesciunt hic temporibus consequatur eius eum blanditiis.
            Minima esse iste sequi reprehenderit optio! Eum, laudantium
            exercitationem? Dolorum officiis voluptatum ipsam?
          </div>
        </div>
      </div>
    );

  return (
    <main className="quiz">
      {showScore ? (
        <div className="score">
          <p>
            You scored {countScore} out of {data.length}
          </p>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <React.Fragment>
          <section className="quiz-question">
            <h1>
              Question {currentQuestion + 1} / {data.length}
            </h1>
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
            <button onClick={handleSubmit} className="submit-btn">
              Submit
            </button>
          </section>
        </React.Fragment>
      )}
    </main>
  );
}

export default App;
