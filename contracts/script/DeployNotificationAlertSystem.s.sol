// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/NotificationAlertSystem.sol";

contract DeployNotificationAlertSystem is Script {
    function run() external {
        // Retrieve private key from environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy the contract
        NotificationAlertSystem notificationSystem = new NotificationAlertSystem();
        
        // Log the address where the contract was deployed
        console.log("NotificationAlertSystem deployed at:", address(notificationSystem));
        
        // Add some initial trending words for testing
        string[] memory initialTrendingWords = new string[](3);
        initialTrendingWords[0] = "blockchain";
        initialTrendingWords[1] = "defi";
        initialTrendingWords[2] = "sonic";
        
        // Update trending words
        notificationSystem.updateTrendingWords(initialTrendingWords);
        console.log("Initial trending words set");
        
        // Stop broadcasting transactions
        vm.stopBroadcast();
        
        // Additional logging for verification
        console.log("Deployment complete on Sonic Blaze testnet (Chain ID: 57054)");
        console.log("Contract owner:", notificationSystem.owner());
    }
}