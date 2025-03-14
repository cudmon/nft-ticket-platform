import { BaseEntity } from "@/models/base.entity";
import { ApiHideProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany } from "typeorm";
import { TicketEntity } from "@/models/ticket.entity";

@Entity({
  name: "events",
})
export class EventEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  title: string;

  @Column({
    type: "timestamptz",
  })
  date: Date;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  location: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @Column({
    type: "boolean",
    default: false,
  })
  published: boolean;

  @ApiHideProperty()
  @OneToMany(() => TicketEntity, (ticket) => ticket.id)
  tickets: TicketEntity[];
}
