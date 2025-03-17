import { Reflector } from "@nestjs/core";
import { Role } from "@/models/user.entity";
import { ROLES_KEY } from "@/common/decorators/roles.decorator";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return roles.some((role) => user.roles.includes(role));
  }
}
