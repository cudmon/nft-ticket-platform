"use client";

import { useEffect, useState } from "react";
import { Box, Group, Text } from "@mantine/core";
import Ticket from "@/components/ticket";

declare var window: any;

export default function Page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [account, setAccount] = useState<string | null>(null);
  const [data, setData] = useState<any>();

  const fetchAccounts = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAccount(accounts[0] || null);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (account) {
      fetch(`${API_URL}/wallets/${account}/tokens`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
        })
        .catch((error) => console.error("Error fetching tokens:", error));
    }
  }, [account]);

  return (
    <>
      <Text>{account}</Text>
      <Box maw={800} mx="auto" style={{ border: "1px solid" }}>
        <Group justify="center">
          <Ticket />
          <Ticket />
          <Ticket />
        </Group>
      </Box>
    </>
  );
}
