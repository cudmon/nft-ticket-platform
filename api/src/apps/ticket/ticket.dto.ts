import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTicket {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  event_id: number;
}
