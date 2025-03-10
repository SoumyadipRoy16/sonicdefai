#aiagent/app.py
from flask import Flask, request, jsonify
import asyncio
import main
import agent
import os

app = Flask(__name__)

@app.route('/analyze', methods=['GET'])
def analyze():
    # Get the username from the query parameters
    username = request.args.get('username')
    
    if not username:
        return jsonify({"error": "Username is required"}), 400
    
    # Fetch tweets for the provided username
    try:
        csv_file_path = asyncio.run(main.fetch_tweets_for_user(username))
    except Exception as e:
        return jsonify({"error": f"Failed to fetch tweets: {str(e)}"}), 500
    
    # Check if the CSV file was created
    if not os.path.exists(csv_file_path):
        return jsonify({"error": "Failed to create CSV file"}), 500
    
    # Analyze the tweets using agent.py
    analyzer = agent.CelebrityCryptoAnalyzer()
    if not analyzer.load_data(csv_file_path):
        return jsonify({"error": "Failed to load data for analysis"}), 500
    
    # Generate the report
    report = analyzer.generate_memecoin_trends_report()
    
    # Return the report as JSON
    return jsonify(report)

if __name__ == '__main__':
    app.run(debug=True)