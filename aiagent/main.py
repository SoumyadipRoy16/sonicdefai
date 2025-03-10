import asyncio
from twikit import Client, TooManyRequests
import time
from datetime import datetime
import csv
from configparser import ConfigParser
from random import randint
import httpx
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s',
                    handlers=[logging.FileHandler("twitter_scraper.log"), 
                              logging.StreamHandler()])
logger = logging.getLogger(__name__)

MINIMUM_TWEETS = 10
# Consider simplifying your query if it's causing timeouts
QUERY = '(doge OR shiba OR floki OR pepe OR elon OR moon OR rocket OR hodl OR whale OR satoshi OR fomo OR ape) lang:en until:2025-03-10 since:2023-01-01'

# Make client a global variable
client = None

async def get_tweets(tweets, max_retries=3):
    retries = 0
    while retries < max_retries:
        try:
            if tweets is None:
                logger.info("Getting initial tweets...")
                tweets = await client.search_tweet(QUERY, product='Top')
            else:
                wait_time = randint(5, 10)
                logger.info(f"Getting next tweets after {wait_time} seconds...")
                await asyncio.sleep(wait_time)
                tweets = await tweets.next()
            return tweets
        except httpx.ReadTimeout:
            retries += 1
            wait_time = 2 ** retries  # Exponential backoff
            logger.warning(f"Read timeout occurred. Retry {retries}/{max_retries} after {wait_time} seconds")
            await asyncio.sleep(wait_time)
            
    logger.error(f"Failed after {max_retries} retries")
    return None

async def main():
    global client
    
    try:
        # login credentials
        config = ConfigParser()
        config.read('config.ini')
        username = config['X']['username']
        email = config['X']['email']
        password = config['X']['password']

        with open('tweets.csv', 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(['Tweet_count', 'Username', 'Text', 'Created At', 'Retweets', 'Likes'])

        # authenticate to X.com with increased timeout
        client = Client(language='en-US', timeout=60.0)  # Increase timeout to 60 seconds
        
        # Try to use cookies first
        try:
            logger.info("Attempting to load cookies...")
            client.load_cookies('cookies.json')
        except Exception as e:
            logger.warning(f"Failed to load cookies: {e}. Attempting login...")
            await client.login(auth_info_1=username, auth_info_2=email, password=password)
            client.save_cookies('cookies.json')

        tweet_count = 0
        tweets = None

        while tweet_count < MINIMUM_TWEETS:
            try:
                tweets = await get_tweets(tweets)
                
                if not tweets:
                    logger.info("No more tweets found")
                    break

                for tweet in tweets:
                    tweet_count += 1
                    tweet_data = [tweet_count, tweet.user.name, tweet.text, tweet.created_at, tweet.retweet_count, tweet.favorite_count]
                    
                    with open('tweets.csv', 'a', newline='', encoding='utf-8') as file:
                        writer = csv.writer(file)
                        writer.writerow(tweet_data)

                logger.info(f"Got {tweet_count} tweets so far")
                
            except TooManyRequests as e:
                rate_limit_reset = datetime.fromtimestamp(e.rate_limit_reset)
                logger.warning(f"Rate limit reached. Waiting until {rate_limit_reset}")
                wait_time = rate_limit_reset - datetime.now()
                await asyncio.sleep(wait_time.total_seconds() + 10)  # Add 10 seconds buffer
                continue
            except Exception as e:
                logger.error(f"Unexpected error: {e}")
                await asyncio.sleep(30)  # Wait 30 seconds before retrying
                continue

        logger.info(f"Done! Got {tweet_count} tweets")
        
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(main())