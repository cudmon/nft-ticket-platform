import { BaseEntity } from "@/models/base.entity";
import { EventEntity } from "@/models/event.entity";
import { ApiSchema } from "@nestjs/swagger";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({
  name: "tickets",
})
@ApiSchema({
  name: "Ticket",
})
export class TicketEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 100,
  })
  name: string;

  @Column({
    type: "float",
  })
  price: number;

  @ManyToOne(() => EventEntity, (event) => event.id, {})
  event: EventEntity;
}
