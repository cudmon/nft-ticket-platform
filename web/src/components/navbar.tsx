"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import ProfileAvatar from "./profile-avatar";
import { Flex, Input, Button } from "@mantine/core";

export default function Navbar() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [data, setData] = useState({
    id: null,
    name: "",
    email: "",
  });

  useEffect(() => {

    fetch(`${API_URL}/auth/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch();
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
