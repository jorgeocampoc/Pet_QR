import { PartialType } from '@nestjs/mapped-types';
import { CreateQrPetDto } from './create-qr_pet.dto';

export class UpdateQrPetDto extends PartialType(CreateQrPetDto) {}
