import { Address, BaseError, ContractFunctionRevertedError, getContract, parseEther } from "viem";
import useWallet from "./useWallet";
import { ConnectPublicClient, ConnectWalletClient } from "@/lib/client";
import { abi } from '@/../../contracts/artifacts/contracts/Event.sol/Event.json'
import convertEtherToWei from "@/lib/helpers/convertEtherToWei";

export default function useEventContract () {
    const { account } = useWallet();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const buyTicket = async (eventContractAddress: Address, ticketId: number, ticketAmount: number, value: number) => {
        
        console.log(value * 1_000_000_000_000_000_000);

        const walletClient = ConnectWalletClient();
        const publicClient =  ConnectPublicClient();
        try {
            const { request } = await publicClient.simulateContract({
                address: eventContractAddress,
                abi: abi,
                functionName: 'buy_ticket',
                args: [ticketId, ticketAmount],
                account: (account as Address),
                value: BigInt(value * 1_000_000_000_000_000_000),
            })

            await walletClient.writeContract(request);

            return {message: 'success'};
        } catch (error) {

            return {message: 'error'};
        }
        
    };

    const resellTicket = async (eventContractAddress: Address, tokenId: number, price: number) => { 
        const walletClient = ConnectWalletClient();
        const publicClient =  ConnectPublicClient();

        try {
            const { request } = await publicClient.simulateContract({
                address: eventContractAddress,
                abi: abi,
                functionName: 'resell_ticket',
                args: [tokenId, Number(convertEtherToWei(price))],
                account: (account as Address),
            })

            await walletClient.writeContract(request);
        } catch (error) {
            console.log(error);
        }
    };

    const getLogs = async (eventContractAddress: Address) => {
        const publicClient = ConnectPublicClient();

        const logs = await publicClient.getContractEvents({
            address: eventContractAddress,
            abi: abi,
        });

        return logs;
    }   

    const getBlock = async () => {
        const publicClient = ConnectPublicClient();

        const block = await publicClient.getBlock({
            blockNumber: BigInt(1),
        });

        return block;
    }

    const getOwnTokens = async () => {
      if (!account) return;
        const response = await fetch(`${API_URL}/wallets/${account}/tokens`, {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await response.json();

        return data;
    };
        
    return { buyTicket, getLogs, getBlock, getOwnTokens, resellTicket };
}