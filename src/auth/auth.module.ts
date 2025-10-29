import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { MailModule } from 'src/mailer/mailer.module';
import { PetsModule } from 'src/pets/pets.module';

@Module({
  imports: [UsersModule, JwtModule, MailModule, PetsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
