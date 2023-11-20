import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const token = authHeader.split(' ')[1];
    try {
      const user = await this.jwtService.verifyAsync(token);
      request.user = user;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('JWT inválido');
    }

    return true;
  }
}
