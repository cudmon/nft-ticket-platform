import { createPublicClient, createWalletClient, custom, http } from "viem";
import { hardhat } from "viem/chains";

declare global {
    interface Window {
        ethereum?: any;
    }
}

export function ConnectPublicClient() {

    const publicClient = createPublicClient(
        {
            chain: hardhat,
            transport: http(process.env.BLOCK_CHAIN_URL),}
    );

    return publicClient;
}

export function ConnectWalletClient() {

    console.log(window.ethereum);

    const walletClient = createWalletClient(
        {
            chain: hardhat,
            transport: custom(window.ethereum)
        }
    );

    return walletClient;
}