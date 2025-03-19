import { Module } from "@nestjs/common";
import { ContractService } from "@/mods/contract/contract.service";

@Module({
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
