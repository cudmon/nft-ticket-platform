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

          <Grid justify='center'>
            <Grid.Col span={10}>
              <h2>Popular events</h2>
            </Grid.Col>
            
            <Grid.Col span={10}>
              <Grid>
                <Grid.Col span={4}>
                  <EventCard eventName='Post Malone'
                            eventDescription='Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium beatae hic unde asperiores laudantium doloribus doloremque? Non magni corporis dolore fugit dicta ex sequi ratione nulla dolorem. Esse, quis obcaecati!'
                            eventId='15'
                            eventStatus='Available'/>
                </Grid.Col>
                <Grid.Col span={4}>
                  <EventCard eventName='Post Malone'
                            eventDescription='Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium beatae hic unde asperiores laudantium doloribus doloremque? Non magni corporis dolore fugit dicta ex sequi ratione nulla dolorem. Esse, quis obcaecati!'
                            eventId='15'
                            eventStatus='Available'/>
                </Grid.Col>
                <Grid.Col span={4}>
                  <EventCard eventName='Post Malone'
                            eventDescription='Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium beatae hic unde asperiores laudantium doloribus doloremque? Non magni corporis dolore fugit dicta ex sequi ratione nulla dolorem. Esse, quis obcaecati!'
                            eventId='15'
                            eventStatus='Available'/>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>

        </Flex>
      </>
  );
}
