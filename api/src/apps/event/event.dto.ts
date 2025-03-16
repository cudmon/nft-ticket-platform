import { Type } from "class-transformer";
import { PartialType } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsBoolean,
} from "class-validator";

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

export class UpdateEvent extends PartialType(CreateEvent) {
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
