import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  UnauthorizedException,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedUser } from 'src/common/messages';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return {
      ok: true,
      message:
        'Your account has been successfully registered. Please check your email imbox',
    };
  }

  @Post('login')
  async login(
    @Body() userDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, email } = await this.authService.login(userDto);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      email,
      message: 'Logged successful',
      ok: true,
    };
  }

  @Post('logout')
  // @UseGuards(AuthGuard)
  logOut(@Res() res: Response) {
   res.clearCookie('access_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  return res.status(200).json({
    message: 'User successfully logged out',
    ok: true,
  });
  }

  @Post('verify-email')
  @UseGuards(AuthGuard)
  async verifyEmail(@Req() req: Request) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException(UnauthorizedUser);
    }
    const message = await this.authService.activeEmail(user);
    return {
      ok: true,
      message,
      email: user.email,
      icon:
        'The account has been successfully verified' == message
          ? 'fa-circle-check'
          : 'fa-circle-exclamation',
      color:
        'The account has been successfully verified' == message
          ? 'text-success'
          : 'text-warning',
    };
  }
  @Get('user-info')
  @UseGuards(AuthGuard)
  getUserByEmail(@Req() req: Request) {
    const { role, email } = req.user as { email: string; role: string };
    return { role, email };
  }
}
