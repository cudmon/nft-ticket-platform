interface ResaleTicket {
  id: number;
  price: number;
  seller: string;
  ticket: Ticket;
}

interface Ticket {
  id: number;
  name: string;
  price: number;
  total: number;
  resalable: boolean;
  event_id: number;
  event: Event;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  published: boolean;
  address: string;
  image: null;
  owner_id: number;
}