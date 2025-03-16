import { Exclude } from "class-transformer";
import { BaseEntity } from "@/models/base.entity";
import { EventEntity } from "@/models/event.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({
  name: "users",
})
export class UserEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({
    type: "varchar",
    length: 256,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  name: string;

  @OneToMany(() => EventEntity, (event) => event.id)
  events: EventEntity[];
}
