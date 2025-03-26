import { Card, Text, Badge, Button, Group, Image } from '@mantine/core';
import Link from 'next/link';

interface Props {
    eventName: string;
    eventDescription: string;
    eventId: string;
    eventStatus: string;
}

export default function EventCard(props: Props) {
    const { eventName, eventDescription, eventId, eventStatus } = props;

    return (
        <Card shadow="sm" 
              padding="lg" radius="md" withBorder>

            <Image radius={"md"}
                src={"https://placehold.co/100x40"}
                />

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{eventName}</Text>
                <Badge color="green">{eventStatus}</Badge>
            </Group>

            <Text size="sm" c="dimmed"
                  lineClamp={5}>
                {eventDescription}
                
            </Text>

            <Link href={`/event/${eventId}`}
                  style={{ textDecoration: 'none' }}>
                <Button color="blue" fullWidth mt="md" radius="md">
                    Buy Ticket
                </Button>
            </Link>
        </Card>
    )
}