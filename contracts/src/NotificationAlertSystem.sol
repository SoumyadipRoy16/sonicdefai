// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title NotificationAlertSystem
 * @dev Contract that monitors matches between user wishlists and trending words
 * and triggers notifications when matches are found.
 */
contract NotificationAlertSystem {
    address public owner;
    
    // Struct to store notification data
    struct Notification {
        address user;
        string matchedWord;
        string trendingContext;
        uint256 timestamp;
        bool isActive;
    }
    
    // Struct to store user wishlist
    struct UserWishlist {
        string[] keywords;
        bool isActive;
    }
    
    // Mapping of user address to their wishlist
    mapping(address => UserWishlist) public userWishlists;
    
    // Array of trending words
    string[] public trendingWords;
    
    // Mapping to check if a word is trending
    mapping(string => bool) public isWordTrending;
    
    // Array to store all notifications for auditing
    Notification[] public notificationHistory;
    
    // Mapping of user address to their notification count
    mapping(address => uint256) public userNotificationCount;
    
    // Mapping of user address to array of notification indices
    mapping(address => uint256[]) public userNotifications;
    
    // Events
    event WishlistUpdated(address indexed user, string[] keywords);
    event TrendingWordsUpdated(string[] words);
    event NotificationTriggered(address indexed user, string matchedWord, uint256 notificationId);
    event NotificationRead(address indexed user, uint256 notificationId);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyUser() {
        require(userWishlists[msg.sender].isActive, "User not registered");
        _;
    }
    
    /**
     * @dev Constructor sets the owner of the contract
     */
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Function to register a user and set their initial wishlist
     * @param keywords Array of keywords for the user's wishlist
     */
    function registerUser(string[] memory keywords) external {
        require(!userWishlists[msg.sender].isActive, "User already registered");
        
        userWishlists[msg.sender].keywords = keywords;
        userWishlists[msg.sender].isActive = true;
        
        emit WishlistUpdated(msg.sender, keywords);
    }
    
    /**
     * @dev Function to update a user's wishlist
     * @param keywords New array of keywords for the user's wishlist
     */
    function updateWishlist(string[] memory keywords) external onlyUser {
        userWishlists[msg.sender].keywords = keywords;
        
        emit WishlistUpdated(msg.sender, keywords);
        
        // Check for matches with current trending words
        checkForMatches(msg.sender);
    }
    
    /**
     * @dev Function to update the list of trending words
     * @param words Array of trending words
     */
    function updateTrendingWords(string[] memory words) external onlyOwner {
        // Clear previous trending words
        for (uint256 i = 0; i < trendingWords.length; i++) {
            isWordTrending[trendingWords[i]] = false;
        }
        
        // Set new trending words
        trendingWords = words;
        for (uint256 i = 0; i < words.length; i++) {
            isWordTrending[words[i]] = true;
        }
        
        emit TrendingWordsUpdated(words);
        
        // Check all users for matches
        checkAllUsersForMatches();
    }
    
    /**
     * @dev Internal function to check for matches between a user's wishlist and trending words
     * @param user Address of the user to check
     */
    function checkForMatches(address user) internal {
        if (!userWishlists[user].isActive) {
            return;
        }
        
        string[] memory userKeywords = userWishlists[user].keywords;
        
        for (uint256 i = 0; i < userKeywords.length; i++) {
            if (isWordTrending[userKeywords[i]]) {
                createNotification(user, userKeywords[i], "Trending Match");
            }
        }
    }
    
    /**
     * @dev Function to check all users for matches
     */
    function checkAllUsersForMatches() internal {
        // In a production environment, this would need to be optimized
        // or potentially moved to an off-chain solution for efficiency
        // This is a simplified implementation for demonstration
        
        // Get all registered users and check for matches
        // (This is a naive implementation that would be expensive with many users)
        // In practice, you might use events and have a backend service monitor those
    }
    
    /**
     * @dev Internal function to create a notification
     * @param user Address of the user to notify
     * @param matchedWord The word that matched
     * @param context Additional context about the match
     */
    function createNotification(address user, string memory matchedWord, string memory context) internal {
        Notification memory newNotification = Notification({
            user: user,
            matchedWord: matchedWord,
            trendingContext: context,
            timestamp: block.timestamp,
            isActive: true
        });
        
        notificationHistory.push(newNotification);
        uint256 notificationId = notificationHistory.length - 1;
        
        userNotifications[user].push(notificationId);
        userNotificationCount[user]++;
        
        emit NotificationTriggered(user, matchedWord, notificationId);
    }
    
    /**
     * @dev Function to mark a notification as read
     * @param notificationId ID of the notification to mark as read
     */
    function markNotificationAsRead(uint256 notificationId) external {
        require(notificationId < notificationHistory.length, "Invalid notification ID");
        require(notificationHistory[notificationId].user == msg.sender, "Not authorized");
        
        notificationHistory[notificationId].isActive = false;
        
        emit NotificationRead(msg.sender, notificationId);
    }
    
    /**
     * @dev Function to get all notifications for a user
     * @return Array of notification IDs for the user
     */
    function getUserNotifications() external view onlyUser returns (uint256[] memory) {
        return userNotifications[msg.sender];
    }
    
    /**
     * @dev Function to get notification details
     * @param notificationId ID of the notification
     * @return user Address of the user
     * @return matchedWord The matched word
     * @return trendingContext Additional context
     * @return timestamp Time of the notification
     * @return isActive Whether the notification is still active
     */
    function getNotificationDetails(uint256 notificationId) external view returns (
        address user,
        string memory matchedWord,
        string memory trendingContext,
        uint256 timestamp,
        bool isActive
    ) {
        require(notificationId < notificationHistory.length, "Invalid notification ID");
        Notification memory notification = notificationHistory[notificationId];
        
        return (
            notification.user,
            notification.matchedWord,
            notification.trendingContext,
            notification.timestamp,
            notification.isActive
        );
    }
    
    /**
     * @dev Function to get a user's wishlist
     * @return Array of keywords in the user's wishlist
     */
    function getWishlist() external view onlyUser returns (string[] memory) {
        return userWishlists[msg.sender].keywords;
    }
    
    /**
     * @dev Function to get the current trending words
     * @return Array of trending words
     */
    function getTrendingWords() external view returns (string[] memory) {
        return trendingWords;
    }
    
    /**
     * @dev Function to check if a specific word is trending
     * @param word Word to check
     * @return Whether the word is trending
     */
    function isWordCurrentlyTrending(string memory word) external view returns (bool) {
        return isWordTrending[word];
    }
    
    /**
     * @dev Function to transfer ownership of the contract
     * @param newOwner Address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }
}