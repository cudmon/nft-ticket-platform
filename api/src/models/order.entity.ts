import { ApiSchema } from "@nestjs/swagger";
import { BaseEntity } from "@/models/base.entity";
import { UserEntity } from "@/models/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

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
    type: "varchar",
    length: 255,
  })
  price: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    nullable: false,
  })
  user: UserEntity;
}
