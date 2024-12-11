from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
from data_loader import load_dataset

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Mock Interview API"

@app.route('/questions')
def load_questions():
    file_name = "questions_dataset.csv"  # Adjust the path if necessary
    questions = load_dataset(file_name)
    
    if questions:
        return jsonify({"questions": questions})  # Using jsonify for proper JSON response
    return jsonify({"message": "Failed to load questions"}), 500  # Return a 500 error with a message

if __name__ == '__main__':
    app.run(debug=True)
