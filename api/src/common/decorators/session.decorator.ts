import { Request } from "express";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

interface User {
  id: number;
}

export const Session = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request & { user?: User }>();

    const user = request.user;

    return data ? user?.[data] : user;
  }
);

export type Session = User;
