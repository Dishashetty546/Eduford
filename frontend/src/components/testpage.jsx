import React, { useState, useEffect } from 'react';
import './app.css';

function Interview() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState('');

  // Fetch questions on component mount
  useEffect(() => {
    fetch('http://localhost:5000/questions')
      .then(response => response.json())
      .then(data => {
        if (data && data.questions) {
          setQuestions(data.questions);
        } else {
          console.error('Expected an object with a "questions" property');
        }
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleAnswerChange = (index, answer) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = answer;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    if (answers.length !== questions.length || answers.includes(undefined)) {
      alert('Please answer all the questions!');
      return;
    }

    fetch('http://localhost:5000/submitted-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    })
      .then(response => response.json())
      .then(data => {
        setScore(data.score);
        setFeedback(data.feedback); // Add feedback handling
      })
      .catch(error => console.error('Error submitting answers:', error));
  };

  return (
    <div className="test-page">
      <h1>Mock Interview</h1>
      {questions && Array.isArray(questions) && questions.length > 0 ? (
        questions.map((q, index) => (
          <div key={index} className="question">
            <h3>{q.Topic}</h3>
            <p>{q.Question}</p>
            <div className="options">
              <input
                type="radio"
                name={`question-${index}`}
                value="A"
                onChange={() => handleAnswerChange(index, 'A')}
              />
              <label>{q['Option A']}</label>
            </div>
            <div className="options">
              <input
                type="radio"
                name={`question-${index}`}
                value="B"
                onChange={() => handleAnswerChange(index, 'B')}
              />
              <label>{q['Option B']}</label>
            </div>
            <div className="options">
              <input
                type="radio"
                name={`question-${index}`}
                value="C"
                onChange={() => handleAnswerChange(index, 'C')}
              />
              <label>{q['Option C']}</label>
            </div>
            <div className="options">
              <input
                type="radio"
                name={`question-${index}`}
                value="D"
                onChange={() => handleAnswerChange(index, 'D')}
              />
              <label>{q['Option D']}</label>
            </div>
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && (
        <>
          <div className="score">Your score is: {score}</div>
          <div className="feedback">Feedback: {feedback}</div>
        </>
      )}
    </div>
  );
}

export default Interview;
