import { Controller, Post } from "@nestjs/common";
import { ResaleService } from "@/modules/resale/resale.service";

@Controller("resales")
export class ResaleController {
  constructor(private readonly resale: ResaleService) {}

  @Post()
  async create() {
    return [];
  }
}
