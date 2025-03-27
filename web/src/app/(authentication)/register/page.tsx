"use client";

import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Text,
  Flex,
  Card,
} from "@mantine/core";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Form {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function page() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [formData, setFormData] = useState<Form>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => router.replace("/signin"))
      .catch((error) => console.log(error));
  };

  return (
    <Flex align="center" justify="center" h="100vh">
      <form onSubmit={handleSubmit}>
        <Card w="20rem" shadow="md">
          <Flex direction="column" gap={"md"}>
            <Text size="lg" fw={"bold"}>
              Register
            </Text>
            <TextInput
              name="name"
              label="Name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              leftSection={<User size={"18px"} />}
              withAsterisk
            />
            <TextInput
              name="email"
              label="Email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleInputChange}
              leftSection={<Mail size={"18px"} />}
              withAsterisk
            />
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleInputChange}
              leftSection={<Lock size={"18px"} />}
              withAsterisk
            />
            <PasswordInput
              name="confirmPassword"
              label="Re-enter Password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              leftSection={<Lock size={"18px"} />}
              withAsterisk
            />

            <Button type="submit" variant="filled" fullWidth>
              Register
            </Button>

            <Text ta="center" size="sm" c="blue">
              Already have an account? <Link href="/signin"> Sign in</Link>
            </Text>
          </Flex>
        </Card>
      </form>
    </Flex>
  );
}
