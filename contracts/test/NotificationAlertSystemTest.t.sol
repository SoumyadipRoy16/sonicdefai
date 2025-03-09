// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/NotificationAlertSystem.sol";

contract NotificationAlertSystemTest is Test {
    NotificationAlertSystem public notificationSystem;
    
    address public owner = address(1);
    address public user1 = address(2);
    address public user2 = address(3);
    
    string[] public initialTrendingWords;
    string[] public user1Keywords;
    string[] public user2Keywords;
    
    event WishlistUpdated(address indexed user, string[] keywords);
    event TrendingWordsUpdated(string[] words);
    event NotificationTriggered(address indexed user, string matchedWord, uint256 notificationId);
    event NotificationRead(address indexed user, uint256 notificationId);
    
    function setUp() public {
        // Deploy contract as owner
        vm.startPrank(owner);
        notificationSystem = new NotificationAlertSystem();
        
        // Initialize trending words
        initialTrendingWords = new string[](3);
        initialTrendingWords[0] = "blockchain";
        initialTrendingWords[1] = "defi";
        initialTrendingWords[2] = "sonic";
        notificationSystem.updateTrendingWords(initialTrendingWords);
        vm.stopPrank();
        
        // Initialize user keywords
        user1Keywords = new string[](2);
        user1Keywords[0] = "blockchain";
        user1Keywords[1] = "crypto";
        
        user2Keywords = new string[](2);
        user2Keywords[0] = "defi";
        user2Keywords[1] = "nft";
    }
    
    function testOwnership() public {
        assertEq(notificationSystem.owner(), owner);
    }
    
    function testTransferOwnership() public {
        address newOwner = address(4);
        
        vm.startPrank(owner);
        notificationSystem.transferOwnership(newOwner);
        vm.stopPrank();
        
        assertEq(notificationSystem.owner(), newOwner);
    }
    
    function testTransferOwnershipNotOwner() public {
        address newOwner = address(4);
        
        vm.startPrank(user1);
        vm.expectRevert("Only owner can call this function");
        notificationSystem.transferOwnership(newOwner);
        vm.stopPrank();
    }
    
    function testTransferOwnershipZeroAddress() public {
        vm.startPrank(owner);
        vm.expectRevert("New owner cannot be zero address");
        notificationSystem.transferOwnership(address(0));
        vm.stopPrank();
    }
    
    function testRegisterUser() public {
        vm.startPrank(user1);
        
        vm.expectEmit(true, false, false, true);
        emit WishlistUpdated(user1, user1Keywords);
        notificationSystem.registerUser(user1Keywords);
        
        // Verify user is registered
        (string[] memory keywords, bool isActive) = notificationSystem.getUserWishlist(user1);
        assertEq(isActive, true);
        assertEq(keywords.length, user1Keywords.length);
        
        vm.stopPrank();
    }
    
    function testRegisterUserAlreadyRegistered() public {
        vm.startPrank(user1);
        notificationSystem.registerUser(user1Keywords);
        
        vm.expectRevert("User already registered");
        notificationSystem.registerUser(user1Keywords);
        vm.stopPrank();
    }
    
    function testUpdateWishlist() public {
        // First register user
        vm.startPrank(user1);
        notificationSystem.registerUser(user1Keywords);
        
        // Update wishlist
        string[] memory updatedKeywords = new string[](3);
        updatedKeywords[0] = "blockchain";
        updatedKeywords[1] = "crypto";
        updatedKeywords[2] = "metaverse";
        
        vm.expectEmit(true, false, false, true);
        emit WishlistUpdated(user1, updatedKeywords);
        notificationSystem.updateWishlist(updatedKeywords);
        
        // Verify wishlist is updated
        string[] memory storedKeywords = notificationSystem.getWishlist();
        assertEq(storedKeywords.length, updatedKeywords.length);
        
        vm.stopPrank();
    }
    
    function testUpdateWishlistUnregisteredUser() public {
        vm.startPrank(user1);
        vm.expectRevert("User not registered");
        notificationSystem.updateWishlist(user1Keywords);
        vm.stopPrank();
    }
    
    function testUpdateTrendingWords() public {
        vm.startPrank(owner);
        
        string[] memory newTrendingWords = new string[](2);
        newTrendingWords[0] = "metaverse";
        newTrendingWords[1] = "nft";
        
        vm.expectEmit(false, false, false, true);
        emit TrendingWordsUpdated(newTrendingWords);
        notificationSystem.updateTrendingWords(newTrendingWords);
        
        // Verify trending words are updated
        string[] memory storedTrendingWords = notificationSystem.getTrendingWords();
        assertEq(storedTrendingWords.length, newTrendingWords.length);
        assertEq(storedTrendingWords[0], newTrendingWords[0]);
        assertEq(storedTrendingWords[1], newTrendingWords[1]);
        
        // Verify old trending words are removed
        assertEq(notificationSystem.isWordCurrentlyTrending("blockchain"), false);
        assertEq(notificationSystem.isWordCurrentlyTrending("metaverse"), true);
        
        vm.stopPrank();
    }
    
    function testUpdateTrendingWordsNotOwner() public {
        vm.startPrank(user1);
        vm.expectRevert("Only owner can call this function");
        notificationSystem.updateTrendingWords(initialTrendingWords);
        vm.stopPrank();
    }
    
    function testNotificationCreation() public {
        // Register user with matching keyword
        vm.startPrank(user1);
        notificationSystem.registerUser(user1Keywords); // Contains "blockchain" which is trending
        
        // Check notification was created
        uint256[] memory notifications = notificationSystem.getUserNotifications();
        assertEq(notifications.length, 1); // Should have 1 notification for "blockchain"
        
        // Verify notification details
        (
            address notifUser,
            string memory matchedWord,
            string memory context,
            uint256 timestamp,
            bool isActive
        ) = notificationSystem.getNotificationDetails(notifications[0]);
        
        assertEq(notifUser, user1);
        assertEq(matchedWord, "blockchain");
        assertEq(isActive, true);
        
        vm.stopPrank();
    }
    
    function testMultipleNotifications() public {
        // Register user1 with "blockchain" (trending)
        vm.startPrank(user1);
        notificationSystem.registerUser(user1Keywords);
        vm.stopPrank();
        
        // Register user2 with "defi" (trending)
        vm.startPrank(user2);
        notificationSystem.registerUser(user2Keywords);
        vm.stopPrank();
        
        // Add a new trending word that matches user1's second keyword
        vm.startPrank(owner);
        string[] memory newTrendingWords = new string[](4);
        newTrendingWords[0] = "blockchain";
        newTrendingWords[1] = "defi";
        newTrendingWords[2] = "sonic";
        newTrendingWords[3] = "crypto"; // New trending word that matches user1's keyword
        notificationSystem.updateTrendingWords(newTrendingWords);
        vm.stopPrank();
        
        // Check user1's notifications (should have 2: blockchain and crypto)
        vm.startPrank(user1);
        uint256[] memory user1Notifications = notificationSystem.getUserNotifications();
        assertEq(user1Notifications.length, 2);
        vm.stopPrank();
        
        // Check user2's notifications (should have 1: defi)
        vm.startPrank(user2);
        uint256[] memory user2Notifications = notificationSystem.getUserNotifications();
        assertEq(user2Notifications.length, 1);
        vm.stopPrank();
    }
    
    function testMarkNotificationAsRead() public {
        // Register user with matching keyword
        vm.startPrank(user1);
        notificationSystem.registerUser(user1Keywords); // Contains "blockchain" which is trending
        
        // Get notification ID
        uint256[] memory notifications = notificationSystem.getUserNotifications();
        assertEq(notifications.length, 1);
        uint256 notificationId = notifications[0];
        
        // Mark notification as read
        vm.expectEmit(true, false, false, true);
        emit NotificationRead(user1, notificationId);
        notificationSystem.markNotificationAsRead(notificationId);
        
        // Verify notification is marked as read
        (
            address notifUser,
            string memory matchedWord,
            string memory context,
            uint256 timestamp,
            bool isActive
        ) = notificationSystem.getNotificationDetails(notificationId);
        
        assertEq(isActive, false);
        vm.stopPrank();
    }
    
    function testMarkInvalidNotificationAsRead() public {
        // Register user
        vm.startPrank(user1);
        notificationSystem.registerUser(user1Keywords);
        
        // Try to mark invalid notification
        vm.expectRevert("Invalid notification ID");
        notificationSystem.markNotificationAsRead(999);
        vm.stopPrank();
    }
    
    function testMarkOtherUserNotificationAsRead() public {
        // Register both users
        vm.startPrank(user1);
        notificationSystem.registerUser(user1Keywords); // Contains "blockchain"
        vm.stopPrank();
        
        vm.startPrank(user2);
        notificationSystem.registerUser(user2Keywords); // Contains "defi"
        vm.stopPrank();
        
        // Get user1's notification ID
        vm.startPrank(user1);
        uint256[] memory notifications = notificationSystem.getUserNotifications();
        uint256 user1NotificationId = notifications[0];
        vm.stopPrank();
        
        // Try to mark user1's notification as read from user2
        vm.startPrank(user2);
        vm.expectRevert("Not authorized");
        notificationSystem.markNotificationAsRead(user1NotificationId);
        vm.stopPrank();
    }
    
    function testWishlistMatchAfterUpdate() public {
        // Register user with no matching keywords initially
        string[] memory noMatchKeywords = new string[](2);
        noMatchKeywords[0] = "gaming";
        noMatchKeywords[1] = "metaverse";
        
        vm.startPrank(user1);
        notificationSystem.registerUser(noMatchKeywords);
        
        // Verify no notifications
        uint256[] memory initialNotifications = notificationSystem.getUserNotifications();
        assertEq(initialNotifications.length, 0);
        
        // Update wishlist to include matching word
        notificationSystem.updateWishlist(user1Keywords); // Now includes "blockchain" which is trending
        
        // Verify notification was created
        uint256[] memory updatedNotifications = notificationSystem.getUserNotifications();
        assertEq(updatedNotifications.length, 1);
        
        vm.stopPrank();
    }
    
    function testIsWordCurrentlyTrending() public {
        // Check initial trending words
        assertTrue(notificationSystem.isWordCurrentlyTrending("blockchain"));
        assertTrue(notificationSystem.isWordCurrentlyTrending("defi"));
        assertTrue(notificationSystem.isWordCurrentlyTrending("sonic"));
        assertFalse(notificationSystem.isWordCurrentlyTrending("nft"));
    }
}