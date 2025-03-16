import { ApiSchema, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

@ApiSchema({
  name: "Create User",
  description: "Data for creating a user",
})
export class CreateUser {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;
}

@ApiSchema({
  name: "Update User",
  description: "Data for updating a user",
})
export class UpdateUser extends PartialType(CreateUser) {}
