// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title VerifyX
 * @dev Intelligent Blockchain-Based Product Authentication
 * Handles manufacturer verification, product registration, and ownership tracing.
 */
contract VerifyX {
    // State variables
    address public admin;

    // Enums for tracking the current state of a physical product
    enum ProductStatus { Authentic, Flagged_Counterfeit, Stolen }

    // Struct representing the on-chain data of a product
    struct Product {
        string uuid;             // Corresponds to the MongoDB UUID
        address manufacturer;    // Wallet address of the creator
        address currentOwner;    // Wallet address of the current customer/owner
        uint256 registeredAt;    // Timestamp of creation
        ProductStatus status;    // Current validity status
    }

    // Mappings
    mapping(bytes32 => Product) public products;           // Maps a unique hash to a Product
    mapping(address => bool) public verifiedManufacturers; // Access control for manufacturers

    // Events (Crucial for the Node.js backend to listen to blockchain state changes)
    event ManufacturerAdded(address indexed manufacturer);
    event ProductRegistered(bytes32 indexed productHash, string uuid, address indexed manufacturer);
    event OwnershipTransferred(bytes32 indexed productHash, address indexed previousOwner, address indexed newOwner);
    event ProductStatusUpdated(bytes32 indexed productHash, ProductStatus status);

    // Modifiers for Access Control
    modifier onlyAdmin() {
        require(msg.sender == admin, "VerifyX: Only admin can perform this action");
        _;
    }

    modifier onlyManufacturer() {
        require(verifiedManufacturers[msg.sender], "VerifyX: Only verified manufacturers allowed");
        _;
    }

    modifier onlyProductOwner(bytes32 _productHash) {
        require(products[_productHash].currentOwner == msg.sender, "VerifyX: Caller is not the product owner");
        _;
    }

    // Constructor sets the deployer as the Admin
    constructor() {
        admin = msg.sender;
    }

    // 1. Admin authorizes a brand/manufacturer (e.g., Nike, Apple)
    function addManufacturer(address _manufacturer) external onlyAdmin {
        verifiedManufacturers[_manufacturer] = true;
        emit ManufacturerAdded(_manufacturer);
    }

    // 2. Manufacturer registers a new genuine product
    function registerProduct(bytes32 _productHash, string memory _uuid) external onlyManufacturer {
        require(products[_productHash].manufacturer == address(0), "VerifyX: Product hash already exists");

        products[_productHash] = Product({
            uuid: _uuid,
            manufacturer: msg.sender,
            currentOwner: msg.sender, // Initially, the manufacturer owns it
            registeredAt: block.timestamp,
            status: ProductStatus.Authentic
        });

        emit ProductRegistered(_productHash, _uuid, msg.sender);
    }

    // 3. Transfer ownership to a customer after purchase
    function transferOwnership(bytes32 _productHash, address _newOwner) external onlyProductOwner(_productHash) {
        require(_newOwner != address(0), "VerifyX: Invalid address provided");
        require(products[_productHash].status == ProductStatus.Authentic, "VerifyX: Cannot transfer a flagged product");

        address previousOwner = products[_productHash].currentOwner;
        products[_productHash].currentOwner = _newOwner;

        emit OwnershipTransferred(_productHash, previousOwner, _newOwner);
    }

    // 4. Update status (e.g., Customer reports item as stolen)
    function updateProductStatus(bytes32 _productHash, ProductStatus _status) external onlyProductOwner(_productHash) {
        products[_productHash].status = _status;
        emit ProductStatusUpdated(_productHash, _status);
    }

    // 5. Read-only function for the Frontend/Backend to verify authenticity
    function getProduct(bytes32 _productHash) external view returns (string memory, address, address, uint256, ProductStatus) {
        Product memory p = products[_productHash];
        require(p.manufacturer != address(0), "VerifyX: Product does not exist on blockchain");
        
        return (p.uuid, p.manufacturer, p.currentOwner, p.registeredAt, p.status);
    }
}