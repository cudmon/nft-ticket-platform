'use client';

import { Grid, GridCol, Image, Button, Flex, NumberInput, NumberFormatter } from "@mantine/core";
import { TicketCheck, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
    params : Promise<{eventId: string}>;
}

export default function page(props: Props) {
    // const { eventId } = await props.params;
    const [ticketAmount, setTicketAmount] = useState(0);
    const [title, setTitle] = useState("Postmalone");
    const [description, setDescription] = useState("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, pariatur. Sequi ut quo illum esse aperiam incidunt minus quas tempore ab? Voluptate dicta magni soluta incidunt harum reiciendis laboriosam repellat.");
    const [location, setLocation] = useState("Hall 6");
    const [price, setPrice] = useState(10000);
    
    useEffect(() => {   
        fetchData();
        window.scrollTo(0, 0);
    }
    , []);

    const fetchData = async () => {
        console.log("Event ID: ", await props.params);
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
                <p>{description}</p>

                <p>Location: {location}</p>
                <p>price: 
                    <NumberFormatter prefix=" " suffix=" THB" value={price} thousandSeparator/>
                </p>
                
                <Flex gap={"md"}>
                    <NumberInput placeholder="Amount of ticket..." 
                                 min={0}
                                 value={ticketAmount}
                                 onChange={(value) => setTicketAmount(Number(value))}
                                 />

                    <Button variant="filled" color="green"
                            leftSection={<TicketCheck size={20}/>}
                            onClick={()=>checkout()}>
                        Check out
                    </Button>
                </Flex>
            </GridCol>
        </Grid>
    )
} 