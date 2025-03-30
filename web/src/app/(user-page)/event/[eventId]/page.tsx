'use client';

import { useEvents } from "@/hooks/useEvents";
import { EventTicket } from "@/lib/model/useEvents-model";
import { Grid, GridCol, Image, Button, Flex, NumberInput, NumberFormatter, Tabs, TabsList, TabsTab, TabsPanel, Table, TableThead, TableTr, TableTh, TableTbody, TableTd, NativeSelect, ComboboxData, ComboboxItem } from "@mantine/core";
import { TicketCheck, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Address } from "viem";
import useWallet from "@/hooks/useWallet";
import useEventContract from "@/hooks/useEventContract";

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
  address: Address;
  image: string;
  owner_id: number;
}

export default function page(props: Props) {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [ticketAmount, setTicketAmount] = useState(0);
    const [title, setTitle] = useState("Postmalone");
    const [description, setDescription] = useState("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, pariatur. Sequi ut quo illum esse aperiam incidunt minus quas tempore ab? Voluptate dicta magni soluta incidunt harum reiciendis laboriosam repellat.");
    const [location, setLocation] = useState("Hall 6");
    const [price, setPrice] = useState(0);
    const [eventAddress, setEventAddress] = useState<Address>("" as Address);
    const [image, setImage] = useState<string | null>(null);

    const menuDefaultValue = "original";

    const useEventsHook = useEvents();  
    const [dropdownOptions, setDropDownOptions] = useState<ComboboxItem[]>([]);

    const [tickets, setTickets] = useState<EventTicket[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<EventTicket | null>(null);

    const { connect, account, connected } = useWallet();

    const useEventContractHook = useEventContract();

    const fetchEventInformation = async () => {
        const { eventId } = await props.params;

        const response = await fetch(`${API_URL}/events/${eventId}`);
        const data : Response = await response.json();

        setTitle(data.title);
        setDescription(data.description);
        setLocation(data.location);
        setEventAddress(data.address);
        setImage(data.image);
    };

    const fetchEventTickets = async () => {
        const { eventId } = await props.params;

        const tickets = await useEventsHook.getEventTickets(eventId);
        
        let dropDownOptionsTemp : ComboboxItem[] = [];

        tickets.forEach(ticket => {
            dropDownOptionsTemp.push({
                value: ticket.id.toString(),
                label: ticket.name,
            });}
        );

        setTickets(tickets);
        setSelectedTicket(tickets[0]);
        setDropDownOptions(dropDownOptionsTemp);
        setPrice(tickets[0].price);
    };

    const onTicketTypeChange = (value: string) => {
        const ticket = tickets.find((ticket) => ticket.id === Number(value));
        setPrice(Number(ticket?.price));
        setSelectedTicket(ticket || null);
    }

    const checkout = async () => {

        await connect();

        console.log(selectedTicket);

        if (!selectedTicket) {
            return;
        }
        const fetchContract = await useEventContractHook.buyTicket(eventAddress, selectedTicket?.id , ticketAmount, BigInt(price * ticketAmount));
        console.log( fetchContract );
    };

    useEffect(() => {   
        fetchEventInformation();
        fetchEventTickets();
        window.scrollTo(0, 0);
    }
    , []);

    return (
        <Grid grow={true}>
            <GridCol span={6} pos={'relative'}>
{/*                 
                <Button onClick={() => {getLog(eventAddress)}}>
                    Get log
                </Button>

                <Button onClick={() => {getBlock()}}>
                    Get block
                </Button> */}

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

                <Image  src={image}
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

                <Tabs defaultValue={menuDefaultValue}>

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

                        <label htmlFor=""><b>Ticket Type</b></label>
                        <NativeSelect data={dropdownOptions}
                                      onChange={(e) => {onTicketTypeChange(e.target.value)}}/>

                        <p><b>price:</b> 
                            <NumberFormatter prefix=" " suffix=" ETH" value={price} thousandSeparator/>
                        </p>
                        
                        <Flex gap={"md"}
                              align={'center'}>
                            <NumberInput placeholder="Amount of ticket..." 
                                        min={0}
                                        value={ticketAmount}
                                        onChange={(value) => setTicketAmount(Number(value))}
                                        suffix=" tickets"
                                        decimalScale={0}
                                        />

                            <NumberFormatter value={ticketAmount * price}
                                             prefix="Total: "
                                             suffix=" ETH"
                                             thousandSeparator/>

                            <Button variant="filled" color="green"
                                    leftSection={<TicketCheck size={20}/>}
                                    onClick={()=>checkout()}
                                    disabled={ticketAmount === 0}>
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
                                                         suffix=" ETH"/>
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