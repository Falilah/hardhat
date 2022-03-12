// import { ethers } from "hardhat";
import { network, ethers } from "hardhat";

import { BigNumber, BigNumberish, Bytes, BytesLike, Signer } from "ethers";

const contractAddress = "0x7c28F627eA3aEc8B882b51eb1935f66e5b875714";
const addr = "0xf39937a5b68be2418ceb82aadabf1a8b62d888aa";
const rand = "0x118b451ad8d789e2880d72ec57d1c41203d1d755";
async function checkBalance() {
  const forkPolygon = await ethers.getContractAt("IERC20", contractAddress);
  const getBalance = await forkPolygon.balanceOf(addr);
  const getBalance2 = await forkPolygon.balanceOf(rand);

  console.log(getBalance, getBalance2);

  //@ts-ignore
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [rand],
  });

  const signer = await ethers.getSigner(rand);
  // const sendfunds = await forkPolygon
  //   .connect(signer)
  //   .transfer(addr, "20000000000000000000");
  // console.log(sendfunds);
  // console.log(await forkPolygon.balanceOf(rand));
  // console.log(await forkPolygon.balanceOf(addr));

  const hashedStorage: BytesLike = await new ethers.utils.AbiCoder().encode(
    ["address", "uint256"],
    [rand, 0]
  );
  const position: BytesLike = await ethers.utils.solidityKeccak256(
    ["bytes"],
    [hashedStorage]
  );
  const decimals: BigNumberish = await BigNumber.from(position);
  console.log(decimals);
  const balance = await ethers.provider.getStorageAt(
    forkPolygon.address,
    decimals
  );
  console.log(`the balance is ${balance}`);

  await network.provider.send("hardhat_setStorageAt", [
    rand,
    position,
    "0x000000000000000000000000000000000000000000000000000000009319197E",
  ]);
  const balOF = await forkPolygon.balanceOf(rand);

  console.log(`New Balance: ${balOF.toString()}`);
  // console.log(`New Balance of position: ${balOF2.toString()}`);
}

// const rand = "0xb81b272fde39f698c69a67620aa9978724e770cd";
//   const Conaddress = await ethers.getContractAt("IERC20", contractAddress);

//   const bal = await Conaddress.balanceOf(addr);
//   console.log(bal);

//   //impersonating account
//   //@ts-ignore
//   await hre.network.provider.request({
//     method: "hardhat_impersonateAccount",
//     params: [rand],
//   });

//   //   const signer = await ethers.getSigner(rand);
//   //   await Conaddress.connect(signer).transfer(addr, "1058807296479727192712");
//   //   const boom = await Conaddress.balanceOf(addr);
//   //   const boom2 = await Conaddress.balanceOf(rand);

//   //   console.log(`the balance of the adress transfer to is ${boom}`);
//   //   console.log(`the balance of the transfer from address ${boom2}`);

//   //   //encoding in typescript
//   const together: BytesLike = new ethers.utils.AbiCoder().encode(
//     ["address", "uint256"],
//     [rand, 1]
//   );

//   const position: BytesLike = ethers.utils.solidityKeccak256(
//     ["bytes"],
//     [together]
//   );

//   const dec: BigNumberish = BigNumber.from(position);
//   console.log(dec);
//   const balance = await ethers.provider.getStorageAt(rand, dec);
//   await ethers.provider.send("hardhat_setStorageAt", [
//     rand,
//     position,
//     "0x000000000000000000000000000000000000000000000040B34C2327434610E7",
//   ]);

//   const bal2 = await Conaddress.balanceOf(rand);
//   console.log(bal2);

//   console.log(`balance is ${balance.toString()}`);

checkBalance().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
