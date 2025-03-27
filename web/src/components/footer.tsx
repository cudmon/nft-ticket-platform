import { Divider, Text } from "@mantine/core";

export default function Footer() {
  return (
    <footer>
      <Divider mt={25} />
      <Text size="md" mt={25} mb={25} ml={75}>
        &copy; TicketHub {new Date().getFullYear()}
      </Text>
    </footer>
  );
}
