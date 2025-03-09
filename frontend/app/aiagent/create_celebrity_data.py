import tweepy
import os
from analyze_tweets import extract_keywords

# Fetch Twitter API credentials from environment variables
API_KEY = os.getenv("API_KEY")
API_SECRET_KEY = os.getenv("API_SECRET_KEY")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET")

# Authenticate to Twitter
auth = tweepy.OAuth1UserHandler(API_KEY, API_SECRET_KEY, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)

def create_celebrity_data(username, tweets, keyword_counts):
    """
    Creates a structured JSON object for the celebrity using real-time data from the Twitter API.
    :param username: Twitter handle of the celebrity
    :param tweets: List of tweet objects
    :param keyword_counts: Counter object with keyword frequencies
    :return: Dictionary representing the celebrity data
    """
    try:
        # Fetch user details from the Twitter API
        user = api.get_user(screen_name=username)
        followers_count = user.followers_count
        bio = user.description
        avatar = user.profile_image_url_https
        verified = user.verified

        # Structure the celebrity data
        celebrity = {
            "name": user.name,
            "username": username,
            "followers": f"{followers_count / 1_000_000:.1f}M" if followers_count >= 1_000_000 else f"{followers_count}",
            "bio": bio,
            "avatar": avatar,
            "verified": verified,
            "tweets": [],
            "trendingKeywords": []
        }

        # Add tweet data
        for tweet in tweets:
            tweet_data = {
                "id": tweet.id,
                "content": tweet.full_text,
                "date": tweet.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                "likes": tweet.favorite_count,
                "retweets": tweet.retweet_count,
                "keywords": extract_keywords(tweet.full_text)
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

    except tweepy.TweepError as e:
        print(f"Error fetching user details: {e}")
        return None