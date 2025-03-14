import { Column, Entity } from "typeorm";
import { BaseEntity } from "@/models/base.entity";

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

  @Column({
    type: "varchar",
    length: 256,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
  })
  name: string;
}
