import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsString, Matches, MinLength } from 'class-validator';
import { RoleEnum } from 'src/users/enum/role.enum';

export class RegisterDto {
  @Transform(({ value }: { value: string }) => value.trim())
  @Matches(/\S/, { message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre solo debe contener espacios y letras' })
  @MinLength(2, { message: 'El nombre debe contener al menos un caracter' })
  name: string;
  @Transform(({ value }: { value: string }) => value.trim())
  @Matches(/\S/, { message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre solo debe contener espacios y letras' })
  @MinLength(2, { message: 'El nombre debe contener al menos un caracter' })
  lastName: string;
  @IsEmail({}, { message: 'Formato de correo no permitido' })
  email: string;
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString({ message: 'password valdiacion' })
  @MinLength(5, {
    message: 'La contraseña debe tener al menos cinco caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).+$/, {
    message:
      'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial, y sin espacios',
  })
  password: string;
  @IsEnum(RoleEnum, { message: 'Rol no válido' })
  role?: RoleEnum;
}
