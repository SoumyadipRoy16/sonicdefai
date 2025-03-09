import tweepy
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch Twitter API credentials from environment variables
API_KEY = os.getenv("API_KEY")
API_SECRET_KEY = os.getenv("API_SECRET_KEY")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET")

# Check if credentials are loaded
if not all([API_KEY, API_SECRET_KEY, ACCESS_TOKEN, ACCESS_TOKEN_SECRET]):
    raise ValueError("One or more Twitter API credentials are missing. Please check your .env file.")

# Authenticate to Twitter
auth = tweepy.OAuth1UserHandler(API_KEY, API_SECRET_KEY, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)

def fetch_tweets(username, count=10):
    """
    Fetches tweets from a specific user.
    :param username: Twitter handle of the celebrity
    :param count: Number of tweets to fetch (default: 10)
    :return: List of tweet objects
    """
    try:
        tweets = api.user_timeline(screen_name=username, count=count, tweet_mode="extended")
        return tweets
    except tweepy.TweepyException as e:  # Updated to use TweepyException
        print(f"Error fetching tweets: {e}")
        return []