import { Exclude } from "class-transformer";
import { ApiSchema } from "@nestjs/swagger";
import { BaseEntity } from "@/models/base.entity";
import { EventEntity } from "@/models/event.entity";
import { Column, Entity, OneToMany } from "typeorm";

export enum Role {
  User = "user",
  Admin = "admin",
}

@Entity({
  name: "users",
})
@ApiSchema({
  name: "User",
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

  @Column({
    type: "enum",
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => EventEntity, (event) => event.id, {
    nullable: false,
  })
  events: EventEntity[];
}
