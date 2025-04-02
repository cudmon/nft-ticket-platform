"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ProfileAvatar from "./profile-avatar";
import { Flex, Button } from "@mantine/core";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {

  const useAuthHook = useAuth();

  const [data, setData] = useState({
    id: null,
    name: "",
    email: "",
  });

  const fetchMe = async () => { 
    const data = await useAuthHook.fetchMe();

    if (!data) {
      return;
    }

    setData(data);
  }

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <Flex
      justify="space-between"
      align="center"
      px="md"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "white",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <Link href="/" style={{ textDecoration: "none", color: "black" }}>
        <h1>TicketHub</h1>
      </Link>

      <Flex justify="space-between" align="center" gap="md">
        {data["id"] ? (
          <ProfileAvatar id={data["id"]} 
                         email={data["email"]} 
                         name={data["name"]}/>
        ) : (
          <Link href="/signin">
            <Button size="md">Sign In</Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
}
