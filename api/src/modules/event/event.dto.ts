import { Type } from "class-transformer";
import { ApiSchema, PartialType } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsBoolean,
} from "class-validator";

@ApiSchema({
  name: "Create Event",
  description: "Data for creating an event",
})
export class CreateEvent {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;
}

@ApiSchema({
  name: "Update Event",
  description: "Data for updating an event",
})
export class UpdateEvent extends PartialType(CreateEvent) {
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
