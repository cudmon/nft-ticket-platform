'use client';

import EventCard from "@/components/dashboard/event-card";
import { Image, Modal, Button, Grid, GridCol, Textarea, TextInput, Flex, FileInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useDisclosure } from '@mantine/hooks';
import { File, Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { EventContextProvider, EventContext } from "@/contexts/events";
export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

export default function Page() {
  return (
    <EventContextProvider>
      <Child />
    </EventContextProvider>
  );

}

function Child() {

  const [opened, { open: openCreateEventModal, close: closeCreateEventModal }] = useDisclosure(false);
  const [uploadImage, setUploadImage] = useState("https://picsum.photos/seed/picsum/");

  const { events, postEvents } = useContext(EventContext);

  // Create Event form
  const [file, setFile] = useState<File | null>(null);
  const [formTitle, setFormTitle] = useState<string>("");
  const [formLocation, setFormLocation] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formDate, setFormDate] = useState<Date | null>(new Date());

  const handleFileChange = (file: any) => {
    if (!file) {
      return;
    }

    let fileURL = URL.createObjectURL(file!);
    setUploadImage(fileURL);
  };

  const createEvent = async () => {

    postEvents(formTitle, formDate!, formLocation, formDescription);

    closeCreateEventModal();

    setFormTitle("");
    setFormLocation("");
    setFormDescription("");
    setFormDate(new Date());
  };

  return (
    <>
      <>
        <Modal opened={opened}
          onClose={closeCreateEventModal}
          title="Create event"
          centered
          size={"70%"}>

          <Grid>
            <GridCol span={6}>
              <Flex direction="column" gap="md">
                <Grid w={"100%"}>
                  <GridCol>
                    <DateTimePicker withAsterisk
                      label="Event's date"
                      placeholder="Pick date and time..."
                      value={formDate}
                      onChange={(value) => { setFormDate(value) }}
                    />
                  </GridCol>
                </Grid>
                <TextInput withAsterisk label="Title"
                  placeholder="Title..."
                  onChange={(e) => { setFormTitle(e.target.value) }}
                  value={formTitle} />

                <TextInput withAsterisk label="Location"
                  placeholder="Location..."
                  onChange={(e) => { setFormLocation(e.target.value) }}
                  value={formLocation} />

                <Textarea withAsterisk
                  size="md"
                  label="Description"
                  placeholder="Description..."
                  onChange={(e) => { setFormDescription(e.target.value) }}
                  value={formDescription} />

                <Button onClick={() => { createEvent() }} >Submit</Button>
              </Flex>
            </GridCol>

            <GridCol span={6}>
              <Flex direction={"column"} gap={"md"}>
                <FileInput label="Event poster"
                  leftSection={<File size={'15px'} />}
                  withAsterisk
                  placeholder="Upload poster"
                  value={file}
                  onChange={(e) => { handleFileChange(e) }}
                  accept="image/png, image/jpeg" />

                <Image src={uploadImage} radius={'md'} />
              </Flex>
            </GridCol>
          </Grid>
        </Modal>

        <Grid justify="center">
          <GridCol span={10}>
            <Grid>
              <GridCol span={12}>
                <h2>Dashboard</h2>
                <Button leftSection={<Plus />}
                  onClick={openCreateEventModal}>
                  Create Event
                </Button>
              </GridCol>

              {
                events.map((event: Event, index: number) => {
                  return (
                    <GridCol key={`event-${index}`}>
                      <EventCard id={event.id.toString()}
                        title={event.title}
                        description={event.description}
                        location={event.location}
                        date={event.date}
                        soldCount={20}
                        totalTicket={30}
                        gainMoney={1000}
                      />
                    </GridCol>
                  )
                })
              }
            </Grid>
          </GridCol>
        </Grid>
      </>
    </>
  )
}