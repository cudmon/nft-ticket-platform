import { ApiSchema } from "@nestjs/swagger";
import { BaseEntity } from "@/models/base.entity";
import { OrderEntity } from "@/models/order.entity";
import { TokenEntity } from "@/models/token.entity";
import { TicketEntity } from "@/models/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({
  name: "resales",
})
@ApiSchema({
  name: "Resale",
})
export class ResaleEntity extends BaseEntity {
  @Column({
    type: "float"
  })
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.id, {
    nullable: true,
  })
  @JoinColumn({
    name: "order_id",
  })
  order: OrderEntity;

  @ManyToOne(() => TicketEntity, (ticket) => ticket.id, {
    nullable: false,
  })
  @JoinColumn({
    name: "ticket_id",
  })
  ticket: TicketEntity;

  @ManyToOne(() => TokenEntity, (token) => token.id, {
    nullable: true,
  })
  @JoinColumn({ name: "token_id" })
  token: TokenEntity;
}
