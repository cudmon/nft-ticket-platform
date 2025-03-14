import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  hello(): string {
    return "Hello World!";
  }
}
