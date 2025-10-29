import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { UnauthorizedUser } from 'src/common/messages';

@Injectable()
export class VerifyUserGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { email, isActive, verifyEmail } = req.user;
    if (!isActive || !verifyEmail) {
      throw new UnauthorizedException(UnauthorizedUser);
    }
    const userFound = await this.userService.findOneByEmail(email);
    if (!userFound) {
      throw new UnauthorizedException(UnauthorizedUser);
    }
    req.userFound = userFound;
    return true;
  }
}
