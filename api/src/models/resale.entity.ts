import { ApiSchema } from "@nestjs/swagger";
import { BaseEntity } from "@/models/base.entity";
import { TicketEntity } from "@/models/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({
  name: "Resales",
})
@ApiSchema({
  name: "Resale",
})
export class ResaleEntity extends BaseEntity {
  @Column({
    type: "enum",
    enum: ["pending", "success"],
    default: "pending",
  })
  status: "pending" | "success";

  @Column({
    type: "int",
  })
  price: number;

  @Column({
    type: "int",
  })
  token_id: number;

  @Column()
  event_id: number;

  @Column()
  ticket_id: number;

  @ManyToOne(() => TicketEntity, (ticket) => ticket.id, {
    nullable: false,
  })
  @JoinColumn({
    name: "ticket_id",
  })
  ticket: TicketEntity;
}
