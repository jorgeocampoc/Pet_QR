import { Module } from '@nestjs/common';
import { QrPetsService } from './qr_pets.service';
import { QrPetsController } from './qr_pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrPet } from './entities/qr_pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QrPet])],
  controllers: [QrPetsController],
  providers: [QrPetsService],
  exports: [QrPetsService],
})
export class QrPetsModule {}
