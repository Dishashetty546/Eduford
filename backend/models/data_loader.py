import csv

def load_dataset(file_name):
    try:
        with open(file_name, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            questions = list(reader)
            return questions
    except FileNotFoundError:
        print(f"Error: The file '{file_name}' was not found.")
        return None

# Specify the file name
file_name = "questions_dataset.csv"

# Load and print the dataset
dataset = load_dataset(file_name)
if dataset:
    print("Dataset loaded successfully!")
    for i, question in enumerate(dataset[:5], start=1):  # Display the first 5 questions
        print(f"{i}. {question['question']} (Topic: {question['topic']}, Difficulty: {question['difficulty']})")
