"use client";

import { Avatar, Menu, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";

declare var window: any;

interface data {
  id: number;
  name: string;
  email: string;
}

const ProfileAvatar = (data: data) => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.replace("/");
    window.location.reload();
  };

  const toMyTicket = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected Account:", accounts[0]);
      router.push("/myticket");
    } catch (error) {
      alert("User denied account access");
    }
  };

  return (
    <>
      <Menu>
        <Menu.Target>
          <Avatar
            size="lg"
            src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${data.id % 10}.png`}
            style={{
              cursor: "pointer",
            }}
          />
        </Menu.Target>

        <Menu.Dropdown>

          <Menu.Label>
            <Text>{data.name}</Text>
          </Menu.Label>

          <Menu.Label>
            <Text>{data.email}</Text>
          </Menu.Label>

          <Menu.Divider />

          <Menu.Item onClick={toMyTicket}>
            <Text>  My ticket</Text>
          </Menu.Item>

          <Menu.Item>
            <Link href={'/dashboard'}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
            >
              <Text>Dashboard</Text>
            </Link>
          </Menu.Item>

          <Menu.Item onClick={logout}>
            <Text style={{ color: "red" }}>Log out</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ProfileAvatar;
