import { ApiSchema } from "@nestjs/swagger";
import { BaseEntity } from "@/models/base.entity";
import { UserEntity } from "@/models/user.entity";
import { TicketEntity } from "@/models/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({
  name: "tokens",
})
@ApiSchema({
  name: "Token",
})
export class TokenEntity extends BaseEntity {
  @Column({
    type: "int",
    nullable: true,
    unique: true,
  })
  nft_id: number;

  @Column({
    type: "varchar",
    length: 255,
  })
  address: string;

  @JoinColumn({ name: "ticket_id" })
  @ManyToOne(() => TicketEntity, (ticket) => ticket.tokens)
  ticket: TicketEntity;
}
