'use client';

import { Grid, GridCol, Image, Button, Flex, NumberInput, NumberFormatter, Tabs, TabsList, TabsTab, TabsPanel, Table, TableThead, TableTr, TableTh, TableTbody, TableTd } from "@mantine/core";
import { TicketCheck, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
    params : Promise<{eventId: string}>;
}

interface Response {
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

export default function page(props: Props) {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [ticketAmount, setTicketAmount] = useState(0);
    const [title, setTitle] = useState("Postmalone");
    const [description, setDescription] = useState("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, pariatur. Sequi ut quo illum esse aperiam incidunt minus quas tempore ab? Voluptate dicta magni soluta incidunt harum reiciendis laboriosam repellat.");
    const [location, setLocation] = useState("Hall 6");
    const [price, setPrice] = useState(10000);
    
    useEffect(() => {   
        fetchEventInformation();
        window.scrollTo(0, 0);
    }
    , []);

    const fetchEventInformation = async () => {
        const { eventId } = await props.params;

        const response = await fetch(`${API_URL}/events/${eventId}`);
        const data : Response = await response.json();

        setTitle(data.title);
        setDescription(data.description);
        setLocation(data.location);
    }

    const checkout = () => {
        console.log("Checking out...");
    }

    return (
        <Grid grow={true}>
            <GridCol span={6} pos={'relative'}>
                <Link href={"/"}>
                    <Button radius={"lg"}
                            style={{
                                position: "absolute",
                                top: "2rem",
                                left: "2rem",
                                zIndex: 1,
                                cursor: "pointer",
                            }}>
                        <ChevronLeft />
                    </Button>
                </Link>

                <Image  src={"https://placehold.co/100x40"}
                        style={{
                            height: "82vh",
                        }}/>
            </GridCol>

            <GridCol span={6}
                     style={{
                        height: "82vh",
                        overflowY: "scroll",
                     }}>
                <h1>{title}</h1>

                <Tabs defaultValue={"flea-market"}>
                    <TabsList>
                        <TabsTab value="original">
                            Original
                        </TabsTab>
                        <TabsTab value="flea-market">
                            Flea Market
                        </TabsTab>
                    </TabsList>

                    <TabsPanel value="original">
                        <p>{description}</p>

                        <p><b>Location:</b> {location}</p>
                        <p><b>price:</b> 
                            <NumberFormatter prefix=" " suffix=" THB" value={price} thousandSeparator/>
                        </p>
                        
                        <Flex gap={"md"}>
                            <NumberInput placeholder="Amount of ticket..." 
                                        min={0}
                                        value={ticketAmount}
                                        onChange={(value) => setTicketAmount(Number(value))}
                                        decimalScale={0}
                                        />

                            <Button variant="filled" color="green"
                                    leftSection={<TicketCheck size={20}/>}
                                    onClick={()=>checkout()}>
                                Check out
                            </Button>
                        </Flex>
                    </TabsPanel>

                    <TabsPanel value="flea-market">
                        <Table>
                            <TableThead>
                                <TableTr>
                                    <TableTh>
                                        Index
                                    </TableTh>
                                    <TableTh>
                                        Ticket Type
                                    </TableTh>
                                    <TableTh>
                                        Price
                                    </TableTh>
                                    <TableTh>
                                        Owner
                                    </TableTh>
                                    <TableTh w='1rem'>
                                    </TableTh>
                                </TableTr>
                            </TableThead>

                            <TableTbody>
                                <TableTr>
                                    <TableTd>
                                        1
                                    </TableTd>
                                    <TableTd>
                                        Early bird
                                    </TableTd>
                                    <TableTd>
                                        <NumberFormatter value={1000} 
                                                         thousandSeparator
                                                         suffix=" THB"/>
                                    </TableTd>
                                    <TableTd>
                                        John Doe
                                    </TableTd>
                                    <TableTd>
                                        <Button variant="filled" color="green"
                                                leftSection={<TicketCheck size={20}/>}
                                                onClick={()=>checkout()}>
                                            Check out
                                        </Button>
                                    </TableTd>
                                </TableTr>
                            </TableTbody>
                        </Table>
                    </TabsPanel>
                </Tabs>

            </GridCol>
        </Grid>
    )
} 