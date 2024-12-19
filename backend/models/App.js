const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const app = express();

app.use(cors());
app.use(express.json());

// Function to load dataset from CSV file
function loadDataset(fileName) {
  return new Promise((resolve, reject) => {
    const questions = [];
    fs.createReadStream(fileName)
      .pipe(csv())
      .on("data", (row) => {
        questions.push(row);
      })
      .on("end", () => {
        resolve(questions);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Mock Interview API");
});

// Questions route
app.get("/questions", async (req, res) => {
  const fileName = path.join(__dirname, "../models/questions_dataset.csv"); // Adjust path if necessary
  try {
    const questions = await loadDataset(fileName);
    res.json({ questions });
  } catch (error) {
    console.error("Failed to load questions:", error);
    res.status(500).json({ message: "Failed to load questions" });
  }
});

// Submitted answers route
app.post("/submitted-answers", async (req, res) => {
  const userAnswers = req.body.answers;
  const fileName = path.join(__dirname, "../models/questions_dataset.csv");

  try {
    const questions = await loadDataset(fileName);
    let score = 0;
    const totalQuestions = questions.length;

    // Compare user answers with correct answers
    questions.forEach((question, index) => {
      if (userAnswers[index] === question["Correct Answer"]) {
        score++;
      }
    });

    // Calculate percentage and feedback
    const percentage = (score / totalQuestions) * 100;
    let feedback = "Keep practicing!";
    if (percentage >= 80) {
      feedback = "Excellent work!";
    } else if (percentage >= 50) {
      feedback = "Good job, but there's room for improvement.";
    }

    // Additional feedback based on topic performance
    const topicFeedback = {};
    questions.forEach((question, index) => {
      if (userAnswers[index] !== question["Correct Answer"]) {
        // Track lagging topics
        topicFeedback[question["Topic"]] =
          topicFeedback[question["Topic"]] || 0;
        topicFeedback[question["Topic"]]++;
      }
    });

    // Respond with score, feedback, and topic feedback
    res.json({ score, feedback, topicFeedback });
  } catch (error) {
    console.error("Error processing submitted answers:", error);
    res.status(500).json({ message: "Failed to process answers" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
