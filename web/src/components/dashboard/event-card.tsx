import { Modal, Box, Flex, Image, Button, NumberFormatter, Grid, GridCol, Text } from "@mantine/core"
import { Ticket, Pencil, Banknote, Trash2 } from "lucide-react"
import { useDisclosure } from '@mantine/hooks';
import Link from "next/link";
import { useContext } from "react";
import { EventContext } from "@/contexts/events";

interface Props {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  soldCount: number;
  totalTicket: number;
  gainMoney: number;
  isPublished: boolean;
}

export default function EventCard(props: Props) { 
  const { isPublished, id, title, description, location, soldCount, totalTicket, gainMoney } = props;
  const {deleteEventById} = useContext(EventContext);

  let date = new Date(props.date).toLocaleDateString('en-EN', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'});

  const deleteEvent = async (id: string) => {
    await deleteEventById(id);
    close();
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Flex
        style={{
          'boxShadow': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          borderRadius: '0.5rem',
        }}
        justify={'space-between'}
        px={'lg'}
        py={'md'}
        >
          
        <Flex gap={'lg'}
          align={'center'}
          bg={"white"}>
          <Image src={'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
            radius={"md"}
            w={"20rem"}
            h={"10rem"} />

          <Box>
            <h3>{title}</h3>

            <Flex gap={'md'}>
              <Text fw={'bold'}>description:</Text> 
              <Text lineClamp={1}
                    w={'30rem'}>{description}</Text>
            </Flex>

            <Flex gap={'md'}>
              <Text fw={'bold'}>location:</Text> 
              <Text>{location}</Text>
            </Flex>

            <Flex gap={'md'}><Text fw={'bold'}>date:</Text> {date}</Flex>

            <Flex gap={'md'}><Text fw={'bold'}>Published:</Text> {isPublished ? 'Already' : 'Draft'} </Flex>
          </Box>
        </Flex>

        <Flex direction={'column'}
              justify={'center'}
              gap={'md'}>
          <Flex gap={'md'}>
            <Ticket strokeWidth={'1.2px'}/> {soldCount}/{totalTicket}
          </Flex>
          <Flex gap={'md'}>
            <Banknote strokeWidth={'1.2px'}/> 
            <NumberFormatter value={gainMoney} 
                             thousandSeparator 
                             suffix=" ETH"
                             fixedDecimalScale
                             decimalScale={2}/>
          </Flex>
          
          <Grid>
            <GridCol span={6}>
              <Link href={`/dashboard/event/` + id}>
                <Button>
                  <Pencil strokeWidth={'1.2px'}/>
                </Button>
              </Link>
            </GridCol>

            <GridCol span={6}>
              <Button color="red"
                      onClick={() => {open()}}>
                <Trash2 strokeWidth={'1.2px'}/>
              </Button>
            </GridCol>
          </Grid>
        </Flex>

      </Flex>

      <Modal opened={opened} onClose={close} title="Delete confirmation" centered>
        <Button color="red"
                onClick={()=>deleteEvent(id)}>Delete</Button>
      </Modal>
    </>
  )
}