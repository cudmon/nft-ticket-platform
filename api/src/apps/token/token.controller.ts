import { Controller, Get } from "@nestjs/common";
import { TokenService } from "@/apps/token/token.service";

@Controller("tokens")
export class TokenController {
  constructor(private readonly token: TokenService) {}
}
