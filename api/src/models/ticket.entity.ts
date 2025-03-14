import { BaseEntity } from "@/models/base.entity";
import { EventEntity } from "@/models/event.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({
  name: "tickets",
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
