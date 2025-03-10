# aiagent/agent.py
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
import sys  # Import sys to handle command-line arguments

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
            "total_tweets_analyzed": len(self.data),
            "report_generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        return report

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python agent.py <csv_file>")
        sys.exit(1)
    
    csv_file = sys.argv[1]
    analyzer = CelebrityCryptoAnalyzer()
    analyzer.load_data(csv_file)
    report = analyzer.generate_memecoin_trends_report()
    
    print("\nMemecoin Trends Report:")
    print("Overall Trending Words:")
    for word, score in report['overall_trending_words']:
        print(f"{word}: {score}")
    
    print("\nHigh Engagement Words:")
    for word, count in report['high_engagement_words']:
        print(f"{word}: {count}")
    
    print("\nMonthly Trends:")
    for month, trends in report['monthly_trends'].items():
        print(f"Month {month}:")
        for word, count in trends:
            print(f"  {word}: {count}")