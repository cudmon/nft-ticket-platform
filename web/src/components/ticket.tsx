import { Container, Text, Group, Button } from "@mantine/core";

const Ticket = () => {
  return (
    <Container
      size="xs"
      w={350}
      m={20}
      p={20}
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ccc",
      }}
    >
      <Text size="lg" w={700} style={{ marginBottom: "12px" }}>
        Event Ticket
      </Text>

      <Group style={{ marginBottom: "10px" }}>
        <Text size="sm">Event Date:</Text>
        <Text size="sm" c="gray">
          25 March, 2025
        </Text>
      </Group>

      <Group style={{ marginBottom: "10px" }}>
        <Text size="sm">Location:</Text>
        <Text size="sm" c="gray">
          Some place
        </Text>
      </Group>

      <Group style={{ marginBottom: "20px" }}>
        <Text size="sm">Desciption:</Text>
        <Text size="sm" c="gray">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem,
          voluptatum?
        </Text>
      </Group>

      <Button bg="red">Sell</Button>
    </Container>
  );
};

export default Ticket;
