import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { comparePassword, hashPassword } from 'src/common/utils/hash.util';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RoleEnum } from 'src/users/enum/role.enum';
import { MailService } from 'src/mailer/mailer.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Response } from 'express';
import { emailNoAvailable, invaliCreentials, UnauthorizedUser } from 'src/common/messages';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async register(userDto: RegisterDto) {
    const { password, email, role = '', name } = userDto;
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException(emailNoAvailable);
    }
    const hashPass = await hashPassword(password);
    userDto.password = hashPass;
    if (role == '') {
      userDto.role = RoleEnum.USER;
    }
    const payload = { email, role: userDto.role };
    const tokenRegister = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });
    const link = `${process.env.DB_HOST_FRONT}active-email/${tokenRegister}`;
    await this.userService.register(userDto);
    try {
      await this.mailService.sendEmailRegister(email, name, link);
    } catch {
      await this.userService.removeByEmail(email);
      throw new InternalServerErrorException('Error');
    }
  }

  async login(userDto: LoginDto) {
    const { password, email } = userDto;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException(invaliCreentials);
    }
    const isPassword = await comparePassword(password, user.password);
    if (!isPassword) {
      throw new UnauthorizedException(invaliCreentials);
    }
    const payload = { email, role: user.role };
    const token = await this.jwtService.signAsync(payload, { expiresIn: '1h' });
    return { token, email };
  }

  async activeEmail(user: JwtPayload) {
    try {
      const { verifyEmail = false, email } = user;

      if (verifyEmail) {
        return 'Account is already verified';
      }
      await this.userService.verifyEmail(email);
      return 'The account has been successfully verified';
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(UnauthorizedUser);
    }
  }
  logout(res: Response) {
    try {
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(UnauthorizedUser);
    }
  }
}
