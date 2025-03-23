import { ApiSchema } from "@nestjs/swagger";
import { BaseEntity } from "@/models/base.entity";
import { EventEntity } from "@/models/event.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

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

  @Column({
    type: "int",
  })
  total: number;

  @Column({
    type: "boolean",
  })
  resalable: boolean;

  @Column()
  event_id: number;

  @ManyToOne(() => EventEntity, (event) => event.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "event_id",
  })
  event: EventEntity;
}
