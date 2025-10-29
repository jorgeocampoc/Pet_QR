import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Gender, Species } from 'src/common/enums';

export class CreatePetDto {
  @IsString({ message: 'Field name no valid' })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, {
    message: 'Field name cannot contain numbers and symbols',
  })
  @Min(2, { message: 'Field name must be at least 2 characters' })
  @Transform(({ value }: { value: string }) => value.trim())
  name: string;
  @IsEnum(Species, {
    message: 'Invalid species. Must be one of the defined species.',
  })
  species: string;
  @IsString({ message: 'Field color no valid' })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, {
    message: 'Field color cannot contain numbers and symbols',
  })
  @Min(2, { message: 'Field color must be at least 2 characters' })
  @Transform(({ value }: { value: string }) => value.trim())
  color: string;
  @IsString({ message: 'Field breed not valid' })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, {
    message: 'Field breed cannot contain numbers and symbols',
  })
  @Min(2, { message: 'Fieldn breed must be at least 2 characters' })
  @Transform(({ value }: { value: string }) => value.trim())
  breed: string;
  @IsString({ message: 'Field address not valid' })
  @Min(2, { message: 'Field address must be at least 2 characters' })
  @Transform(({ value }: { value: string }) => value.trim())
  address: string;
  @IsString({ message: 'Field phone not valid' })
  @Min(7, { message: 'Phone must be at least 7' })
  @Max(20, { message: 'Phone cannot exceed 20' })
  @Transform(({ value }: { value: string }) => value.trim())
  phone: string;
  @IsNumber()
  @Min(0, { message: 'Age must be at least 0' })
  @Max(30, { message: 'Age cannot exceed 30' })
  age: number;
  @IsEnum(Gender, {
    message: 'Invalid gender. Must be one of the defined genders',
  })
  gender: string;
  @IsOptional()
  @IsString({ message: 'Field observation must be at text' })
  observations?: string = 'Not description';
  @IsOptional()
  @IsString({ message: 'Field image must be at text' })
  img?: string = 'Not image';
  @IsString({ message: 'The user is required' })
  @IsOptional()
  userId?: string;
  @IsOptional()
  qrCodeId?: string;
}
