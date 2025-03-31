'use client';

import EventCard from '@/components/event-card';
import { useEvents } from '@/hooks/useEvents';
import { Box, Flex, Grid, Image } from '@mantine/core';
import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  published: boolean;
  owner_id: number;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export default function Page() {

  const [events, setEvents] = useState<Event[]>([]);
  const useEventsHook = useEvents();

  const fetchEvents = async () => {
    const data = await useEventsHook.getPublishedEvents();
    setEvents(data);
  }

  useEffect(( ) => {
    fetchEvents();
  }, []);

  return (
      <>

        <Flex direction={"column"}
              gap={"md"}>
          
          <Box h={500}>
            <Image radius={"md"}
                    h={"500"}
                    src={"https://cdn.prod.website-files.com/62cd593e955c2638cf28f54d/65076152fa43f0f533a796f0_NFT%20Ticketing%20Platform.png"}/>
          </Box>

          <Grid justify='center'>
            <Grid.Col span={10}>
              <h2>Popular events</h2>
            </Grid.Col>
            
            <Grid.Col span={10}>
              <Grid>
                {
                  events.map((event) => {
                    return <Grid.Col span={4} key={event.id}>
                      <EventCard eventName={event.title}
                                eventDescription={event.description}
                                eventId={event.id.toString()}
                                eventStatus={'AVAILABLE'}
                                posterURL={event.image}/>
                    </Grid.Col>
                  })
                }
              </Grid>
            </Grid.Col>
          </Grid>

        </Flex>
      </>
  );
}
