import useEventContract from "@/hooks/useEventContract";
import { Text, Group, Button, NumberFormatter, Flex, Card, Modal, NumberInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Address } from "viem";
import QRCode from "qrcode";

interface Props {
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  ticketPrice: number;
  isResalable: boolean;
  eventAddress: Address;
  tokenId: number;
  tokenAddress: string;
  isResale: boolean;
}

const Ticket = (props: Props) => {
  const { eventName, eventLocation, ticketPrice, isResalable, eventAddress, tokenId, tokenAddress } = props;
  const eventDate = new Date(props.eventDate).toLocaleDateString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'});
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedPrice, setSelectedPrice] = useState<number>(ticketPrice);

  const useEventContractHook = useEventContract();

  const createQRCode = async () => {
    QRCode.toCanvas(document.getElementById('canvas'+tokenId), `This might prove that human can't overcome their curiosity.`, function (error) {
    if (error) console.error(error)
      console.log('success!');
    })
  };

  const sellTicket = async () => {
    useEventContractHook.resellTicket(eventAddress, tokenId, selectedPrice);
    close();
  };

  useEffect(() => {
    createQRCode();
  }), [];

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
              decimalScale={10}
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

          <canvas id={"canvas"+tokenId}></canvas>

          <Button color="red"
                  disabled={!isResalable || props.isResale}
                  onClick={open}>
                    {
                    !props.isResale ? 'Sell' : 'On flea market'
                    }</Button>
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
                  withAsterisk
                  decimalScale={10}
                  step={0.0001}
                  thousandSeparator 
                  onChange={(e)=>{setSelectedPrice(Number(e))}}/>

                <Button color="red" onClick={sellTicket}>Sell</Button>
              </Flex>
      </Modal>
    </>
  );
};

export default Ticket;
