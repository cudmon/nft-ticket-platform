import { Text, Group, Button, NumberFormatter, Flex, Card, Modal, NumberInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Check, X } from "lucide-react";
import { useState } from "react";

interface Props {
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  ticketPrice: number;
  isResalable: boolean;
}

const Ticket = (props: Props) => {
  const { eventName, eventLocation, ticketPrice, isResalable } = props;
  const eventDate = new Date(props.eventDate).toLocaleDateString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'});
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedPrice, setSelectedPrice] = useState<number>(ticketPrice);

  return (
    <>
      <Card
        p={'md'}
        radius={'md'}
        style={{
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Flex direction={"column"} 
              gap="md">
          <Text size="xl" 
                fw={'bold'}
                >
            {eventName}
          </Text>

          <Group>
            <Text fw={'bold'}>Event Date:</Text>
            <Text>
              {eventDate}
            </Text>
          </Group>

          <Group>
            <Text fw={'bold'}>Location:</Text>
            <Text>
              {eventLocation}
            </Text>
          </Group>

          <Group>
            <Text fw={'bold'}>Ticket price:</Text>
            <NumberFormatter 
              value={ticketPrice}
              suffix=" ETH"
              thousandSeparator/>
          </Group>

          <Group>
            <Text fw={'bold'}>Resalable:</Text>
            {
              isResalable ? (
                <Check color="green"/>
              ) : (
                <X color="red"/>
              )
            }
          </Group>

          <Button color="red"
                  disabled={!isResalable}
                  onClick={open}>Sell</Button>
        </Flex>
      </Card>
      
      <Modal opened={opened} 
             onClose={close} 
             title="Sell confirmation"
             centered>

              <Flex direction={"column"}
                    gap="md">

                <NumberInput
                  label="Selling price"
                  min={0}
                  value={selectedPrice}
                  suffix=" ETH"
                  onChange={(e)=>{setSelectedPrice(Number(e))}}/>

                <Button color="red">Sell</Button>
              </Flex>
      </Modal>
    </>
  );
};

export default Ticket;
