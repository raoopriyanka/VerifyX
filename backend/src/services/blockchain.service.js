import { getBlockchainContracts } from "../config/blockchain.js";
import { ethers } from "ethers";

export async function registerProductOnBlockchain(productId, verificationHash) {
  try {
    const { verifyXContract } = await getBlockchainContracts();
    
    // Ensure hash is formatted as a valid bytes32 hex string with 0x prefix
    const formattedHash = verificationHash.startsWith('0x') 
      ? verificationHash 
      : `0x${verificationHash}`;

    // Call the smart contract registration function
    const tx = await verifyXContract.registerProduct(productId, formattedHash);
    const receipt = await tx.wait();

    return {
      success: true,
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString()
    };
  } catch (error) {
    console.error("Blockchain registration error:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function recordSupplyChainEventOnBlockchain(productId, eventType, eventHash, statusEnumIndex = 1) {
  try {
    const { verifyXContract } = await getBlockchainContracts();
    
    const formattedEventHash = eventHash.startsWith('0x') 
      ? eventHash 
      : `0x${eventHash}`;

    const tx = await verifyXContract.recordSupplyChainEvent(productId, eventType, formattedEventHash, statusEnumIndex);
    const receipt = await tx.wait();

    return {
      success: true,
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    console.error("Blockchain event recording error:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function getBlockchainProduct(productId) {
  try {
    const { verifyXContract, verifyXAddress } = await getBlockchainContracts();
    const record = await verifyXContract.getProduct(productId);

    return {
      success: true,
      productId: record.productId,
      dataHash: record.dataHash,
      manufacturer: record.manufacturer,
      registeredAt: Number(record.registeredAt),
      exists: record.exists,
      status: Number(record.status),
      contractAddress: verifyXAddress
    };
  } catch (error) {
    return {
      success: false,
      exists: false,
      error: error.message
    };
  }
}