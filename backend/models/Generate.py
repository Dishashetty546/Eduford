import csv

# Define the dataset
questions = [
    {
        "topic": "Arrays",
        "question": "What is the time complexity of searching for an element in an unsorted array?",
        "option_a": "O(1)",
        "option_b": "O(log n)",
        "option_c": "O(n)",
        "option_d": "O(n^2)",
        "correct_answer": "C",
        "difficulty": "Easy",
        "explanation": "In the worst case, you might have to search through the entire array to find the element, which takes O(n) time."
    },
    {
        "topic": "Strings",
        "question": "Which of the following methods is used to compare two strings in Java?",
        "option_a": "compare()",
        "option_b": "equals()",
        "option_c": "compareTo()",
        "option_d": "Both B and C",
        "correct_answer": "D",
        "difficulty": "Medium",
        "explanation": "In Java, equals() checks for content equality, while compareTo() compares lexicographically."
    },
    # Add 18 more questions here with the same structure
    {
        "topic": "Sorting",
        "question": "What is the best case time complexity of QuickSort?",
        "option_a": "O(n^2)",
        "option_b": "O(n log n)",
        "option_c": "O(n)",
        "option_d": "O(log n)",
        "correct_answer": "B",
        "difficulty": "Hard",
        "explanation": "In the best case, QuickSort partitions the array into two equal halves, resulting in O(n log n) complexity."
    },
    {
        "topic": "Trees",
        "question": "What is the height of a binary tree with n nodes in the worst case?",
        "option_a": "O(n)",
        "option_b": "O(log n)",
        "option_c": "O(n log n)",
        "option_d": "O(1)",
        "correct_answer": "A",
        "difficulty": "Medium",
        "explanation": "In the worst case, the binary tree can become a skewed tree (like a linked list), resulting in a height of O(n)."
    }
]

# Specify the file name
file_name = "questions_dataset.csv"

# Write to CSV file
with open(file_name, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=["topic", "question", "option_a", "option_b", "option_c", "option_d", "correct_answer", "difficulty", "explanation"])
    writer.writeheader()
    for question in questions:
        writer.writerow(question)

print(f"Dataset saved to {file_name}")
