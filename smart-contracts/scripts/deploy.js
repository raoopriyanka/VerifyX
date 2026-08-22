import pkg from "hardhat";
const { ethers } = pkg;
import fs from "fs";
import path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 1. Deploy RoleManager
  const RoleManager = await ethers.getContractFactory("RoleManager");
  const roleManager = await RoleManager.deploy(deployer.address);
  await roleManager.waitForDeployment();
  const roleManagerAddress = await roleManager.getAddress();
  console.log("RoleManager deployed to:", roleManagerAddress);

  // 2. Deploy VerifyX linked to RoleManager
  const VerifyX = await ethers.getContractFactory("VerifyX");
  const verifyX = await VerifyX.deploy(roleManagerAddress);
  await verifyX.waitForDeployment();
  const verifyXAddress = await verifyX.getAddress();
  console.log("VerifyX deployed to:", verifyXAddress);

  // 3. Setup deployer with MANUFACTURER_ROLE for testing convenience
  const MANUFACTURER_ROLE = await roleManager.MANUFACTURER_ROLE();
  await roleManager.grantRole(MANUFACTURER_ROLE, deployer.address);
  console.log("Granted MANUFACTURER_ROLE to deployer address:", deployer.address);

  // 4. Save deployment artifact for backend integration
  const deploymentData = {
    network: "ganache",
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    RoleManager: roleManagerAddress,
    VerifyX: verifyXAddress,
    deployer: deployer.address,
    deployedAt: new Date().toISOString()
  };

  const deploymentsDir = path.resolve("deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(deploymentsDir, "localhost.json"),
    JSON.stringify(deploymentData, null, 2)
  );
  console.log("Deployment artifact saved to smart-contracts/deployments/localhost.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});