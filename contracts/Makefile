CHAIN_ID := 57054
RPC_URL := https://rpc.blaze.soniclabs.com

.PHONY: deploy verify clean help

help:
	@echo "Available commands: make deploy, make verify CONTRACT=<addr>, make clean"

deploy:
	@if [ -z "$$PRIVATE_KEY" ]; then echo "Error: PRIVATE_KEY environment variable is not set"; exit 1; fi
	forge script script/DeployNotificationAlertSystem.s.sol:DeployNotificationAlertSystem --rpc-url $(RPC_URL) --chain $(CHAIN_ID) --broadcast --verify -vvv

verify:
	@if [ -z "$(CONTRACT)" ]; then echo "Error: CONTRACT address not provided"; exit 1; fi
	forge verify-contract --chain-id $(CHAIN_ID) --compiler-version v0.8.20 --watch $(CONTRACT) src/NotificationAlertSystem.sol:NotificationAlertSystem

clean:
	forge clean