import pandas as pd
import re
from collections import Counter
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import numpy as np
from datetime import datetime
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
    nltk.download('punkt_tab')
except LookupError:
    nltk.download('punkt')
    nltk.download('stopwords')
    nltk.download('punkt_tab')

class CelebrityCryptoAnalyzer:
    def __init__(self):
        self.data = None
        self.stop_words = set(stopwords.words('english'))
        self.custom_stop_words = {
            'https', 'http', 'co', 't', 'amp', 'rt', 'the', 'a', 'an', 'in', 'on', 
            'at', 'to', 'for', 'of', 'by', 'with', 'about', 'and', 'or', 'but', 
            'so', 'because', 'as', 'if', 'when', 'than', 'then', 'no', 'not', 
            'what', 'where', 'who', 'how', 'this', 'that', 'these', 'those', 'am', 
            'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 
            'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'can', 'could', 
            'may', 'might', 'must', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 
            'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our', 
            'their', 'mine', 'yours', 'hers', 'ours', 'theirs', 'just', 'very',
            'get', 'got', 'getting', 'via', 'go', 'going', 'goes', 'gone'
        }
        self.stop_words.update(self.custom_stop_words)
        
        # Crypto keywords that might indicate a memecoin potential
        self.crypto_keywords = {
            'moon', 'rocket', 'pump', 'diamond', 'hands', 'hodl', 'doge', 'shib', 
            'ape', 'bull', 'bear', 'whale', 'lambo', 'fomo', 'mooning', 'flip', 
            'token', 'nft', 'metaverse', 'crypto', 'chain', 'block', 'mint', 'stake', 
            'yield', 'farm', 'web3', 'defi', 'alpha', 'based', 'wagmi', 'ngmi', 
            'gm', 'gn', 'ser', 'anon', 'ratio', 'pepe', 'wojak', 'chad', 'stonks', 
            'tendies', 'galaxy', 'mars', 'pluto', 'satoshi', 'vitalik', 'meme', 
            'gem', 'launch', 'drop', 'airdrop', 'sweep', 'floor', 'rare', 'legend', 
            'community', 'degen', 'rekt', 'gigabrain', 'laser', 'eyes', 'flex', 
            'burn', 'cap', 'liquidity', 'locked', 'mission', 'epic', 'king', 
            'queen', 'takeover', 'green', 'candle', 'bags', 'flippening'
        }
        
        # User wishlists dictionary: {user_id: [words]}
        self.user_wishlists = {}
        
        # Notification history: {user_id: [notifications]}
        self.notifications = {}
        
    def load_data(self, csv_file_path):
        """Load tweet data from CSV file"""
        try:
            self.data = pd.read_csv(csv_file_path)
            print(f"Loaded {len(self.data)} tweets successfully")
            return True
        except Exception as e:
            print(f"Error loading data: {e}")
            return False
    
    def preprocess_text(self, text):
        """Clean and preprocess tweet text"""
        if not isinstance(text, str):
            return ""
            
        # Convert to lowercase
        text = text.lower()
        
        # Remove URLs
        text = re.sub(r'https?://\S+', '', text)
        
        # Remove mentions
        text = re.sub(r'@\w+', '', text)
        
        # Remove hashtag symbol but keep the text
        text = re.sub(r'#(\w+)', r'\1', text)
        
        # Remove punctuation and special characters
        text = re.sub(r'[^\w\s]', '', text)
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Remove stopwords
        cleaned_tokens = [word for word in tokens if word not in self.stop_words and len(word) > 2]
        
        return cleaned_tokens
    
    def extract_trending_words(self, min_count=3, top_n=50):
        """Extract trending words with potential for memecoins"""
        if self.data is None:
            print("No data loaded. Please load data first.")
            return []
        
        all_words = []
        
        for _, row in self.data.iterrows():
            tokens = self.preprocess_text(row['Text'])
            all_words.extend(tokens)
        
        # Count word frequencies
        word_counts = Counter(all_words)
        
        # Filter words that appear at least min_count times
        frequent_words = {word: count for word, count in word_counts.items() 
                         if count >= min_count}
        
        # Calculate memecoin potential score
        word_scores = {}
        for word, count in frequent_words.items():
            # Base score is the count
            score = count
            
            # Boost score if it's in our crypto keywords list
            if word in self.crypto_keywords:
                score *= 1.5
                
            # Boost score for shorter words (more memeable)
            if 3 <= len(word) <= 6:
                score *= 1.2
                
            word_scores[word] = score
        
        # Sort by score and take top N
        trending_words = sorted(word_scores.items(), key=lambda x: x[1], reverse=True)[:top_n]
        
        return trending_words
    
    def analyze_by_username(self, username):
        """Analyze tweets for a specific celebrity/username"""
        if self.data is None:
            print("No data loaded. Please load data first.")
            return None
        
        # Filter tweets by username
        user_tweets = self.data[self.data['Username'].str.lower() == username.lower()]
        
        if len(user_tweets) == 0:
            return {"status": "error", "message": f"No tweets found for {username}"}
        
        # Create a temporary dataset with only this user's tweets
        temp_data = self.data.copy()
        self.data = user_tweets
        
        # Extract trending words
        trending_words = self.extract_trending_words(min_count=2, top_n=20)
        
        # Restore original dataset
        self.data = temp_data
        
        # Calculate engagement metrics
        avg_likes = user_tweets['Likes'].mean()
        avg_retweets = user_tweets['Retweets'].mean()
        total_tweets = len(user_tweets)
        
        # Prepare results
        results = {
            "status": "success",
            "username": username,
            "total_tweets_analyzed": total_tweets,
            "avg_likes": avg_likes,
            "avg_retweets": avg_retweets,
            "trending_words": trending_words,
            "analysis_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        return results
    
    def add_to_wishlist(self, user_id, words):
        """Add words to a user's wishlist"""
        if user_id not in self.user_wishlists:
            self.user_wishlists[user_id] = set()
            
        # Add new words to wishlist
        if isinstance(words, list):
            self.user_wishlists[user_id].update(words)
        else:
            self.user_wishlists[user_id].add(words)
            
        return list(self.user_wishlists[user_id])
    
    def remove_from_wishlist(self, user_id, words):
        """Remove words from a user's wishlist"""
        if user_id not in self.user_wishlists:
            return []
            
        # Remove words from wishlist
        if isinstance(words, list):
            for word in words:
                self.user_wishlists[user_id].discard(word)
        else:
            self.user_wishlists[user_id].discard(words)
            
        return list(self.user_wishlists[user_id])
    
    def get_wishlist(self, user_id):
        """Get a user's wishlist"""
        if user_id not in self.user_wishlists:
            return []
            
        return list(self.user_wishlists[user_id])
    
    def check_new_tweets_for_memecoin_launch(self, new_tweets_df, user_id):
        """
        Check if new tweets contain potential memecoin launches that match
        words in the user's wishlist
        """
        if user_id not in self.user_wishlists or not self.user_wishlists[user_id]:
            return []
            
        notifications = []
        wishlist = self.user_wishlists[user_id]
        
        for _, tweet in new_tweets_df.iterrows():
            tweet_text = tweet['Text'].lower() if isinstance(tweet['Text'], str) else ""
            username = tweet['Username']
            
            # Check for memecoin launch indicators
            launch_indicators = ['launch', 'token', 'airdrop', 'new coin', 'memecoin', 'just created']
            is_potential_launch = any(indicator in tweet_text for indicator in launch_indicators)
            
            if is_potential_launch:
                # Check if any wishlist words are in the tweet
                matched_words = [word for word in wishlist if word.lower() in tweet_text]
                
                if matched_words:
                    notification = {
                        'username': username,
                        'tweet_text': tweet['Text'],
                        'created_at': tweet['Created At'],
                        'matched_words': matched_words,
                        'notification_time': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    }
                    notifications.append(notification)
        
        # Store notifications
        if user_id not in self.notifications:
            self.notifications[user_id] = []
            
        self.notifications[user_id].extend(notifications)
        
        return notifications
    
    def get_notifications(self, user_id):
        """Get all notifications for a user"""
        if user_id not in self.notifications:
            return []
            
        return self.notifications[user_id]
    
    def cluster_celebrities(self, n_clusters=5):
        """
        Group celebrities based on their tweet content and memecoin patterns
        """
        if self.data is None:
            print("No data loaded. Please load data first.")
            return None
            
        # Aggregate tweets by username
        usernames = self.data['Username'].unique()
        username_texts = {}
        
        for username in usernames:
            user_tweets = self.data[self.data['Username'] == username]
            username_texts[username] = ' '.join(user_tweets['Text'].fillna('').astype(str))
        
        # Create a corpus of texts
        corpus = list(username_texts.values())
        usernames_list = list(username_texts.keys())
        
        # Create TF-IDF vectors
        vectorizer = TfidfVectorizer(
            max_features=1000,
            stop_words=list(self.stop_words),
            ngram_range=(1, 2)
        )
        
        X = vectorizer.fit_transform(corpus)
        
        # Apply K-means clustering
        kmeans = KMeans(n_clusters=min(n_clusters, len(usernames)), random_state=42)
        clusters = kmeans.fit_predict(X)
        
        # Get top terms per cluster
        order_centroids = kmeans.cluster_centers_.argsort()[:, ::-1]
        terms = vectorizer.get_feature_names_out()
        
        # Prepare results
        results = {}
        for i in range(len(kmeans.cluster_centers_)):
            cluster_users = [usernames_list[j] for j in range(len(clusters)) if clusters[j] == i]
            
            # Get top 10 terms for this cluster
            top_terms = [terms[ind] for ind in order_centroids[i, :10]]
            
            results[f"Cluster {i+1}"] = {
                "celebrities": cluster_users,
                "top_terms": top_terms,
                "size": len(cluster_users)
            }
            
        return results
    
    def generate_memecoin_trends_report(self):
        """
        Generate a comprehensive report on memecoin trends
        """
        if self.data is None:
            print("No data loaded. Please load data first.")
            return None
            
        # Overall trending words
        trending_words = self.extract_trending_words(min_count=3, top_n=30)
        
        # Engagement analysis
        top_engagement = self.data.sort_values(by='Likes', ascending=False).head(10)
        top_engagement_words = []
        
        for _, row in top_engagement.iterrows():
            tokens = self.preprocess_text(row['Text'])
            top_engagement_words.extend(tokens)
            
        top_engagement_counts = Counter(top_engagement_words)
        
        # Time-based analysis (assuming 'Created At' is a timestamp)
        try:
            self.data['date'] = pd.to_datetime(self.data['Created At'])
            self.data['month'] = self.data['date'].dt.month
            
            # Count crypto keywords by month
            monthly_trends = {}
            for month in self.data['month'].unique():
                month_data = self.data[self.data['month'] == month]
                month_words = []
                
                for _, row in month_data.iterrows():
                    tokens = self.preprocess_text(row['Text'])
                    crypto_tokens = [token for token in tokens if token in self.crypto_keywords]
                    month_words.extend(crypto_tokens)
                    
                monthly_trends[month] = Counter(month_words).most_common(10)
        except:
            monthly_trends = {"error": "Could not parse dates for time-based analysis"}
        
        report = {
            "overall_trending_words": trending_words,
            "high_engagement_words": top_engagement_counts.most_common(20),
            "monthly_trends": monthly_trends,
            "total_tweets_analyzed": len(self.data),
            "report_generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        return report

    def plot_word_frequency(self, top_n=20):
        """Plot the frequency of top trending words"""
        trending_words = self.extract_trending_words(min_count=3, top_n=top_n)
        
        words = [word for word, _ in trending_words]
        counts = [count for _, count in trending_words]
        
        plt.figure(figsize=(12, 8))
        plt.bar(words, counts)
        plt.xticks(rotation=45, ha='right')
        plt.title(f"Top {top_n} Trending Words with Memecoin Potential")
        plt.xlabel("Words")
        plt.ylabel("Frequency")
        plt.tight_layout()
        
        # Return the plot directly
        return plt


# Example usage
if __name__ == "__main__":
    analyzer = CelebrityCryptoAnalyzer()
    
    # Load data
    analyzer.load_data("tweets.csv")
    
    # Extract trending words
    trending_words = analyzer.extract_trending_words()
    print("Top trending words:")
    for word, score in trending_words[:10]:
        print(f"{word}: {score}")
    
    # Analyze a specific celebrity
    results = analyzer.analyze_by_username("elonmusk")
    if results and results["status"] == "success":
        print(f"\nAnalysis for {results['username']}:")
        print(f"Total tweets: {results['total_tweets_analyzed']}")
        print(f"Average likes: {results['avg_likes']:.2f}")
        print(f"Top trending words:")
        for word, score in results['trending_words'][:5]:
            print(f"{word}: {score}")
    
    # Example wishlist functionality
    user_id = "user123"
    analyzer.add_to_wishlist(user_id, ["moon", "rocket", "doge"])
    print(f"\nUser wishlist: {analyzer.get_wishlist(user_id)}")
    
    # Simulate new tweets for notification checking
    new_tweets = pd.DataFrame({
        'Username': ['elonmusk', 'VitalikButerin'],
        'Text': [
            'Just launched a new DOGE rocket to the moon! Check out our new token.',
            'Interesting thoughts on blockchain scalability.'
        ],
        'Created At': ['2025-03-10', '2025-03-10'],
        'Retweets': [5000, 3000],
        'Likes': [20000, 15000]
    })
    
    notifications = analyzer.check_new_tweets_for_memecoin_launch(new_tweets, user_id)
    print(f"\nNotifications:")
    for notification in notifications:
        print(f"Celebrity: {notification['username']}")
        print(f"Tweet: {notification['tweet_text']}")
        print(f"Matched words: {notification['matched_words']}")