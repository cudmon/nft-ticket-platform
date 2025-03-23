import { ApiSchema } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@ApiSchema({
  name: "Login",
  description: "Login DTO",
})
export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

@ApiSchema({
  name: "Register",
  description: "Register DTO",
})
export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  name?: string;
}
