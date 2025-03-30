interface TokenResponse {
  id: number;
  address: string;
  nft_id: number;
  ticket: Ticket;
  event: Event;
}

interface Ticket {
  id: number;
  name: string;
  price: number;
  resalable: boolean;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}