import { ethers } from "hardhat";

async function nft() {
  const NFtDeploy = await ethers.getContractFactory("Gold");
  // const nftDployed = await NFtDeploy.deploy(
  //   "ipfs://QmaoHByWba3sKkAXYo5nkN8FddVdZnhN6YTyMWhhs9Q36k"
  // );
  const nft = await NFtDeploy.deploy(
    "ipfs://QmSXiSnY3jzQX4gRd3yVaoiuVfmypHNR3f7yFztZyCQB2L"
  );
  await nft.deployed();
  console.log(`The deployed address at ${nft.address}`);
}

nft().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
