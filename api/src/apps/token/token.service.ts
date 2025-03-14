import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenService {
  hello(): string {
    return "Hello World!";
  }
}
