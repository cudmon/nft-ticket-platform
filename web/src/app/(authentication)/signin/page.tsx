"use client";

import {
  Button,
  Card,
  Flex,
  Text,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { redirect } from "next/navigation";

export default function Page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async () => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status != 201) {
      setErrorMessage("Invalid email or password");
      return;
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    redirect("/");
  };

  return (
    <Flex align="center" justify="center" h="100vh">
      <Card shadow="md" w="20rem">
        <Flex direction="column" gap="md">
          <Text size="xl" fw={"bold"}>
            Login
          </Text>

          <TextInput
            label="Email"
            placeholder="Enter your email..."
            leftSection={<Mail size={"18px"} />}
            withAsterisk
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password..."
            leftSection={<Lock size={"18px"} />}
            withAsterisk
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={() => {
              signIn();
            }}
          >
            Sign in
          </Button>

          <Text size={"sm"} color="red">
            {errorMessage}
          </Text>

          <Text ta="center" size="sm" c="blue">
            Don't have an account? <Link href={"/register"}>Sign Up</Link>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
