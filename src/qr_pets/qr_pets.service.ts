import { Injectable } from '@nestjs/common';
import { UpdateQrPetDto } from './dto/update-qr_pet.dto';
import { CreatePetDto } from 'src/pets/dto/create-pet.dto';
import * as QRCODE from 'qrcode';
import { QrPet } from './entities/qr_pet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class QrPetsService {
  constructor(
    @InjectRepository(QrPet)
    private readonly qrPetRepository: Repository<QrPet>,
  ) {}
  async createQrPet(idPet: any) {
    const data = `http://localhost:5173/qr/${idPet}`;
    const qrData = await QRCODE.toDataURL(data);
    const qrDto = this.qrPetRepository.create({ qrData });
    qrDto.pet = idPet;
    return await this.qrPetRepository.save(qrDto);
  }

  findAll() {
    return `This action returns all qrPets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qrPet`;
  }

  update(id: number, updateQrPetDto: UpdateQrPetDto) {
    return `This action updates a #${id} qrPet`;
  }

  remove(id: number) {
    return `This action removes a #${id} qrPet`;
  }
}
