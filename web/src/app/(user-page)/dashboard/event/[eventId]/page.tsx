'use client';

import { Grid, GridCol, Image, Flex, Textarea, TextInput, Button, Table, TableThead, TableTr, TableTh, TableTbody, TableTd, NumberFormatter, Modal, Switch, NumberInput, Card, Box } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { Check, Pencil, Plus, Rss, Save, Trash2, X } from "lucide-react";
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { EventTicket } from "@/lib/model/useEvents-model";
import { formatEther } from "viem";

interface Props {
  params: Promise<{ eventId: string }>;
}

export default function Page(props: Props) {
  const useEventsHook = useEvents();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [isPublished, setIsPublished] = useState(false);
  const [eventImage, setEventImage] = useState<string | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const [isSaveAvailable, setIsSaveAvailable] = useState(false);

  const [modalHeader, setModalHeader] = useState('New Ticket');
  const [modalButtonLabel, setModalButtonLabel] = useState('Create new ticket');

  const [ticketName, setTicketName] = useState('Ealry Bird');
  const [ticketPrice, setTicketPrice] = useState<Number>(0);
  const [ticketAmount, setTicketAmount] = useState(15);
  const [isTicketResalable, setIsTicketResalable] = useState<number>(0);

  const [editTicketId, setEditTicketId] = useState('');

  const [tickets, setTickets] = useState<EventTicket[]>([]);

  const [loadingCreateNewTicket, setLoadingCreateNewTicket] = useState(false);

  const openCreateTicketDialog = () => {
    setModalHeader('New Ticket');
    setModalButtonLabel('Create new ticket');
    open();
  };

  const openEditTicketDialog = async (ticketId : string) => {
    getTicketInformation(Number(ticketId));
    setModalHeader('Edit Ticket');
    setModalButtonLabel('Save');
    setEditTicketId(ticketId);
    open();
  };

  const fetchEvent = async () => {
    const { eventId } = await props.params;
    const eventInformation = await useEventsHook.getEventInformation(eventId);

    setTitle(eventInformation.title);
    setDescription(eventInformation.description);
    setLocation(eventInformation.location);
    setDate(new Date(eventInformation.date));
    setIsPublished(eventInformation.published);
    setEventImage(eventInformation.image);
  };

  const patchEventInformation = async () => {
    const { eventId } = await props.params;

    if (!date) {
      alert('Please fill in the date field');
      return
    };

    await useEventsHook.patchEventInformation(eventId, title, date, location, description,);

    setIsSaveAvailable(false);
  };

  const getTicketsInformation = async () => {
    const { eventId } = await props.params;
    const tickets = await useEventsHook.getEventTickets(eventId);

    tickets.forEach(ticket => {
      ticket.price = Number(formatEther(BigInt(ticket.price)));
    });

    setTickets(tickets);
  };

  const createTicket = async () => {
    const { eventId } = await props.params;

    setLoadingCreateNewTicket(true);

    await useEventsHook.createEventTicket(Number(eventId), ticketName, Number(ticketPrice), ticketAmount, isTicketResalable === 1);

    await getTicketsInformation();

    resetTicketForm();
    setLoadingCreateNewTicket(false);
    close();
  }

  const resetTicketForm = () => {
    setTicketName('');
    setTicketPrice(0);
    setTicketAmount(0);
    setIsTicketResalable(0);
  }

  const publishEvent = async () => {
    const { eventId } = await props.params;
    let response = await useEventsHook.publishEvent(Number(eventId));

    if (!response.ok) {
        let data = await response.json();
        alert(data.message);
        return;
    }

    setIsPublished(true);
  }

  const getTicketInformation = (ticketId: Number) => {

    const ticket = tickets.find(ticket => ticket.id === ticket.id);

    if (!ticket) {
      alert('Ticket not found');
      return;
    }

    setTicketName(ticket.name);
    setTicketPrice(ticket.price);
    setTicketAmount(ticket.total);
    setIsTicketResalable(ticket.resalable
      ? 1
      : 0);
  }

  const patchTicket = async () => {

    await useEventsHook.patchEventTicket(editTicketId, ticketName, Number(ticketPrice), ticketAmount, isTicketResalable === 1);
    await getTicketsInformation();

    resetTicketForm();
    close();
  }

  const deleteTicket = async (ticketId: Number) => {
    await useEventsHook.deleteTicket(ticketId);
    
    await getTicketsInformation();
  };

  useEffect(() => {
    fetchEvent();
    getTicketsInformation();
  }, []);

  return (
    <>
      <Flex direction={'column'}
            gap={'lg'}
            mt={'lg'}>
        <Grid justify="center">
          <GridCol span={10}>

            <Grid>
              <GridCol span={12}>
                <Flex gap={'md'}
                  align={'center'}>

                  <Flex gap={'md'} 
                        direction={'column'}
                        h={'100%'}>


                    <Card w={'30rem'}
                          h={'20rem'}
                         style={
                          {
                            overflow: 'hidden'
                          }
                         }
                         p={0}
                         >
                      <Image src={eventImage}/>
                    </Card>

                    <Button leftSection={<Rss size={'15px'}/>}
                            disabled={isPublished}
                            onClick={() => {publishEvent()}}>{isPublished ? 'Published' : 'Publish Event'}</Button>
                  </Flex>

                  <Flex direction={'column'}
                    gap={'md'}>

                    <TextInput value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        setIsSaveAvailable(true)
                      }}
                      label='Title' />

                    <Textarea label="Description"
                      value={description}
                      onChange={(event) => {
                        setDescription(event.currentTarget.value);
                        setIsSaveAvailable(true)
                      }}
                      w={"50rem"}
                      maxRows={2} />

                    <TextInput label="Location"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        setIsSaveAvailable(true)
                      }} />

                    <DateTimePicker label="Date"
                      value={date}
                      onChange={(value) => {
                        setDate(value);
                        setIsSaveAvailable(true);
                      }} />

                    <Button onClick={patchEventInformation}
                            disabled={!isSaveAvailable}
                            leftSection={<Save size={'15px'}/>}>Save</Button>

                  </Flex>
                </Flex>
              </GridCol>
            </Grid>
          </GridCol>
        </Grid>


        <Grid justify="center">

          <GridCol span={10}>
            <h2>Ticket</h2>
            <Button leftSection={<Plus size={'20px'} />}
              onClick={() => openCreateTicketDialog()}>New</Button>
          </GridCol>


          <GridCol span={10}>
            <Grid>
              <GridCol>
                <Table>
                  <TableThead>
                    <TableTr>
                      <TableTh>Index</TableTh>
                      <TableTh>Type</TableTh>
                      <TableTh>Price</TableTh>
                      <TableTh>Amount</TableTh>
                      <TableTh>Resalable</TableTh>
                      {/* <TableTh w={'1rem'}>Action</TableTh> */}
                    </TableTr>
                  </TableThead>

                  <TableTbody>
                      {
                        tickets.map((ticket, index) => {
                          return (
                              <TableTr key={ticket.id}>
                                <TableTd>{index}</TableTd>
                                <TableTd>{ticket.name}</TableTd>
                                <TableTd>
                                  <NumberFormatter value={ticket.price} suffix=" ETH" />
                                </TableTd>
                                <TableTd>
                                  {ticket.sold} / {ticket.total}
                                </TableTd>
                                <TableTd>
                                  {
                                    ticket.resalable ? <Check color="green"/> : <X color="red"/>
                                  }
                                </TableTd>
                                <TableTd>
                                  <Flex gap={'md'}>
                                    {/* <Button leftSection={<Pencil size={'15px'} />}
                                      onClick={() => openEditTicketDialog(ticket.id.toString())}>Edit</Button> */}
                                    {/* <Button leftSection={<Trash2 size={'15px'} />}
                                            color="red"
                                            onClick={() => deleteTicket(ticket.id)}>Delete</Button> */}
                                  </Flex>
                                </TableTd>
                              </TableTr>
                          )
                        })
                      }
                  </TableTbody>

                </Table>
              </GridCol>
            </Grid>
          </GridCol>

        </Grid>
      </Flex>

      <Modal opened={opened}
        onClose={close}
        title={modalHeader}
        centered>
        <Flex gap={'md'}
          direction={'column'}>

          <TextInput label="Type" withAsterisk
                     placeholder="Ticket name..." 
                     value={ticketName}
                     onChange={(e)=>setTicketName(e.target.value)}/>

          <NumberInput label="Price"
            withAsterisk
            min={0}
            decimalScale={10}
            suffix=" ETH"
            step={0.0001}
            thousandSeparator 
            value={Number(ticketPrice)}
            onChange={(value) => setTicketPrice(Number(value))}/>

          <NumberInput label="Amount"
            withAsterisk
            min={0}
            decimalScale={0}
            value={Number(ticketAmount)}
            onChange={(value) => setTicketAmount(Number(value))} />

          <Switch label="Resalable"
                  style={{
                    cursor: 'pointer'
                  }}
                  value={isTicketResalable}
                  onChange={(value) => setIsTicketResalable(value ? 1 : 0)}
                   />


            <Button loading={loadingCreateNewTicket} onClick={modalHeader == 'New Ticket' ?  createTicket : patchTicket }>{modalButtonLabel}</Button> 

        </Flex>
      </Modal>
    </>
  )
}