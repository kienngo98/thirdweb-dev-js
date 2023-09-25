import IThirdwebContractABI from "@thirdweb-dev/contracts-js/dist/abis/IThirdwebContract.json";
import { providers, Contract, utils } from "ethers";

export async function getPrebuiltInfo(
  address: string,
  provider: providers.Provider,
): Promise<{ type: string; version: number } | undefined> {
  try {
    const contract = new Contract(address, IThirdwebContractABI, provider);
    const version = await contract.contractType();
    const type = utils
      .toUtf8String(version) // eslint-disable-next-line no-control-regex
      .replace(/\x00/g, "");
    return {
      type,
      version,
    };
  } catch (e) {
    return undefined;
  }
}
