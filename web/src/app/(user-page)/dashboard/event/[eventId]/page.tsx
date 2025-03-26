'use client';

import { Grid, GridCol, Image, Flex, Textarea, TextInput, Button, Table, TableThead, TableTr, TableTh, TableTbody, TableTd, NumberFormatter, Modal, Switch, NumberInput, Card } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { Check, CircleSlash, Pencil, Plus, Trash2, X } from "lucide-react";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";

export default function Page() {
  const title = 'Event name'
  const [description, location, date] = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum commodi assumenda rerum odio quaerat dicta molestiae! Earum iste quod temporibus necessitatibus, quo provident illum et modi tenetur, rem magni voluptatem.", "123", new Date()]
  const [opened, { open, close }] = useDisclosure(false);
  const tableHeader = ['Index', 'Name', 'Price', 'Amount', 'resalable', 'Action']; 

  const [modalHeader, setModalHeader] = useState('New Ticket');
  const [modalButtonLabel, setModalButtonLabel] = useState('Create new ticket');

  const openCreateTicketDialog = () => {
    setModalHeader('New Ticket');
    setModalButtonLabel('Create new ticket');
    open();
  };

  const openEditTicketDialog = () => {
    setModalHeader('Edit Ticket');
    setModalButtonLabel('Save');
    open();
  };

  const rows = [
    <TableTr key={1}>
      <TableTd>1</TableTd>
      <TableTd>Exclusive</TableTd>
      <TableTd>
        <NumberFormatter value={100} suffix=" THB"/>
      </TableTd>
      <TableTd>
        50 / 100
      </TableTd>
      <TableTd>
        <Check/>
        <X/>
      </TableTd>
      <TableTd>
        <Flex gap={'md'}>
          <Button leftSection={<Pencil size={'15px'}/>}
                  onClick={()=>openEditTicketDialog()}>Edit</Button>
          <Button leftSection={<Trash2 size={'15px'}/>}
                  color="red">Delete</Button>
        </Flex>
      </TableTd>
    </TableTr>,
  ];

  return (
    <>
      <Flex direction={'column'}
            gap={'lg'}>
        <Grid justify="center">
          <GridCol span={10}>
            <h2>{ title }</h2>
            <Grid>
              <GridCol span={12}>
                  <Flex gap={'md'}
                        align={'center'}>
                    <Image src={'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
                          radius={"md"}
                          h={'20rem'}
                          w={'20rem'}/>
        
                    <Flex direction={'column'}
                          gap={'md'}>
                      <Textarea label="Description"
                                value={description}
                                w={"50rem"}
                                maxRows={2}/>
                      <TextInput label="Location"
                                value={location}/>
                      <DateTimePicker label="Date"
                                      value={date}/>
                      <Button>Save</Button>
                    </Flex>
                  </Flex>
              </GridCol>
            </Grid>
          </GridCol>
        </Grid>


          <Grid justify="center">
        
            <GridCol span={10}>
              <h2>Ticket</h2>
              <Button leftSection={<Plus size={'20px'}/>}
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
                          <TableTh w={'1rem'}>Action</TableTh>
                        </TableTr>
                      </TableThead>
                      <TableTbody>
                        {rows}
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
                        placeholder="Ticket name..."/>

            <NumberInput label="Price" 
                         withAsterisk
                         min={0}
                         decimalScale={2}
                         suffix=" THB"
                         step={200}
                         defaultValue={0}
                         thousandSeparator/>

            <NumberInput label="Amount" 
                         withAsterisk
                         min={0}
                         defaultValue={0}
                         decimalScale={0}/>

            <Switch label="Resalable"
                    style={{
                      cursor: 'pointer'
                    }}/>
            <Button>{modalButtonLabel}</Button>
          </Flex>
      </Modal>
    </>
  )
}