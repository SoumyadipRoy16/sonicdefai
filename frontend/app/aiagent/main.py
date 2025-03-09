from flask import Flask, jsonify
from fetch_tweets import fetch_tweets
from analyze_tweets import analyze_tweets
from create_celebrity_data import create_celebrity_data

app = Flask(__name__)

@app.route('/analyze/<username>')
def analyze(username):
    """
    API endpoint to analyze tweets for a given celebrity.
    :param username: Twitter handle of the celebrity
    :return: JSON response with celebrity data
    """
    tweets = fetch_tweets(username)
    if not tweets:
        return jsonify({"error": "No tweets found or unable to fetch tweets"}), 404

    keyword_counts = analyze_tweets(tweets)
    celebrity_data = create_celebrity_data(username, tweets, keyword_counts)
    if not celebrity_data:
        return jsonify({"error": "Unable to fetch celebrity details"}), 500

    return jsonify(celebrity_data)

if __name__ == '__main__':
    app.run(debug=True)