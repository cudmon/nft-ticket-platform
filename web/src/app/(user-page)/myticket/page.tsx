"use client";

import { useEffect, useState } from "react";
import { Grid, GridCol } from "@mantine/core";
import Ticket from "@/components/ticket";
import useWallet from "@/hooks/useWallet";
import { Event } from "../dashboard/page";
import useEventContract from "@/hooks/useEventContract";
import { formatEther } from "viem";
import { TokenResponse } from "@/lib/model/token";

declare var window: any;

interface TicketUIInformation {
  tokenId: number;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  eventDescription: string;
}

export default function Page() {
  const { account } = useWallet();

  const [occupiedTokens, setOccupiedTokens] = useState<TokenResponse[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  // const [myOwnTickets, setMyOwnTickets] = useState<EventTicket[]>([]);

  const useEventContractHooks = useEventContract();

  // const useEventsHook = useEvents();

  const fetchTokens = async () => {
  
    const data = await useEventContractHooks.getOwnTokens();
    
    setOccupiedTokens(data);
  };

  // const fetchEvents = async () => {
  //   const response = useEventsHook.getEvents();
  //   const data = await response;

  //   setEvents(data);
  // };

  const fetchTicketInThisEvent = () => {
    const data = useEventContractHooks.getOwnTokens();
  };

  useEffect(() => {
    if (!account) return;

    fetchTokens();
  }, [account]);

  useEffect(() => {
    if (occupiedTokens.length === 0) return;
    if (events.length === 0) return;

    fetchTicketInThisEvent();
  }, [occupiedTokens, events]);

  return (
    <>
      {/* <Text>{account}</Text> */}

      <Grid justify="center">

        <GridCol span={10}>

          <h2>My Ticket</h2>
        </GridCol>

        <GridCol span={10}>
          <Grid>

            {
              occupiedTokens.map((token: TokenResponse) => {
                return (
                  <GridCol key={token.id} span={4}>
                    <Ticket
                      eventName={token.event.title}
                      eventDate={new Date(token.event.date)}
                      eventLocation={token.event.location}
                      ticketPrice={Number(formatEther(BigInt(token.ticket.price)))}
                      isResalable={token.ticket.resalable}
                      eventAddress={token.event.address}
                      tokenId={token.id}
                      tokenAddress={token.address}
                      isResale={token.resale}
                    />  
                  </GridCol>
                );
              })
            }

            
            {/* <GridCol>
              <Ticket />
            </GridCol>  */}

          </Grid>
        </GridCol>
      </Grid>
    </>
  );
}
