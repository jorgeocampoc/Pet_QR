import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCatDto {
  @Matches(/\S/, { message: 'No puede ser solo espacios' })
  @IsString({ message: 'Debe ser letras' })
  @MinLength(1, { message: 'Minimo un caracter' })
  name: string;
  @IsNumber()
  @Min(1, { message: 'La edad minima es 1' })
  @Max(50, { message: 'La edad minima es 50' })
  age: number;
  @IsOptional()
  @IsString()
  breed?: string;
}
