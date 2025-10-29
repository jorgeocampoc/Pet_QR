import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { RoleEnum } from '../enum/role.enum';

export class CreateUserDto {
  @Matches(/\S/, { message: 'Campo requerido' })
  @IsString({ message: 'Debe ser letras' })
  @MinLength(1, { message: 'Minimo un caracter' })
  name: string;
  @IsEmail({}, { message: 'Formato de correo no permitido' })
  email: string;
  @IsString({ message: 'Debe ser letras' })
  @MinLength(5, {
    message: 'La contraseña debe tener al menos cinco caracteres',
  })
  password: string;
  @IsOptional()
  @IsString({ message: 'Debe ser letras' })
  isActive?: boolean;
  @IsEnum(RoleEnum, { message: 'Rol no válido' })
  role: RoleEnum;
}
