import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load deployment artifact from smart-contracts
let deploymentData = {};
try {
  const artifactPath = path.resolve(__dirname, "../../../smart-contracts/deployments/localhost.json");
  if (fs.existsSync(artifactPath)) {
    deploymentData = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  }
} catch (error) {
  console.warn("⚠️ Warning: Could not load local deployment artifact. Make sure contracts are deployed.");
}

const RPC_URL = process.env.BLOCKCHAIN_RPC_URL || "http://127.0.0.1:7545";
// Use Ganache default provider or fallback to private key if specified
const provider = new ethers.JsonRpcProvider(RPC_URL);

let signer;
async function initSigner() {
  if (process.env.BLOCKCHAIN_PRIVATE_KEY) {
    signer = new ethers.Wallet(process.env.BLOCKCHAIN_PRIVATE_KEY, provider);
  } else {
    // Fallback to the first unlocked node account if no private key is provided
    signer = await provider.getSigner(0);
  }
}

let verifyXContract = null;
let roleManagerContract = null;

export async function getBlockchainContracts() {
  if (!signer) {
    await initSigner();
  }

  const verifyXAddress = process.env.VERIFYX_CONTRACT_ADDRESS || deploymentData.VerifyX;
  const roleManagerAddress = process.env.ROLE_MANAGER_CONTRACT_ADDRESS || deploymentData.RoleManager;

  if (!verifyXAddress || !roleManagerAddress) {
    throw new Error("Blockchain contract addresses are missing. Please deploy contracts first.");
  }

  // Load ABI from Hardhat compilation artifacts
  const loadArtifactAbi = (contractName) => {
    const artifactPath = path.resolve(__dirname, `../../../smart-contracts/artifacts/contracts/${contractName}.sol/${contractName}.json`);
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    return artifact.abi;
  };

  const verifyXAbi = loadArtifactAbi("VerifyX");
  const roleManagerAbi = loadArtifactAbi("RoleManager");

  verifyXContract = new ethers.Contract(verifyXAddress, verifyXAbi, signer);
  roleManagerContract = new ethers.Contract(roleManagerAddress, roleManagerAbi, signer);

  return { verifyXContract, roleManagerContract, provider, signer, verifyXAddress };
}