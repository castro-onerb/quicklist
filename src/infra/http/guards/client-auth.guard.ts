import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ClientAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header = request.headers['authorization'];
    if (typeof header !== 'string') return false;
    const [type, token] = header.split(' ');
    if (type !== 'Bearer' || !token) return false;
    request.clientId = token;
    return true;
  }
}
