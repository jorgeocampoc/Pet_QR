import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { QrPetsModule } from './qr_pets/qr_pets.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PetsModule,
    QrPetsModule,
    AuthModule,
    QrPetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
