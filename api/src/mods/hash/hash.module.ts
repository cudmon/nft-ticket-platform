import { Module } from "@nestjs/common";
import { HashService } from "@/mods/hash/hash.service";

@Module({
  imports: [],
  controllers: [],
  providers: [HashService],
  exports: [HashService],
})
export class HashModule {}
