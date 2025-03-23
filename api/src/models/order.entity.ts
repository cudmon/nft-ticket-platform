import { ApiSchema } from "@nestjs/swagger";
import { BaseEntity } from "@/models/base.entity";
import { UserEntity } from "@/models/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ResaleEntity } from "./resale.entity";
import { TicketEntity } from "./ticket.entity";

@Entity({
  name: "orders",
})
@ApiSchema({
  name: "Order",
})
export class OrderEntity extends BaseEntity {
  @Column({
    type: "int",
    default: 1,
  })
  amount: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({
    name: "user_id",
  })
  user: UserEntity;

  @ManyToOne(() => TicketEntity, (ticket) => ticket.id, {
    nullable: false,
  })
  @JoinColumn({
    name: "ticket_id",
  })
  ticket: TicketEntity;

  @ManyToOne(() => ResaleEntity, (resale) => resale.id, {
    nullable: true,
  })
  @JoinColumn({
    name: "resale_id",
  })
  resale: ResaleEntity;
}
