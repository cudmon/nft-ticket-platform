import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "@/models/order.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>
  ) {}

  async findByWallet(address: string) {
    return await this.orders.find({
      where: {
        address,
      },
    });
  }
}
