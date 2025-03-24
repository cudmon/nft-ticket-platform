'use client';

import EventCard from '@/components/event-card';
import { Flex, Grid, Image } from '@mantine/core';

export default function Page() {
  return (
      <>

        <Flex direction={"column"}
              gap={"md"}>
          <Image radius={"md"}
                  h={"100"}
                  src={"https://placehold.co/100x20"}/>
          <Grid>
            <Grid.Col span={4}>
              <EventCard eventName='Post Malone'
                         eventDescription='ทดสอบ'
                         eventId='15'
                         eventStatus='Available'/>
            </Grid.Col>
          </Grid>
        </Flex>
      </>
  );
}
