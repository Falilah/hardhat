import { network, ethers } from "hardhat";
import { Signer } from "ethers";

const ROUTER = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDTHolder = "0xa2af528689e9df84ea482fbb1ab7685a9cf1e9f9";
const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";

async function swap() {
  const providers = await ethers.provider;
  const USDTSigner = await ethers.getSigner(USDTHolder);
  const CONTRouter = await ethers.getContractAt("ISwapper", ROUTER, USDTSigner);
  const CONUsdt = await ethers.getContractAt("IERC20", USDT, USDTSigner);
  const CONUni = await ethers.getContractAt("IERC20", UNI);
  const getBalance2 = await CONUsdt.balanceOf(USDTHolder);
  console.log(`The balance of the EOA is: ${getBalance2}`);

  const amountIn = 1000e6;

  await network.provider.send("hardhat_setBalance", [
    USDTHolder,
    "0x10000000000000000000000000000000",
  ]);
  const getBalance = await CONUsdt.balanceOf(USDTHolder);
  //97765414798463298649
  //1000000000

  //40060722005260
  console.log(`The balance of the EOA is: ${getBalance}`);

  //impersonatAccount

  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [USDTHolder],
  });

  console.log(`Approving ${ROUTER} to spend ${amountIn}`);
  const getapproved = await CONUsdt.approve(ROUTER, amountIn);
  // console.log(getapproved);

  const getreturns = await CONTRouter.swapExactTokensForTokens(
    amountIn,
    0,
    [USDT, UNI],
    USDTHolder,
    1665217314
  );
  console.log(getreturns);
  console.log(`the balance is ${await CONUni.balanceOf(USDTHolder)}`);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
swap().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
