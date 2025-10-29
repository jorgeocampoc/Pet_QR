import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/users.service';
import { Cookies } from '../interfaces/cockies';
import { UnauthorizedUser } from 'src/common/messages';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const token =
      this.extractTokenFromHeader(request) ||
      this.extractTokenFromCockies(request);
    if (!token) {
      throw new UnauthorizedException('token is not valid');
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
      const response = await this.userService.findOneByEmail(payload.email);
      payload.isActive = response?.isActive;
      payload.verifyEmail = response?.verifyEmail;
      request.user = payload;
    } catch {
      throw new UnauthorizedException(UnauthorizedUser);
    }
    return true;
  }
  private extractTokenFromHeader(request: Request) {
    const [type = '', token = ''] =
      request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  private extractTokenFromCockies(request: Request) {
    if (request.cookies) {
      const cookies = request.cookies as Cookies;
      const possibleTokenNames = ['token', 'jwt', 'access_token', 'auth_token'];

      for (const tokenName of possibleTokenNames) {
        const token = cookies[tokenName];
        if (token && typeof token === 'string') {
          return token;
        }
      }
    }

    return undefined;
  }
}
