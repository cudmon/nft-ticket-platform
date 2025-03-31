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
  image: string;
}

export interface EventTicket {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: number;
  total: number | 0;
  resalable: boolean;
  event_id: number;
  sold: number | 0;
}

interface Token {
  id: number;
  nft_id: number;
  address: string;
  ticket: string;
  createdAt: string;
  updatedAt: string;
}

