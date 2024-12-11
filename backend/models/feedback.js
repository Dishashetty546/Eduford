// backend/routes/feedbackRoutes.js

const express = require("express");
const router = express.Router();

// Example dataset for questions (can be loaded from CSV or database)
const questionsDataset = [
  {
    topic: "Arrays",
    question:
      "What is the time complexity of searching for an element in an unsorted array?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    correctAnswer: "C",
    difficulty: "Easy",
    explanation:
      "In the worst case, you might have to search through the entire array to find the element, which takes O(n) time.",
  },
  {
    topic: "Strings",
    question:
      "Which of the following methods is used to compare two strings in Java?",
    options: ["compare()", "equals()", "compareTo()", "Both B and C"],
    correctAnswer: "D",
    difficulty: "Medium",
    explanation:
      "In Java, equals() checks for content equality, while compareTo() compares lexicographically.",
  },
  {
    topic: "Sorting",
    question: "What is the best case time complexity of QuickSort?",
    options: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"],
    correctAnswer: "B",
    difficulty: "Hard",
    explanation:
      "In the best case, QuickSort partitions the array into two equal halves, resulting in O(n log n) complexity.",
  },
  {
    topic: "Trees",
    question:
      "What is the height of a binary tree with n nodes in the worst case?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctAnswer: "A",
    difficulty: "Medium",
    explanation:
      "In the worst case, the binary tree can become a skewed tree (like a linked list), resulting in a height of O(n).",
  },
];

// Helper function to generate feedback based on user answers
function generateFeedback(answers, questions) {
  let score = 0;
  let topicWeakness = {};

  answers.forEach((answer, index) => {
    const question = questions[index];
    const userAnswer = answer.answer; // User's submitted answer (A, B, C, D)

    if (userAnswer === question.correctAnswer) {
      score++;
    } else {
      // Track weak areas (topics)
      topicWeakness[question.topic] = (topicWeakness[question.topic] || 0) + 1;
    }
  });

  // Calculate percentage score
  const percentageScore = (score / questions.length) * 100;

  // Generate feedback based on score
  let feedback = "";
  if (percentageScore >= 80) {
    feedback = "Great job! You have a solid understanding of the topics.";
  } else if (percentageScore >= 50) {
    feedback =
      "Good work! Focus more on specific topics like Arrays and Algorithms.";
  } else {
    feedback =
      "You need to focus more on key topics like Arrays and Data Structures.";
  }

  // Generate topic-based suggestions based on weak areas
  const areasToImprove = Object.keys(topicWeakness).map((topic) => {
    return `Improve your knowledge in ${topic}.`;
  });

  return { score: Math.round(percentageScore), feedback, areasToImprove };
}

// Route to handle feedback generation after user submits answers
router.post("/feedback", (req, res) => {
  const { answers } = req.body; // User's answers to questions

  const feedbackData = generateFeedback(answers, questionsDataset);
  res.json(feedbackData); // Return score, feedback, and areas to improve
});

module.exports = router;
