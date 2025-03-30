export interface EventInformation {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  published: boolean;
  address: string;
  owner_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventTicket {
  id: number;
  name: string;
  price: number;
  total: number;
  resalable: boolean;
  event_id: number;
  event: EventInformation;
  tokens: Token[];
  createdAt: string;
  updatedAt: string;
}

interface Token {
  id: number;
  nft_id: number;
  address: string;
  ticket: string;
  createdAt: string;
  updatedAt: string;
}