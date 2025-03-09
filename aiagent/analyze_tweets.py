import nltk
from nltk.corpus import stopwords
from collections import Counter

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('stopwords')

def extract_keywords(tweet_text):
    """
    Extracts keywords from a tweet.
    :param tweet_text: Full text of the tweet
    :return: List of keywords
    """
    stop_words = set(stopwords.words('english'))
    words = nltk.word_tokenize(tweet_text)
    keywords = [word for word in words if word.isalnum() and word.lower() not in stop_words]
    return keywords

def analyze_tweets(tweets):
    """
    Analyzes a list of tweets to find trending keywords.
    :param tweets: List of tweet objects
    :return: Counter object with keyword frequencies
    """
    all_keywords = []
    for tweet in tweets:
        keywords = extract_keywords(tweet.text)
        all_keywords.extend(keywords)
    keyword_counts = Counter(all_keywords)
    return keyword_counts