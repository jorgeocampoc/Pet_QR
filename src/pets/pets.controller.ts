import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { Express, Request } from 'express';
import { UpdatePetDto } from './dto/update-pet.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreatePetDto } from './dto/create-pet.dto';
import { plainToInstance } from 'class-transformer';
import { VerifyUserGuard } from 'src/users/guard/verify.user.guard';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('register-pet')
  @UseGuards(AuthGuard, VerifyUserGuard)
  @UseInterceptors(FileInterceptor('img'))
  async registerPet(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req: Request,
  ) {
    const dto = plainToInstance(CreatePetDto, body);
    const qrData = await this.petsService.registerPet(dto, file, req);
    return { message: 'Pet registered successfully!!!!', ok: true, qrData };
  }

  @Get()
  @UseGuards(AuthGuard, VerifyUserGuard)
  async findAll(@Req() req: Request) {
    const pets = await this.petsService.findAll(req);
    return { message: 'Pets ready!!!', ok: true, pets };
  }
  @Put()
  @UseGuards(AuthGuard, VerifyUserGuard)
  async update(@Body() updatePetDto: UpdatePetDto) {
    console.log(updatePetDto);
    await this.petsService.update(updatePetDto);
    return { message: 'Pet updated successfully!!!!', ok: true };
  }
  @UseGuards(AuthGuard, VerifyUserGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.petsService.remove(id);
    return { message: 'Pet deleted successfully!!!!', ok: true };
  }

  @Get('/pet/:id')
  async findById(@Param('id') id: string) {
    const pet = await this.petsService.findById(id);
    return { message: 'Pet deleted successfully!!!!', ok: true, pet };
  }
}
