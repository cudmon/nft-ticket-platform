import { Card, Text, Badge, Button, Group, Image, Box } from '@mantine/core';
import Link from 'next/link';

interface Props {
    eventName: string;
    eventDescription: string;
    eventId: string;
    eventStatus: string;
    posterURL: string;
}

export default function EventCard(props: Props) {
    const { eventName, eventDescription, eventId, eventStatus, posterURL } = props;

    return (
        <Card shadow="sm" 
              padding="lg" radius="md" withBorder>

            <Box h={'15rem'} mb="xs">
                <Image radius={"md"}
                    src={posterURL}
                    w={'100%'}
                    style={{
                        height: '15rem',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        overflow: 'hidden',
                    }}
                    />
            </Box>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{eventName}</Text>
                <Badge color="green">{eventStatus}</Badge>
            </Group>

            <Text size="sm" c="dimmed"
                  lineClamp={5}
                  h={'6rem'}
                  >
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