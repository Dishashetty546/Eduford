const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

function loadDataset(fileName) {
  const questions = [];
  const filePath = path.join(__dirname, fileName);

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // Normalize keys by trimming and accessing properly
        questions.push({
          topic: row["Topic"],
          question: row["Question"],
          optionA: row["Option A"],
          optionB: row["Option B"],
          optionC: row["Option C"],
          optionD: row["Option D"],
          correctAnswer: row["Correct Answer"],
          difficulty: row["Difficulty"],
          explanation: row["Explanation"],
        });
      })
      .on("end", () => {
        resolve(questions);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// Load and print the dataset
const fileName = "../models/questions_dataset.csv";
loadDataset(fileName)
  .then((dataset) => {
    console.log("Dataset loaded successfully!");
    dataset.slice(0, 5).forEach((question, index) => {
      console.log(
        `${index + 1}. ${question.question} (Topic: ${
          question.topic
        }, Difficulty: ${question.difficulty})`
      );
    });
  })
  .catch((error) => {
    console.error("Error loading dataset:", error.message);
  });
