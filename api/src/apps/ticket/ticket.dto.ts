import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiSchema, PartialType } from "@nestjs/swagger";

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

  @IsNumber()
  @IsNotEmpty()
  total: number;
}

@ApiSchema({
  name: "Update Ticket",
  description: "Data for updating a ticket",
})
export class UpdateTicket extends PartialType(CreateTicket) {}
