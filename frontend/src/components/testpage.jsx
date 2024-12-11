import React, { useState, useEffect } from 'react';

function Interview() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  // Fetch questions on component mount
  useEffect(() => {
    fetch('http://127.0.0.1:5000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswerChange = (index, answer) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = answer;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    fetch('http://127.0.0.1:5000/submit-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers })
    })
    .then(response => response.json())
    .then(data => setScore(data.score));
  };

  return (
    <div>
      <h1>Mock Interview</h1>
      {questions.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          <input
            type="radio"
            name={`question-${index}`}
            value="A"
            onChange={() => handleAnswerChange(index, 'A')}
          /> {q.option_a}
          <input
            type="radio"
            name={`question-${index}`}
            value="B"
            onChange={() => handleAnswerChange(index, 'B')}
          /> {q.option_b}
          <input
            type="radio"
            name={`question-${index}`}
            value="C"
            onChange={() => handleAnswerChange(index, 'C')}
          /> {q.option_c}
          <input
            type="radio"
            name={`question-${index}`}
            value="D"
            onChange={() => handleAnswerChange(index, 'D')}
          /> {q.option_d}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <p>Your score is: {score}</p>}
    </div>
  );
}

export default Interview;
