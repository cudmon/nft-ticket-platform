import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import { Address, getAddress } from "viem";
import { getAddresses } from "viem/_types/actions/wallet/getAddresses";


export default function useWallet() {
    let { sdk, connected, connecting, account } = useSDK();
    const [accountAddress, setAccountAddress] = useState<Address | null>(null);

     const connect = async () => {
        try {
          await sdk?.connect();
          console.log('connected');
        } catch (err) {
            console.log( err);
          console.warn(`No accounts found`, err);
        }
      };

      useEffect(() => {
        if (!account) return;

        setAccountAddress(getAddress(account));
      }, [account]);


    return { connect, account: accountAddress, connected };
};

