'use client';

import EventCard from '@/components/event-card';
import { Flex, Grid, Image } from '@mantine/core';
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
}

export default function Page() {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    const response = await fetch(`${API_URL}/events`);
    const data = await response.json();
    setEvents(data);
  }

  useEffect(( ) => {
    fetchEvents();
  }, []);

  return (
      <>

        <Flex direction={"column"}
              gap={"md"}>
          <Image radius={"md"}
                  h={"100"}
                  src={"https://placehold.co/100x20"}/>

          <Grid justify='center'>
            <Grid.Col span={10}>
              <h2>Popular events</h2>
            </Grid.Col>
            
            <Grid.Col span={10}>
              <Grid>
                {
                  events.map((event) => {
                    return <Grid.Col span={4}>
                      <EventCard eventName={event.title}
                                eventDescription={event.description}
                                eventId={event.id.toString()}
                                eventStatus={'AVAILABLE'}/>
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
