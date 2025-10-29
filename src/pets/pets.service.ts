import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { QrPetsService } from 'src/qr_pets/qr_pets.service';
import { Request } from 'express';
import { errorProcessing } from 'src/common/messages';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly qrPetService: QrPetsService,
  ) {}
  async registerPet(
    createPetDto: CreatePetDto,
    file: Express.Multer.File,
    req: Request,
  ) {
    try {
      const { userFound } = req as any;
      const pet = await this.petRepository.save(createPetDto);
      const pathImage = await this.cloudinaryService.uploadImage(file, 'pets');
      pet.img = pathImage;
      const qrPet = await this.qrPetService.createQrPet(pet.id);
      pet.qrCode = qrPet;
      pet.user = userFound;
      await this.petRepository.save(pet);
      return qrPet.qrData;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(errorProcessing);
    }
  }

  async findAll(req: Request) {
    try {
      const { userFound } = req as any;
      const { id } = userFound;
      return (
        (await this.petRepository.find({
          where: { user: { id } },
          relations: ['qrCode'],
        })) || []
      );
    } catch (error) {
      console.log(error);
      throw new NotFoundException(errorProcessing);
    }
    return `This action returns all pets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  async update(updatePetDto: UpdatePetDto) {
    const { id, ...data } = updatePetDto;
    try {
      const pet = await this.petRepository.findOneBy({ id });
      if (!pet) {
        throw new NotFoundException(`Pet not found`);
      }
      Object.assign(pet, data);
      return await this.petRepository.save(pet);
    } catch (error) {}
  }

  async remove(id: string) {
    return await this.petRepository.softDelete(id);
  }

  async findById(id: string) {
    const pet = await this.petRepository
      .createQueryBuilder('pet')
      .leftJoin('pet.user', 'user')
      .addSelect(['user.name', 'user.lastName'])
      .where('pet.id = :id', { id })
      .getOne();

    return pet;
  }
}
