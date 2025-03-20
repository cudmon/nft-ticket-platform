import { ApiSchema } from "@nestjs/swagger";
import { BaseEntity } from "@/models/base.entity";
import { UserEntity } from "@/models/user.entity";
import { TicketEntity } from "@/models/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({
  name: "resales",
})
@ApiSchema({
  name: "resale",
})
export class ResaleEntity extends BaseEntity {
  @Column("int")
  price: number;

  @Column("int")
  token_id: number;

  @Column()
  event_id: number;

  @Column()
  ticket_id: number;

  @Column()
  seller_id: number;

  @Column()
  buyer_id: number;

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

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: true,
  })
  @JoinColumn({ name: "buyer_id" })
  buyer: UserEntity;
}
