import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseEntity {
  @ApiProperty({
    example: 1,
    description: "Unique identifier",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;

  constructor(partial: Partial<BaseEntity>) {
    Object.assign(this, partial);
  }
}
