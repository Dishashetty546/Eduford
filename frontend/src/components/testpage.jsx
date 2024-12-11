import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; 
import './app.css';
function Interview() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  // Fetch questions on component mount
  useEffect(() => {
    fetch('http://localhost:5000/questions')
      .then(response => response.json())
      .then(data => {
        console.log("Received data:", data);  // Check the structure of data
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
    fetch('http://localhost:5000/submit-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    })
      .then(response => response.json())
      .then(data => setScore(data.score))
      .catch(error => console.error('Error submitting answers:', error));
  };

  return (
    <div>
      <h1>Mock Interview</h1>
      {/* Check if questions exist and are an array */}
      {questions && Array.isArray(questions) && questions.length > 0 ? (
        questions.map((q, index) => (
          <div key={index}>
            <h3>{q.Topic}</h3>
            <p>{q.Question}</p>
            <div>
              <input
                type="radio"
                name={`question-${index}`}
                value="A"
                onChange={() => handleAnswerChange(index, 'A')}
              /> {q['Option A']}
            </div>
            <div>
              <input
                type="radio"
                name={`question-${index}`}
                value="B"
                onChange={() => handleAnswerChange(index, 'B')}
              /> {q['Option B']}
            </div>
            <div>
              <input
                type="radio"
                name={`question-${index}`}
                value="C"
                onChange={() => handleAnswerChange(index, 'C')}
              /> {q['Option C']}
            </div>
            <div>
              <input
                type="radio"
                name={`question-${index}`}
                value="D"
                onChange={() => handleAnswerChange(index, 'D')}
              /> {q['Option D']}
            </div>
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <p>Your score is: {score}</p>}
    </div>
  );
}

export default Interview;
