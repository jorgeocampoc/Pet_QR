import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QrPetsService } from './qr_pets.service';
import { CreateQrPetDto } from './dto/create-qr_pet.dto';
import { UpdateQrPetDto } from './dto/update-qr_pet.dto';

@Controller('qr-pets')
export class QrPetsController {
  constructor(private readonly qrPetsService: QrPetsService) {}

  @Post()
  create(@Body() createQrPetDto: CreateQrPetDto) {
    return ;
  }

  @Get()
  findAll() {
    return this.qrPetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qrPetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQrPetDto: UpdateQrPetDto) {
    return this.qrPetsService.update(+id, updateQrPetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qrPetsService.remove(+id);
  }
}
