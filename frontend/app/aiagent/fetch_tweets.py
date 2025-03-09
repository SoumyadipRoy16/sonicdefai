import tweepy
import os
import time
from dotenv import load_dotenv
from functools import lru_cache

# Load environment variables from .env file
load_dotenv()

# Fetch Twitter API credentials from environment variables
BEARER_TOKEN = os.getenv("BEARER_TOKEN")

# Check if credentials are loaded
if not BEARER_TOKEN:
    raise ValueError("Bearer token is missing. Please check your .env file.")

# Authenticate to Twitter
client = tweepy.Client(bearer_token=BEARER_TOKEN)

# Global variables to track rate limit state
rate_limit_remaining = 150  # Default value for timeline lookup
rate_limit_reset = int(time.time()) + 900  # Default reset time (15 minutes)

def check_rate_limit():
    """
    Checks the current rate limit status and waits if necessary.
    """
    global rate_limit_remaining, rate_limit_reset

    if rate_limit_remaining <= 1:  # If remaining requests are low
        reset_time = rate_limit_reset - int(time.time())
        if reset_time > 0:
            print(f"Rate limit almost exhausted. Waiting for {reset_time} seconds...")
            time.sleep(reset_time + 1)  # Wait until the rate limit resets

@lru_cache(maxsize=100)
def fetch_tweets(username, count=10):
    """
    Fetches tweets from a specific user with rate limiting.
    :param username: Twitter handle of the celebrity
    :param count: Number of tweets to fetch (default: 10)
    :return: List of tweet objects
    """
    global rate_limit_remaining, rate_limit_reset

    try:
        # Check rate limit before making a request
        check_rate_limit()

        # Fetch user ID using the username
        user = client.get_user(username=username)
        if not user.data:
            return []

        user_id = user.data.id

        # Fetch tweets using the user ID
        tweets = client.get_users_tweets(
            id=user_id,
            max_results=count,
            tweet_fields=["created_at", "public_metrics"]
        )

        # Update rate limit information
        rate_limit_remaining = int(tweets.meta.get('remaining', 150))
        rate_limit_reset = int(tweets.meta.get('reset', time.time() + 900))
        print(f"Rate limit remaining: {rate_limit_remaining}")
        print(f"Rate limit reset time: {rate_limit_reset}")

        if not tweets.data:
            return []

        return tweets.data

    except tweepy.TweepyException as e:
        print(f"Error fetching tweets: {e}")
        return []