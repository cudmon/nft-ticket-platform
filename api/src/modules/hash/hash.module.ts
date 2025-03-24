import { Module } from "@nestjs/common";
import { HashService } from "@/modules/hash/hash.service";

@Module({
  exports: [HashService],
  providers: [HashService],
})
export class HashModule {}
