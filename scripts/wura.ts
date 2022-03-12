// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
// import { GoodsExistence } from "../typechain";

const x: any = {
  name: "wura",
  amount: 50,
  sizes: "medium",
};

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Goods = await ethers.getContractFactory("goodsExistence");
  console.log("Deploying");

  const product = await Goods.deploy();
  console.log("Awaiting deploy");

  await product.deployed();
  console.log("Deployed");

  const getreceipt = await product.addGoods(x);

  const receiptWait = await getreceipt.wait().events;
  console.log(receiptWait);
  //check goods
  console.log(await product.returnProduct());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
