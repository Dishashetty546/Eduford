const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Define the dataset
const questions = [
  {
    topic: "Arrays",
    question:
      "What is the time complexity of searching for an element in an unsorted array?",
    option_a: "O(1)",
    option_b: "O(log n)",
    option_c: "O(n)",
    option_d: "O(n^2)",
    correct_answer: "C",
    difficulty: "Easy",
    explanation:
      "In the worst case, you might have to search through the entire array to find the element, which takes O(n) time.",
  },
  {
    topic: "Strings",
    question:
      "Which of the following methods is used to compare two strings in Java?",
    option_a: "compare()",
    option_b: "equals()",
    option_c: "compareTo()",
    option_d: "Both B and C",
    correct_answer: "D",
    difficulty: "Medium",
    explanation:
      "In Java, equals() checks for content equality, while compareTo() compares lexicographically.",
  },
  {
    topic: "Sorting",
    question: "What is the best case time complexity of QuickSort?",
    option_a: "O(n^2)",
    option_b: "O(n log n)",
    option_c: "O(n)",
    option_d: "O(log n)",
    correct_answer: "B",
    difficulty: "Hard",
    explanation:
      "In the best case, QuickSort partitions the array into two equal halves, resulting in O(n log n) complexity.",
  },
  {
    topic: "Trees",
    question:
      "What is the height of a binary tree with n nodes in the worst case?",
    option_a: "O(n)",
    option_b: "O(log n)",
    option_c: "O(n log n)",
    option_d: "O(1)",
    correct_answer: "A",
    difficulty: "Medium",
    explanation:
      "In the worst case, the binary tree can become a skewed tree (like a linked list), resulting in a height of O(n).",
  },
];

// Specify the file name
const fileName = "questions_dataset.csv";

// Create the CSV writer
const csvWriter = createCsvWriter({
  path: fileName,
  header: [
    { id: "topic", title: "Topic" },
    { id: "question", title: "Question" },
    { id: "option_a", title: "Option A" },
    { id: "option_b", title: "Option B" },
    { id: "option_c", title: "Option C" },
    { id: "option_d", title: "Option D" },
    { id: "correct_answer", title: "Correct Answer" },
    { id: "difficulty", title: "Difficulty" },
    { id: "explanation", title: "Explanation" },
  ],
});

// Write to the CSV file
csvWriter
  .writeRecords(questions)
  .then(() => {
    console.log(`Dataset saved to ${fileName}`);
  })
  .catch((err) => {
    console.error("Error writing CSV file:", err);
  });
