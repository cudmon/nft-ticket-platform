import { Type } from "class-transformer";
import { OmitType } from "@nestjs/mapped-types";
import { CreateTicket } from "@/apps/ticket/ticket.dto";
import { IsString, IsNotEmpty, IsOptional, IsDate } from "class-validator";

export class CreateEvent {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
