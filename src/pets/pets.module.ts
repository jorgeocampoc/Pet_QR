import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { QrPetsModule } from 'src/qr_pets/qr_pets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), JwtModule, UsersModule, CloudinaryModule, QrPetsModule],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
 