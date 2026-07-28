import hre from "hardhat";

async function main() {
  console.log("Starting deployment process...");

  // 1. Get the contract factory
  const VerifyX = await hre.ethers.getContractFactory("VerifyX");

  // 2. Deploy the contract
  console.log("Deploying VerifyX Smart Contract...");
  const verifyX = await VerifyX.deploy();

  // 3. Wait for the deployment to finish
  await verifyX.waitForDeployment();

  // 4. Output the crucial contract address
  const contractAddress = await verifyX.getAddress();
  console.log(`\n✅ VerifyX deployed successfully!`);
  console.log(`🚀 Contract Address: ${contractAddress}`);
  console.log(`Save this address in your server/.env file later!`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});