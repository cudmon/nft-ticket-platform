'use client';

import EventCard from "@/components/dashboard/event-card";
import { Image, Modal, Button, Grid, GridCol, Textarea, TextInput, Flex, FileInput} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useDisclosure } from '@mantine/hooks';
import { File, Plus } from "lucide-react";
import { useState } from "react";

export default function Page() {
    const [opened, { open: openCreateEventModal, close: closeCreateEventModal }] = useDisclosure(false);
    const [uploadImage, setUploadImage] = useState("https://picsum.photos/seed/picsum/");
    const [file, setFile] = useState<File|null>(null);

    const handleFileChange = (file: any) => {
        if (!file) {
            return;
        }

        let fileURL = URL.createObjectURL(file!);
        setUploadImage(fileURL);
    };

    const createEvent = () => {
        console.log('Create event');
    };

    return (
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
                                    <GridCol span={6}>
                                        <DateTimePicker withAsterisk
                                                        label="Start"
                                                        placeholder="Pick date and time..."
                                                        />
                                    </GridCol>
                                    <GridCol span={6}>
                                        <DateTimePicker withAsterisk
                                                        label="End"
                                                        placeholder="Pick date and time..."
                                                        />
                                    </GridCol>
                                </Grid>
                                <TextInput withAsterisk label="Title" placeholder="Title..."/>
                                <TextInput withAsterisk label="Location" placeholder="Location..."/>
                                <Textarea withAsterisk
                                          size="md"
                                          label="Description"
                                          placeholder="Description..."/>
                                <Button onClick={() => {createEvent()}} >Submit</Button>
                            </Flex>
                        </GridCol>

                        <GridCol span={6}>
                            <Flex direction={"column"} gap={"md"}>
                                <FileInput label="Event poster"
                                           leftSection={<File size={'15px'}/>}
                                           withAsterisk
                                           placeholder="Upload poster"
                                           value={file}
                                           onChange={(e)=>{ handleFileChange(e) }}
                                           accept="image/png, image/jpeg"/>

                                <Image src={uploadImage} radius={'md'}/>
                            </Flex>
                        </GridCol>
                    </Grid>
            </Modal>

            <Grid justify="center">
                <GridCol span={10}>
                    <Grid>
                        <GridCol span={12}>
                            <h2>Dashboard</h2>
                            <Button leftSection={<Plus/>}
                                    onClick={openCreateEventModal}>
                                Create Event
                            </Button>
                        </GridCol>

                        <GridCol>
                            <EventCard title="Post Malone"
                                        description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quis enim earum similique unde inventore voluptates aliquid quo sed tenetur consequatur, id explicabo saepe totam porro tempora recusandae, non cum?"}
                                        location={"Hall 6"}
                                        date={"22"} 
                                        soldCount={20} 
                                        totalTicket={30} 
                                        gainMoney={1000}
                            />
                        </GridCol>
                        <GridCol>
                            <EventCard title="Post Malone"
                                            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quis enim earum similique unde inventore voluptates aliquid quo sed tenetur consequatur, id explicabo saepe totam porro tempora recusandae, non cum?"}
                                            location={"Hall 6"}
                                            date={"22"} 
                                            soldCount={20} 
                                            totalTicket={30} 
                                            gainMoney={1000}
                                />
                        </GridCol>
                        <GridCol>
                            <EventCard title="Post Malone"
                                            description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quis enim earum similique unde inventore voluptates aliquid quo sed tenetur consequatur, id explicabo saepe totam porro tempora recusandae, non cum?"}
                                            location={"Hall 6"}
                                            date={"22"} 
                                            soldCount={20} 
                                            totalTicket={30} 
                                            gainMoney={1000}
                                />
                        </GridCol>
                    </Grid>
                </GridCol>
            </Grid>
        </>
    )
}