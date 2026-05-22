import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/constants';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ForbiddenException('Token não fornecido.');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token, { secret: jwtConstants.secret });

      if (payload.role !== 'admin') {
        throw new ForbiddenException('Acesso restrito a administradores.');
      }

      request.user = payload;
      return true;
    } catch (err) {
      if (err instanceof ForbiddenException) throw err;
      throw new ForbiddenException('Token inválido ou expirado.');
    }
  }
}
