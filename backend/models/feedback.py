from flask import Flask, request, jsonify
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import os

app = Flask(__name__)

# Load the dataset
def load_dataset(file_name):
    if not os.path.exists(file_name):
        raise FileNotFoundError(f"Dataset file not found: {file_name}")
    return pd.read_csv(file_name)

# Train the decision tree model
def train_model(data):
    # Copying the data to avoid 'view-versus-copy' warning
    X = data[['Topic', 'Difficulty']].copy()  
    y = data['Correct']
    
    # Encoding categorical values for model training
    topic_mapping = {topic: idx for idx, topic in enumerate(X['Topic'].unique())}
    difficulty_mapping = {'Easy': 1, 'Medium': 2, 'Hard': 3}

    # Mapping categorical data to numeric values
    X['Topic'] = X['Topic'].map(topic_mapping)
    X['Difficulty'] = X['Difficulty'].map(difficulty_mapping)
    
    # Train the decision tree model
    model = DecisionTreeClassifier()
    model.fit(X, y)
    
    return model, topic_mapping, difficulty_mapping

# Analyze user's performance and provide a strength/weakness report
def analyze_performance(user_answers, questions, model, topic_mapping, difficulty_mapping):
    X_test = []
    for i, question in questions.iterrows():
        topic_idx = topic_mapping[question['Topic']]
        difficulty_idx = difficulty_mapping[question['Difficulty']]
        X_test.append([topic_idx, difficulty_idx])  # Exclude "correct" for prediction

    # Predict the performance of the user
    predictions = model.predict(X_test)

    feedback = {topic: 0 for topic in topic_mapping.keys()}

    # Process predictions and increment feedback based on incorrect answers
    for i, pred in enumerate(predictions):
        if pred == 0:  # If the answer was incorrect
            feedback[questions.iloc[i]['Topic']] += 1

    return feedback

# Generate feedback message (strengths and weaknesses)
def generate_feedback_message(feedback):
    strengths = []
    weaknesses = []
    
    # Iterate through feedback and categorize topics as strengths or weaknesses
    for topic, errors in feedback.items():
        if errors == 0:
            strengths.append(topic)
        else:
            weaknesses.append(topic)
    
    # Create the feedback message
    feedback_message = ""
    
    # For strengths
    if strengths:
        feedback_message += f"User is strong in {', '.join(strengths)}. "
    
    # For weaknesses
    if weaknesses:
        feedback_message += f"User is weak in {', '.join(weaknesses)}."

    return feedback_message

@app.route('/feedback', methods=['POST'])
def feedback():
    try:
        # Extract JSON data from request
        content = request.json
        user_answers = content['answers']
        dataset_path = content['dataset_path']

        dataset_path = os.path.abspath(dataset_path)

        # Load the dataset
        data = load_dataset(dataset_path)

        # Prepare questions data and add correctness column
        questions = data[['Topic', 'Difficulty', 'Correct Answer']]
        data['Correct'] = [
            1 if user_answers[i] == row['Correct Answer'] else 0 for i, row in data.iterrows()
        ]
        
        # Train the model using the data
        model, topic_mapping, difficulty_mapping = train_model(data)

        # Analyze the user's performance
        feedback = analyze_performance(user_answers, questions, model, topic_mapping, difficulty_mapping)

        # Generate the feedback message
        feedback_message = generate_feedback_message(feedback)

        # Return both detailed and general feedback as JSON response
        return jsonify({
            'feedback': feedback_message,
            'detailed_feedback': feedback
        })

    except Exception as e:
        # Handle any errors that might occur
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
