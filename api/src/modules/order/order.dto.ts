import { ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

@ApiSchema({
  name: "Create Order",
  description: "Data for buying a ticket",
})
export class CreateOrder {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  ticket_id: number;
}
