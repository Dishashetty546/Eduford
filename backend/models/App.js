const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser"); // For parsing CSV files

const app = express();

// Enable CORS for all routes
app.use(cors());

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

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
