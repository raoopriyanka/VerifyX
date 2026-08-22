import { getBlockchainContracts } from "../config/blockchain.js";

export async function registerProductOnBlockchain(productId, verificationHash) {
  try {
    const { verifyXContract } = await getBlockchainContracts();
    
    // Call the smart contract registration function
    const tx = await verifyXContract.registerProduct(productId, verificationHash);
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
    
    const tx = await verifyXContract.recordSupplyChainEvent(productId, eventType, eventHash, statusEnumIndex);
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