import { Modal, Box, Flex, Image, Button, NumberFormatter, Grid, GridCol, Text } from "@mantine/core"
import { Ticket, Pencil, Banknote, Trash2 } from "lucide-react"
import { useDisclosure } from '@mantine/hooks';
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  location: string;
  date: string;
  soldCount: number;
  totalTicket: number;
  gainMoney: number;
}

export default function EventCard(props: Props) { 
  const { title, description, location, date, soldCount, totalTicket, gainMoney } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const deleteEvent = () => {
    console.log('Delete event');
  }

  return (
    <>
      <Flex
        style={{
          'boxShadow': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          borderRadius: '0.5rem',
        }}
        justify={'space-between'}
        px={'lg'}
        py={'md'}>
          
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
                             suffix=" THB"
                             fixedDecimalScale
                             decimalScale={2}/>
          </Flex>
          
          <Grid>
            <GridCol span={6}>
              <Link href={'/dashboard/event/1'}>
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
                onClick={()=>deleteEvent()}>Delete</Button>
      </Modal>
    </>
  )
}