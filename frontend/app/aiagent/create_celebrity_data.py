import tweepy
import os
from analyze_tweets import extract_keywords

# Fetch Twitter API credentials from environment variables
BEARER_TOKEN = os.getenv("BEARER_TOKEN")

# Authenticate to Twitter
client = tweepy.Client(bearer_token=BEARER_TOKEN)

def fetch_user_account_info(username):
    """
    Fetches user account information using the Twitter API.
    :param username: Twitter handle of the celebrity
    :return: Dictionary containing user details and public metrics
    """
    try:
        response = client.get_user(
            username=username,
            user_fields=["created_at", "description", "public_metrics", "profile_image_url", "verified"]
        )
        user = response.data

        # Extract relevant fields
        values = {
            "user_id": user.id,
            "username": user.username,
            "name": user.name,
            "created_at": user.created_at,
            "description": user.description,
            "avatar": user.profile_image_url,
            "verified": user.verified
        }
        values.update(user.public_metrics)  # Add public metrics (e.g., followers_count, tweet_count)

        return values

    except tweepy.TweepyException as e:
        print(f"Error fetching user account info: {e}")
        return None

def create_celebrity_data(username, tweets, keyword_counts):
    """
    Creates a structured JSON object for the celebrity using real-time data from the Twitter API.
    :param username: Twitter handle of the celebrity
    :param tweets: List of tweet objects
    :param keyword_counts: Counter object with keyword frequencies
    :return: Dictionary representing the celebrity data
    """
    try:
        # Fetch user account info
        user_info = fetch_user_account_info(username)
        if not user_info:
            return None

        # Structure the celebrity data
        celebrity = {
            "name": user_info.get("name", ""),
            "username": username,
            "followers": f"{user_info['followers_count'] / 1_000_000:.1f}M" if user_info['followers_count'] >= 1_000_000 else f"{user_info['followers_count']}",
            "bio": user_info.get("description", ""),
            "avatar": user_info.get("avatar", ""),
            "verified": user_info.get("verified", False),
            "tweets": [],
            "trendingKeywords": []
        }

        # Add tweet data
        for tweet in tweets:
            tweet_data = {
                "id": tweet.id,
                "content": tweet.text,
                "date": tweet.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                "likes": tweet.public_metrics['like_count'],
                "retweets": tweet.public_metrics['retweet_count'],
                "keywords": extract_keywords(tweet.text)
            }
            celebrity["tweets"].append(tweet_data)

        # Add trending keywords
        for word, count in keyword_counts.most_common(10):  # Top 10 trending keywords
            keyword_data = {
                "word": word,
                "score": count * 10,  # Example scoring mechanism
                "mentions": count
            }
            celebrity["trendingKeywords"].append(keyword_data)

        return celebrity

    except Exception as e:
        print(f"Error creating celebrity data: {e}")
        return None