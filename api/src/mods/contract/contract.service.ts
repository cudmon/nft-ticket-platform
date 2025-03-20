import { Contract, ethers } from "ethers";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { abi } from "@nft-ticket/contracts/artifacts/contracts/App.sol/App.json";

@Injectable()
export class ContractService {
  private contract: Contract;

  constructor(config: ConfigService) {
    const address = config.get("CONTRACT_ADDRESS") as string;
    const key = config.get("CONTRACT_OWNER_PRIVATE_KEY") as string;
    const provider = new ethers.JsonRpcProvider(config.get("JSON_RPC_URL"));

    const signer = new ethers.Wallet(key, provider);

    this.contract = new Contract(address, abi, signer);
  }
}
