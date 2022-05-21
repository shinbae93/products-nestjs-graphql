import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const requiredRole = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler()],
    );

    if (!requiredRole) {
      return true;
    }

    const { headers } = GqlExecutionContext.create(context).getContext().req;

    const token = headers?.authorization?.split(' ')[1];
    if (!token) return false;
    const decoded_user = this.jwtService.decode(token) as any;

    return requiredRole[0] == decoded_user.role;
  }
}
