import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrder {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  ticket_id: number;
}
