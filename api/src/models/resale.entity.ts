import { ApiSchema } from "@nestjs/swagger";
import { BaseEntity } from "@/models/base.entity";
import { UserEntity } from "@/models/user.entity";
import { OrderEntity } from "@/models/order.entity";
import { TicketEntity } from "@/models/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({
  name: "resales",
})
@ApiSchema({
  name: "resale",
})
export class ResaleEntity extends BaseEntity {
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column("int")
  token_id: number;

  @Column()
  ticket_id: number;

  @Column()
  seller_id: number;

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

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: "seller_id" })
  seller: UserEntity;
}
