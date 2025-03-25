import { Exclude } from "class-transformer";
import { UserEntity } from "@/models/user.entity";
import { BaseEntity } from "@/models/base.entity";
import { ResaleEntity } from "@/models/resale.entity";
import { TicketEntity } from "@/models/ticket.entity";
import { ApiHideProperty, ApiSchema } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

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

  @Column({
    type: "varchar",
    length: 255,
  })
  address: string;

  @Exclude()
  @ApiHideProperty()
  @ManyToOne(() => TicketEntity, (ticket) => ticket.id, {
    nullable: false,
  })
  @JoinColumn({
    name: "ticket_id",
  })
  ticket: TicketEntity;

  @Exclude()
  @ApiHideProperty()
  @ManyToOne(() => ResaleEntity, (resale) => resale.id, {
    nullable: true,
  })
  @JoinColumn({
    name: "resale_id",
  })
  resale: ResaleEntity;
}
