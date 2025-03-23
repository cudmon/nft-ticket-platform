import { BaseEntity } from "@/models/base.entity";
import { UserEntity } from "@/models/user.entity";
import { TicketEntity } from "@/models/ticket.entity";
import { ApiHideProperty, ApiSchema } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({
  name: "events",
})
@ApiSchema({
  name: "Event",
})
export class EventEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  title: string;

  @Column({
    type: "timestamptz",
  })
  date: Date;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  location: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @Column({
    type: "boolean",
    default: false,
  })
  published: boolean;

  @Column()
  owner_id: number;

  @ApiHideProperty()
  @JoinColumn({ name: "owner_id" })
  @ManyToOne(() => UserEntity, (user) => user.events, {
    nullable: false,
  })
  owner: UserEntity;

  @ApiHideProperty()
  @OneToMany(() => TicketEntity, (ticket) => ticket.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  tickets: TicketEntity[];
}
