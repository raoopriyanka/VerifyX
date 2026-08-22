// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RoleManager.sol";

contract VerifyX {
    RoleManager public roleManager;

    enum ProductStatus { MANUFACTURED, DISPATCHED, IN_TRANSIT, RECEIVED, SOLD, FLAGGED }

    struct ProductRecord {
        string productId;
        bytes32 dataHash;
        address manufacturer;
        uint256 registeredAt;
        bool exists;
        ProductStatus status;
    }

    struct SupplyChainEvent {
        string productId;
        string eventType;
        address actor;
        uint256 timestamp;
        bytes32 eventHash;
    }

    mapping(string => ProductRecord) public products;
    mapping(string => SupplyChainEvent[]) public productEvents;

    event ProductRegistered(string indexed productId, bytes32 dataHash, address indexed manufacturer, uint256 timestamp);
    event SupplyChainEventRecorded(string indexed productId, string eventType, address indexed actor, uint256 timestamp, bytes32 eventHash);

    modifier onlyRole(bytes32 role) {
        require(roleManager.hasRole(role, msg.sender), "VerifyX: Unauthorized caller");
        _;
    }

    constructor(address _roleManagerAddress) {
        roleManager = RoleManager(_roleManagerAddress);
    }

    function registerProduct(string calldata productId, bytes32 dataHash) external onlyRole(roleManager.MANUFACTURER_ROLE()) {
        require(bytes(productId).length > 0, "VerifyX: Empty product ID");
        require(!products[productId].exists, "VerifyX: Product already registered");

        products[productId] = ProductRecord({
            productId: productId,
            dataHash: dataHash,
            manufacturer: msg.sender,
            registeredAt: block.timestamp,
            exists: true,
            status: ProductStatus.MANUFACTURED
        });

        emit ProductRegistered(productId, dataHash, msg.sender, block.timestamp);
    }

    function recordSupplyChainEvent(
        string calldata productId,
        string calldata eventType,
        bytes32 eventHash,
        ProductStatus newStatus
    ) external {
        require(products[productId].exists, "VerifyX: Product does not exist");

        products[productId].status = newStatus;

        productEvents[productId].push(SupplyChainEvent({
            productId: productId,
            eventType: eventType,
            actor: msg.sender,
            timestamp: block.timestamp,
            eventHash: eventHash
        }));

        emit SupplyChainEventRecorded(productId, eventType, msg.sender, block.timestamp, eventHash);
    }

    function getProduct(string calldata productId) external view returns (ProductRecord memory) {
        require(products[productId].exists, "VerifyX: Product does not exist");
        return products[productId];
    }

    function getProductEvents(string calldata productId) external view returns (SupplyChainEvent[] memory) {
        return productEvents[productId];
    }
}