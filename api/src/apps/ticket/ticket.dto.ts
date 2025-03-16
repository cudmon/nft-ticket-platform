import { ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

@ApiSchema({
  name: "Create Ticket",
  description: "Data for creating a ticket",
})
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
